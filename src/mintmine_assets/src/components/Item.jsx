import React, { useEffect, useState, useRef } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft";
import { idlFactory as tokenIdlFactory } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";
import { mintmine } from "../../../declarations/mintmine";
import Button from "./Button";
import CURRENT_USER_ID from "../index";
import PriceLabel from "./PriceLabel";

function Item(props) {
  const [name, setName] = useState();
  const [owner, setOwner] = useState();
  const [image, setImage] = useState();
  const [showSellButton, setShowSellButton] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [showBuyButton, setShowBuyButton] = useState(false);
  const [showPriceInput, setShowPriceInput] = useState(false);
  const [loaderHidden, setLoaderHidden] = useState(true);
  const [blur, setBlur] = useState();
  const [sellStatus, setSellStatus] = useState("");
  const [priceLabel, setPriceLabel] = useState();
  const [shouldDisplay, setDisplay] = useState(true);
  const [sellPrice, setSellPrice] = useState("");
  const sellPriceRef = useRef("");
  const NFTActorRef = useRef(null);

  const localHost = "http://localhost:8080/";
  const agent = new HttpAgent({ host: localHost });

  if (process.env.NODE_ENV !== "production") {
    agent.fetchRootKey();
  }

  async function loadNFT() {
    const nftActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: props.id,
    });
    
    // Store the actor in the ref for later use
    NFTActorRef.current = nftActor;

    const name = await nftActor.getName();
    const owner = await nftActor.getOwner();
    const imageData = await nftActor.getAsset();
    const imageContent = new Uint8Array(imageData);
    const image = URL.createObjectURL(
      new Blob([imageContent.buffer], { type: "image/png" })
    );

    setName(name);
    setOwner(owner.toText());
    setImage(image);

    if (props.role === "collection") {
      const nftIsListed = await mintmine.isListed(props.id);

      if (nftIsListed) {
        setOwner("MintMine");
        setBlur({ filter: "blur(4px)" });
        setSellStatus("Listed");
      } else {
        setShowSellButton(true);
      }
    } else if (props.role === "discover") {
      const originalOwner = await mintmine.getOriginalOwner(props.id);
      
      if (originalOwner.toText() !== CURRENT_USER_ID.toText()) {
        setShowBuyButton(true);
      }

      const price = await mintmine.getListedNFTPrice(props.id);
      setPriceLabel(<PriceLabel sellPrice={price.toString()} />);
    }
  }

  useEffect(() => {
    loadNFT();
  }, []);

  function handleSell() {
    setSellPrice("");
    sellPriceRef.current = "";
    setShowPriceInput(true);
    setShowSellButton(false);
    setShowConfirmButton(true);
  }

  async function sellItem() {
    setBlur({ filter: "blur(4px)" });
    setLoaderHidden(false);
    
    const priceToSell = sellPriceRef.current || sellPrice;
    const listingResult = await mintmine.listItem(props.id, Number(priceToSell));
    
    if (listingResult === "Success") {
      const mintMineId = await mintmine.getMintMineCanisterID();
      const transferResult = await NFTActorRef.current.transferOwnership(mintMineId);
      
      if (transferResult === "Success") {
        setLoaderHidden(true);
        setShowConfirmButton(false);
        setShowPriceInput(false);
        setOwner("MintMine");
        setSellStatus("Listed");
        // Clear the price after successful sale
        setSellPrice("");
        sellPriceRef.current = "";
      }
    }
  }

  async function handleBuy() {
    setLoaderHidden(false);
    // After deployment, get the token canister ID by running: dfx canister id token
    // Then replace the placeholder below with that ID
    const tokenActor = await Actor.createActor(tokenIdlFactory, {
      agent,
      canisterId: Principal.fromText("rkp4c-7iaaa-aaaaa-aaaca-cai"),
    });

    const sellerId = await mintmine.getOriginalOwner(props.id);
    const itemPrice = await mintmine.getListedNFTPrice(props.id);

    const result = await tokenActor.transfer(sellerId, itemPrice);
    if (result === "Success") {
      await mintmine.completePurchase(props.id, sellerId);
      setLoaderHidden(true);
      setDisplay(false);
    }
  }

  return (
    <div
      style={{ display: shouldDisplay ? "inline" : "none" }}
      className="disGrid-item"
    >
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={image}
          style={blur}
        />
        <div className="lds-ellipsis" hidden={loaderHidden}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="disCardContent-root">
          {priceLabel}
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name}
            <span className="purple-text"> {sellStatus}</span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {owner}
          </p>
          {showPriceInput && (
            <input
              placeholder="Price in MAJI"
              type="number"
              className="price-input"
              value={sellPrice}
              onChange={(e) => {
                const newPrice = e.target.value;
                setSellPrice(newPrice);
                sellPriceRef.current = newPrice;
              }}
            />
          )}
          {showSellButton && <Button handleClick={handleSell} text={"Sell"} />}
          {showConfirmButton && <Button handleClick={sellItem} text={"Confirm"} />}
          {showBuyButton && <Button handleClick={handleBuy} text={"Buy"} />}
        </div>
      </div>
    </div>
  );
}

export default Item;
