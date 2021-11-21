import React, { useState, useEffect } from 'react'
import './SendEthButton.css'
import { Button } from 'semantic-ui-react'
import clientService from '../../../utils/clientService'

export default function SendEthButton({ client, amount }) {


    const [disabled, setDisabled] = useState(false)

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
        console.log({ wallet: client.walletAddress, amount: amount })
    }


    return (
        <Button size='tiny' disabled={disabled} onClick={sendHandler}>{!disabled ? 'Send' : 'Sent'}</Button>
    )
}