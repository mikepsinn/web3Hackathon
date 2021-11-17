import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import { Button, Segment } from 'semantic-ui-react'





export default function Home() {

    return (
        <>
            <Segment style={{ maxWidth: 425, margin: 'auto', marginTop: '2em' }}>
                <h2>Welcome to C.T.S.</h2>
                <br />
                <p>C.T.S. is an NFT(Non-fungible Token) minting and payment service designed to
                    support both manufacturing companies and trial participants alike. </p>
                <p>
                    Through this one of a kind DApp (Decentralized Application), Doctors/Clinicians can add their
                    clients unique Etherium wallet addresses, and issue an NFT for participation
                    in a particular Clinical Trial.
                </p>
                <p>
                    Participants are minted an NFT based upon their participation in each trial, and
                    that NFT provides both validity of participation, as well as the amount of the study
                    they completed.
                </p>
                <p>
                    At the end of a study, should the drug become FDA approved and go to market,
                    C.T.S. (through smart contracts on the block-chain) will dispurse a percentage of
                    the total revenue of that medication, and share earnings to those who participated
                    in the original clinical study, via verification of the previously minted NFT.
                </p>

            </Segment>
            <div style={{ marginTop: '1em', marginBottom: '8em' }}>
                <Link to='/login'><Button style={{ marginRight: '10em' }}>Login</Button></Link>
                <Link to='register'><Button >Register</Button></Link>
            </div>
        </>
    )
}