//constants that must be preset for deployment outside main function ethers, fs
const ethers = require("ethers");
const fs = require("fs-extra");

//add brackets to .config
require("dotenv").config();

async function main() {
  //http://127.0.0.1:7545
  //constants required inside main function, provider, wallet, ABI and binary;
  //Access .env content in deloy.js by using process.env
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  // do not forget to make sure wallet recognises provider

  //   const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
  //   let wallet = new ethers.Wallet.fromEncryptedJsonSync(
  //     encryptedJson,
  //     process.env.PRIVATE_KEY_PASSWORD
  //   );

  //   wallet = await wallet.connect(provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");

  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait......");
  const contract = await contractFactory.deploy();
  //console.log(contract);

  const deploymentReceipt = await contract.deployTransaction.wait(1);
  console.log(`contract address: ${contract.address}`);
  //Get current favorite number
  const currentFavoriteNumber = await contract.retrieve();
  //String interpolation: in order to mix variable with strings, use back ticks< ticks close to 1>
  //on the variable in mention add a "${}" around the variable
  console.log(`current Favorite Number: ${currentFavoriteNumber.toString()}`);
  // Transaction response is gotten when we call a function on the contract< process or filled form>
  //Transaction receipt is gotten when we wait for the transaction to finish<result>

  const transactionResponse = await contract.addFavoriteNumber("Jude", "90");
  const transactionReceipt = await transactionResponse.wait(1);
  const updatedFavoriteNumber = await contract.retrieve();
  console.log(`Updated favoriteNumber ${updatedFavoriteNumber}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
