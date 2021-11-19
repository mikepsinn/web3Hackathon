import React, { useEffect, useState } from 'react'
import './Wallet.css'
import { Segment, Message, Button } from 'semantic-ui-react'

export default function Wallet({ wallet, connect }) {

    const ethereum = window.ethereum


    async function test() {
        const data = await ethereum.requestPermissions
        console.log(data)
    }

    if (wallet) {
        return (
            <div id='walletMessage' style={{
                height: 'fit-content',
                color: 'red',
                position: 'absolute',
                left: '45%'
            }}>
                <Button onClick={test} style={{ textAlign: 'left', fontSize: '1em', padding: '.5em 1em', position: 'relative', top: '.5em', backgroundColor: '#00000020' }}>
                    Connected
                    <img src={process.env.PUBLIC_URL + 'metamask.png'} style={{ height: '2vh', position: 'relative', top: '.18em', left: '.3em' }} alt='MetaMask Icon' />

                </Button>
            </div>
        )
    } else {
        return (
            <div id='walletMessage' style={{
                height: 'fit-content',
                color: 'red',
                position: 'absolute',
                left: '45%'
            }}>
                <Button onClick={connect} style={{ textAlign: 'left', fontSize: '1em', padding: '.5em 1em', position: 'relative', top: '.5em', backgroundColor: '#00000020' }}>
                    Connect Wallet
                    <img src={process.env.PUBLIC_URL + 'metamask.png'} style={{ height: '2vh', position: 'relative', top: '.18em', left: '.3em' }} alt='MetaMask Icon' />

                </Button>
            </div>
        )
    }

}