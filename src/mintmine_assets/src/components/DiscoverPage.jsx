import React, { useEffect, useState } from "react";
import Gallery from "./Gallery";
import { mintmine } from "../../../declarations/mintmine";

function DiscoverPage() {
  const [listedNFTs, setListedNFTs] = useState([]);

  useEffect(() => {
    async function getListedNFTs() {
      const listedNFTIds = await mintmine.getListedNFTs();
      setListedNFTs(listedNFTIds);
    }
    getListedNFTs();
  }, []);

  return <Gallery title="Discover" ids={listedNFTs} role="discover" />;
}

export default DiscoverPage;
