import Web3 from "web3";

const accessToken = process.env.INFURA_ACCESS_TOKEN;

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    window.ethereum.request({method: "eth_requestAccounts"});
    web3 = new Web3(window.ethereum);
}else{
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/bc5ea1e469cf4097b80cd0a25506e9ca'
    );

    web3 = new Web3(provider);

}
export default web3;