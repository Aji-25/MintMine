import React, { useEffect, useState } from "react";
import Gallery from "./Gallery";
import { mintmine } from "../../../declarations/mintmine";
import CURRENT_USER_ID from "../index";

function CollectionPage() {
  const [ownedNFTs, setOwnedNFTs] = useState([]);

  useEffect(() => {
    async function getOwnedNFTs() {
      const userNFTIds = await mintmine.getOwnedNFTs(CURRENT_USER_ID);
      setOwnedNFTs(userNFTIds);
    }
    getOwnedNFTs();
  }, []);

  return <Gallery title="My NFTs" ids={ownedNFTs} role="collection" />;
}

export default CollectionPage;
