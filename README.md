# CliNFT
## _NFT Minting and payment solutions for clinical trials_ [![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
##### _(Working Concept on TestNet (Rinkeby)_





##

CliNFT is an application developed for a Web3 NFT.Storage and FileCoin Hackathon concept project. 

CliNFT's allows a 'clinician' or 'pharma company' ti pay back its users.
Should a medication go to trial, CliNFT allows the application to:
- Create a unique trial 
- Add a client to the selected trial as needed
- View all clients, wallet addresses and participation based upon that trial
- Mint NFT's
- Send ETH payments

## Features
- Mint an NFT with the trial Identification and percentage participated of that trial
- Store that NFT on IPFS
- Pay royalties to participants of the trial based upon their participation
- send ETH payments through the application
- and most importantly: utilize web3 ✨Magic ✨



> Currently, CliNFT works on the Rinkeby Testnet. you are able to see all transactions interacting with the block chain, and find their NFT on IPFS, as well as validate through Etherscan.io and validators. 


## Tech

CliNFT uses a number of open source projects to work properly:

- [ReactJS] - S.P.A. technology, front-end JavaScript library for building user interfaces based on UI components
- [EthersJS] - awesome web3 library to interact with the blockchain 
- [MongoDB] - great UI boilerplate for modern web apps
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework 
- [JWT] -web token authentication for logged in users
- [bcrypt] - hashing of passwords and names of clients in DB for safety and security


## Usage

View the deplyed version [Here](https://https://clinft.herokuapp.com/index/)
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


