import React, { useState, useEffect } from 'react'
import './SendEthButton.css'
import { Button, Icon } from 'semantic-ui-react'
import clientService from '../../../utils/clientService'
import { ethers } from 'ethers';
import TransactorSend from '../../../Solidity/helpers/TransactorsSend';
import detectEthereumProvider from '@metamask/detect-provider';

export default function SendEthButton({ client, amount, setSuccess }) {
    const [disabled, setDisabled] = useState(false);
    const [getNetworkStatus, setGetNetworkStatus] = useState();
    const [newGasPrice, setNewGasPrice] = useState();
    const [senderAddress, setSenderAddress] = useState();
    const [transactionCount, setTransactionCount] = useState();
    const [nonce, setNonce] = useState();

    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    provider.getGasPrice().then((res) => { if (!newGasPrice) { setNewGasPrice(res) } })

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

    useEffect(() => {
        checkPaymentStatus()
    }, [])

    async function sendHandler() {
        sendEth();
    }

    window.ethereum.request({ method: 'eth_accounts' }).then((res) => { if (!senderAddress) { setSenderAddress(res) } });


    async function sendEth() {
        const signer = provider.getSigner();
        console.log(senderAddress);
        console.log(client.walletAddress);
        const tx = {
            from: senderAddress[0],
            to: client.walletAddress,
            value: ethers.utils.parseEther(amount.toString()),
            nonce: nonce,
            gasLimit: "0x100000",
            gasPrice: ethers.utils.hexlify(newGasPrice._hex.toString()),
        }
        console.log(tx);
        try {
            await signer.sendTransaction(tx).then((transaction) => {
                console.log(transaction)
            })
            await clientService.transferFunds(client)
            await checkPaymentStatus()
        } catch (error) {
            alert('failed to send')
        }
    }

    return (
        <>
            <Button size='tiny' disabled={disabled} onClick={sendHandler}>{!disabled ? 'Send' : 'Sent'}</Button>
            {disabled ?
                <Icon className='circle' color='green' size='tiny' style={{ position: 'absolute', marginTop: '2em' }} />
                : ''}
        </>
    )
}