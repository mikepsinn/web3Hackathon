import React, { useState, useEffect } from 'react'
import './SendEthButton.css'
import { Button } from 'semantic-ui-react'
import clientService from '../../../utils/clientService'
import { ethers } from 'ethers';
import TransactorSend from '../../../Solidity/helpers/TransactorsSend';

export default function SendEthButton({ client, amount }) {
    const [disabled, setDisabled] = useState(false);
    const [getNetworkStatus, setGetNetworkStatus] = useState();

    const abi = [
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "_to",
                    "type": "address"
                }
            ],
            "name": "sendViaTransfer",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        }
    ]

    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    const contractAddress = '0xFaEb0Ef2F92663F526736F07f01Ff6890E5CB92a';

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
        
        sendEth(client.walletAddress);
    }

    async function sendEth(address) {
        // console.log({ wallet: client.walletAddress, amount: amount })
        const provider = await new ethers.providers.Web3Provider(window.ethereum, 'any');
        const signer = provider.getSigner();
        const gasPrice = await provider.getGasPrice()._hex;
        const contract = new ethers.Contract(contractAddress, abi, signer);
        console.log(contract);

        const transactor = TransactorSend(provider, gasPrice, signer, getNetworkStatus);
        const tx = await transactor(contract.sendViaTransfer(address))
        console.log(tx);
    }


    return (
        <Button size='tiny' disabled={disabled} onClick={sendHandler}>{!disabled ? 'Send' : 'Sent'}</Button>
    )
}