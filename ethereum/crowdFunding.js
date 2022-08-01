import web3 from "./web3";
import crowdFunding from "./build/crowdFunding.json";

export default (address) => {
    return new web3.eth.Contract(
            crowdFunding.abi,
            address
        );
    
}