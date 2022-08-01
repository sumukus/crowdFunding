const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const crowdFundingFactory = require("./build/crowdFundingFactory.json");

const provider = new HDWalletProvider(
    //Enter metamask passphrase, 
    //Enter the infura link to the rinkeby test network
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Deploying the contract from address ", accounts[0]);

    const result = await new web3.eth.Contract(crowdFundingFactory.abi)
    .deploy({
        data: crowdFundingFactory.evm.bytecode.object,
    })
    .send({
        from: accounts[0],
        gas: 2000000
    });

    console.log("Contract is deployed at address ", result.options.address);
    provider.engine.stop();
}

deploy();

//Deployed at 0xaBDEaBCb5B715181600a28E0004d4EF9ba19F6E9
//Deployed at 0x7abBe68CeFedcF706f6f2828670C994658374CCB
//Deployed at 0x1F8C05A17393b19c220cD877b91a2c67d0E4aad2
