import React, { useState, useEffect } from 'react'
import './SendEthButton.css'
import { Button } from 'semantic-ui-react'
import clientService from '../../../utils/clientService'
import { ethers } from 'ethers';
import TransactorSend from '../../../Solidity/helpers/TransactorsSend';
import detectEthereumProvider from '@metamask/detect-provider';

export default function SendEthButton({ client, amount }) {
    const [disabled, setDisabled] = useState(false);
    const [getNetworkStatus, setGetNetworkStatus] = useState();
    const [newGasPrice, setNewGasPrice] = useState();
    const [senderAddress, setSenderAddress] = useState();
    const [transactionCount, setTransactionCount] = useState();
    const [nonce, setNonce] = useState();

//     const abi = [
//         {
//             "inputs": [
//                 {
//                     "internalType": "address payable",
//                     "name": "_to",
//                     "type": "address"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "_amount",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "sendRoyalty",
//             "outputs": [],
//             "stateMutability": "payable",
//             "type": "function"
//         }
//     ]

//     const abi2 = [
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address payable",
// 				"name": "_to",
// 				"type": "address"
// 			}
// 		],
// 		"name": "sendViaTransfer",
// 		"outputs": [],
// 		"stateMutability": "payable",
// 		"type": "function"
// 	}
// ]

//     const abi3 = [
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address payable",
// 				"name": "_to",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "bytes32",
// 				"name": "_amount",
// 				"type": "bytes32"
// 			}
// 		],
// 		"name": "sendRoyalty",
// 		"outputs": [],
// 		"stateMutability": "payable",
// 		"type": "function"
// 	}
// ]

//     const abi4 = [
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address payable",
// 				"name": "_to",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint64",
// 				"name": "_amount",
// 				"type": "uint64"
// 			}
// 		],
// 		"name": "sendRoyalty",
// 		"outputs": [],
// 		"stateMutability": "payable",
// 		"type": "function"
// 	}
// ]

    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    provider.getGasPrice().then((res) => { if (!newGasPrice) {setNewGasPrice(res)} })

    // const contractAddress = '0x3BF70d6f36D2FD0EfDFF01DFaF4eEa447B6db9D8';
    // const contract2Address = '0xfaeb0ef2f92663f526736f07f01ff6890e5cb92a';
    // const contract3Address = '0xb1e1c3c67d403593742f4e31ea82b536d40539aa';
    // const contract4Address = '0x744089b2ba89182ae67e97f7e6d1f2de94a245c3';

    async function getNetworkAddy() {
        return await provider.getNetwork()
    }
    getNetworkAddy().then((res) => { if (!getNetworkStatus) { setGetNetworkStatus(res) } })

    async function checkPaymentStatus() {
        const data = await clientService.checkPayment(client)
        if (data.paid) {
            await setDisabled(true)
        } else {
            await setDisabled(false)
        }
    }

    // send payment - set disabled state and controlller paid to true. 

    useEffect(() => {
        checkPaymentStatus()
    }, [])

    async function sendHandler() {
        // sendEth(client.walletAddress);
        sendEth();
    }

    window.ethereum.request({method: 'eth_accounts'}).then((res) => { if (!senderAddress) {setSenderAddress(res)} });
    // provider.getTransactionCount(senderAddress, 'latest').then((res) => { if (!nonce) {setNonce(res)} });

    // async function sendEth(address) {
    //     // console.log({ wallet: client.walletAddress, amount: amount })
    //     console.log(senderAddress);
    //     const signer = provider.getSigner();
    //     // console.log(gasPrice);
    //     const contract = new ethers.Contract(contract3Address, abi3, signer);
    //     // const contract2 = new ethers.Contract(contract2Address, abi2, signer);
    //     // console.log(contract2);
    //     console.log(amount + ' ETH');

    //     const hexAmount = ethers.utils.parseEther(amount.toString())._hex;
    //     console.log(hexAmount)
        
    //     const transactor = TransactorSend(provider, newGasPrice._hex, signer, getNetworkStatus);
    //     const tx = await transactor(contract.sendRoyalty(address, hexAmount));
    //     // const tx = await transactor(contract2.sendViaTransfer(address));
    // }

    async function sendEth() {
        const signer = provider.getSigner();
        console.log(senderAddress);
        console.log(client.walletAddress);
        const tx = {
            from: senderAddress[0],
            to: client.walletAddress,
            value: ethers.utils.parseEther(amount.toString()),
            nonce: nonce,
            // nonce: 15,
            gasLimit: "0x100000",
            gasPrice: ethers.utils.hexlify(newGasPrice._hex.toString()),
        }
        console.log(tx);
        try {
            signer.sendTransaction(tx).then((transaction) => {
                console.log(transaction)
            })
        } catch (error) {
            alert('failed to send')
        }
    }

    return (
        <Button size='tiny' disabled={disabled} onClick={sendHandler}>{!disabled ? 'Send' : 'Sent'}</Button>
    )
}