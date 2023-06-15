import { NFTStorage } from "nft.storage";
import { CarIndexedReader } from "@ipld/car";
import { writeFileSync } from "fs";
import { constants } from "@constants";

const { ipfs } = constants.evm;

const storage = new NFTStorage({ token: ipfs.nftStorage.key });

(async () => {
  try {
    const dataType = process.argv[2];
    const nftGroup = process.argv[3];
    if (!dataType || !nftGroup) {
      throw new Error(
        "NFT dataTypes or group name must be passed as the first arguments"
      );
    }

    const carReader = await CarIndexedReader.fromFile(
      `../contracts/nfts/${nftGroup}/${dataType}.car`
    );
    // send the CAR to nft.storage, the returned CID will match the one we created above.
    const cid = await storage.storeCar(carReader);
    const status = await storage.status(cid);
    await writeFileSync(`../contracts/nfts/${nftGroup}/${dataType}.cid`, cid);
    console.log(status);
    console.log("URL", `https://ipfs.io/ipfs/${cid}/${dataType}/1`);
  } catch (err) {
    console.log(err.message);
  }
})();
