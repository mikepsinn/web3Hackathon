# CliNFT
## _NFT Minting and payment solutions for clinical trials_ [![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
##### _(Working Concept on TestNet (Rinkeby)_


![landingHeader](https://user-images.githubusercontent.com/16360065/142776206-29215a31-bc9f-4553-9ed8-d18f59117857.png)



##

CliNFTs is an application developed for the [ETHGlobal Web3 Jam Hackathon] (https://jam.ethglobal.com/). 

CliNFTs allows a 'clinician' or 'pharma company' to pay back its users.
Should a medication go to trial, CliNFTs allows the application to:
- Create a unique clinical trial 
- Add a client to the selected trial as needed
- View all clients, wallet addresses and participation based upon that trial
- Mint NFT\s
- Send ETH payments to NFT holders

## Features
- Mint an NFT with the trial Identification and percentage participation in that trial
- Store that NFT on IPFS
- Pay royalties to participants of the trial based upon their participation
- Send ETH payments through the application
- And most importantly: utilize web3 ✨Magic ✨



> Currently, CliNFTs works on the Rinkeby Testnet. You can see all transactions interacting with the block chain, and find their NFT on IPFS, as well as validate through Etherscan.io and validators. [CliNFT minting contract] (https://rinkeby.etherscan.io/address/0xa398d48dc96a12db2bb36cdbaa743e0c0366d859).


## Tech

CliNFTs uses a number of open source projects to work properly:

- [ReactJS] - S.P.A. technology, front-end JavaScript library for building user interfaces based on UI components
- [EthersJS] - awesome web3 library to interact with the blockchain 
- [MongoDB] - great UI boilerplate for modern web apps
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework 
- [JWT] -web token authentication for logged in users
- [bcrypt] - hashing of passwords and names of clients in DB for safety and security
- [IPFS] and [FileCoin] NFT.Storage utilized for saving each NFT off-chain
- [Remix] used to deploy Solidity Smart Contracts
- [OpenZeppelin] scaffolding for our ERC721 NFT Token


## Usage

View the deplyed version [Here](https://clinft.herokuapp.com/index/)
##### _Interaction/Dropdown Menu_
- [Add Trial] add a unique trial ti add participants to, later track and send payments
- [Add Client] will enable an option to add a client to the DB and mint them a token
- [Client per Trial] will allow you to search by trial, see associated clients/wallets, and send payments accordingly 

- [Logout] _takes you away from the amazing world of web3 interaction, and places you back in web2 land_
###### _Things to know/note:_
- [access token] should you want to create your own 'Employee ID', the access code is `11223344`
- [employee ID] on signup page is unique.
- [walet address'] are unique, can only be used once in the DB
- [Mint NFT] once minted, and sent, cannot mint to same address again
- [send payment] once a payment has been sent and verified, it cannot be sent to same address again

## License

MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [node.js]: <http://nodejs.org>

   [MongoDB]: <https://www.mongodb.com/>
   [EthersJS]: <https://docs.ethers.io/v5/>
   [express]: <http://expressjs.com>
   [ReactJS]: https://reactjs.org/>
   [bcrypt]: <https://www.npmjs.com/package/bcrypt>
   [IPFS]: <https://ipfs.io/>
   [FileCoin]: <https://filecoin.io/>
   [Remix]: <https://remix.ethereum.org/>
   [OpenZeppelin]: <https://openzeppelin.com/>


