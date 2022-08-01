import web3 from "./web3";

const crowdFundingFactory = require("./build/crowdFundingFactory.json");

const address = "0x1F8C05A17393b19c220cD877b91a2c67d0E4aad2";

export default new web3.eth.Contract(crowdFundingFactory.abi, address);

