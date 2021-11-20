import React, { useState, useEffect } from "react";
import { Grid, Header, Form, Button, Checkbox, Input, Loader } from 'semantic-ui-react'
import './AddClient.css'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import SuccessMessage from '../../components/SuccessMessage/SuccessMessage'
import clientService from '../../utils/clientService'
import { Slider } from '@mui/material'
import trialsService from "../../utils/trialsService";
import { ethers } from "ethers";
import { NFTStorage, File } from 'nft.storage';
import Transactor from '../../Solidity/helpers/Transactors';
import detectEthereumProvider from '@metamask/detect-provider';
import variableTest from '../../Solidity/helpers/test'

export default function AddClient() {

    const [status, setStatus] = useState();
    const [getNetworkStatus, setGetNetworkStatus] = useState();

    // The Contract interface
    const abi = [
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "tokenName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "symbol",
                        "type": "string"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "approved",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "approved",
                        "type": "bool"
                    }
                ],
                "name": "ApprovalForAll",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "baseURI",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "getApproved",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    }
                ],
                "name": "isApprovedForAll",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "metadataURI",
                        "type": "string"
                    }
                ],
                "name": "mintToken",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "ownerOf",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "_data",
                        "type": "bytes"
                    }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "approved",
                        "type": "bool"
                    }
                ],
                "name": "setApprovalForAll",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes4",
                        "name": "interfaceId",
                        "type": "bytes4"
                    }
                ],
                "name": "supportsInterface",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "symbol",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "index",
                        "type": "uint256"
                    }
                ],
                "name": "tokenByIndex",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "index",
                        "type": "uint256"
                    }
                ],
                "name": "tokenOfOwnerByIndex",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "tokenURI",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "totalSupply",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ];

    // Connect to the network
    // const provider = ethers.getDefaultProvider();

    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    const signer = provider.getSigner();
    // const network = provider.getNetwork();

    async function getNetworkAddy() {
        return await provider.getNetwork()
    }
    // let testvar;
    getNetworkAddy().then((res) => { if (!getNetworkStatus) { setGetNetworkStatus(res) } })
    console.log(getNetworkStatus)

    // The address from the above deployment example
    const contractAddress = "0xA398d48Dc96A12dB2bB36CdbaA743E0c0366d859";

    // We connect to the Contract using a Provider, so we will only
    // have read-only access to the Contract
    const contract = new ethers.Contract(contractAddress, abi, signer);

    async function mintNFT({ ownerAddress }) {

        // console.log(await contract.estimateGas.getValue());

        // First we use the nft.storage client library to add the image and metadata to IPFS / Filecoin
        // const apiKey = process.env.NFT_STORAGE_KEY;
        const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE4NkU1OTlmZmY1MjA4MTZBYTQ1M2Y3OTg1OWQzNDZmQTFmN2VmNTIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzNzEwMjA2MDkzMiwibmFtZSI6IkZpcnN0QVBJS2V5In0.mPCR2jq5fCcRdUbKEGXfdxY8I9b3NuAxx9i6Y0EyhCE'
        const client = new NFTStorage({ token: apiKey })
        const metadata = await client.store({
            name: 'CliNFT',
            description: `Trial ID: ${formInput.trialIdentification} Participation Percentage: ${formInput.percentageParticipated} `,
            image: new File(
                [],
                process.env.PUBLIC_URL + 'metamask.png',
                { type: 'image/png' }
            ),
        })
        console.log(metadata.url);

        const provider = await new ethers.providers.Web3Provider(window.ethereum, 'any');
        const gasPrice = await provider.getGasPrice()._hex;


        // the returned metadata.url has the IPFS URI we want to add.
        // our smart contract already prefixes URIs with "ipfs://", so we remove it before calling the `mintToken` function
        const metadataURI = metadata.url.replace(/^ipfs:\/\//, "");

        // scaffold-eth's Transactor helper gives us a nice UI popup when a transaction is sent

        // variableTest(provider, getNetworkStatus);

        const transactor = Transactor(provider, gasPrice, signer, getNetworkStatus);
        console.log(await transactor());
        const tx = await transactor(contract.mintToken(ownerAddress, metadataURI));

        setStatus("Blockchain transaction sent, waiting confirmation...");

        // Wait for the transaction to be confirmed, then get the token ID out of the emitted Transfer event.
        console.log(await tx);
        const receipt = await tx.wait();
        let tokenId = null;
        for (const event of receipt.events) {
          if (event.event !== 'Transfer') {
              continue
          }
          tokenId = event.args.tokenId.toString();
          break;
        }
        setStatus(`Minted token #${tokenId}`);
        return tokenId;
    }






    const [error, setError] = useState()
    const [trials, setTrials] = useState()
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState()
    const [name, setName] = useState(true)
    const [formInput, setFormInput] = useState({
        name: '',
        walletAddress: '',
        percentageParticipated: 50,
        trialIdentification: ''
    })


    const handleSlider = (e, value) => setFormInput({ ...formInput, ['percentageParticipated']: value });
    const handleSelect = (e, { value }) => setFormInput({ ...formInput, ['trialIdentification']: value });

    function handleInput(e) {

        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value,
        });
    }
    async function handleValidation() {
        let formIsValid = true;
        if (!formInput.trialIdentification || formInput.trialIdentification == '') {
            formIsValid = false
            setError('Select a trial')
        }
        if (name == true && formInput.name.length < 4) {
            formIsValid = false
            setError('Check input of name')
        }
        if (formInput.walletAddress) {

            try {
                const data = await ethers.utils.getAddress(formInput.walletAddress)
                if (data) {
                }

            } catch (err) {

                formIsValid = false
                if (err.argument) {
                    setError('Invalid Wallet Address')
                } else {
                    setError(err.argument + ' has returned the following error: ' + err.code)
                }

            }
        }
        return formIsValid;
    }

    async function handleSubmit() {
        if (await handleValidation() === true) {
            try {
                if (name == false) {
                    const data = await clientService.addClient({
                        percentageParticipated: formInput.percentageParticipated,
                        walletAddress: formInput.walletAddress,
                        trialIdentification: formInput.trialIdentification,
                        name: 'Anonymous'
                    })
                    mintNFT(formInput.walletAddress);
                    setSuccess(data.msg)
                } else {
                    const data = await clientService.addClient(formInput)
                    mintNFT(formInput.walletAddress);
                    setSuccess(data.msg)
                }
            } catch (err) {
                setError(err.message)
            }
        }
    }

    function toggleName() {
        setName(!name)
    }

    useEffect(() => {
        async function getTrials() {
            setLoading(true)
            let data = await trialsService.getTrials()
            await setTrials(data.trials)
            setLoading(false)
        }
        getTrials();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setError(null);
        }, 3000);
        return () => clearTimeout(timer);
    }, [error]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccess(null);
        }, 3000);
        return () => clearTimeout(timer);
    }, [success]);

    if (loading) {
        return (
            <Grid
                textAlign="center"
                style={{ height: "100vh" }, { margin: '10em' }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Loader size="large" active>
                        Loading
                    </Loader>
                </Grid.Column>
            </Grid>
        );
    } else {

        return (
            <>
                <Grid
                    textAlign="center"
                    style={{ margin: "1em" }}
                    verticalAlign="middle"
                >
                    <Grid.Column style={{ maxWidth: 425 }}>
                        <Header as="h2" color="blue" textAlign="center">
                            <span className="signupText">Add Client Form</span>
                        </Header><br />


                        <Form autoComplete="off">
                            <div id='inputCont'>
                                <label id='nameLabelClient' className='formLabel' style={name ? { color: 'black' } : { color: 'lightgray' }}>Name</label>
                                <div id='checkboxCont'>
                                    <label id='checkboxLabel' style={{ fontSize: '10px', marginRight: '-1em' }}> <i>Client Prefers to be Anonymous: </i></label>
                                    <div id='boxCont' style={{ backgroundColor: '#00000030', padding: '0em .15em 0em .0em', borderRadius: '3px', height: '1.3em' }}>
                                        <Checkbox id='checkBoxClient' onClick={toggleName} />
                                    </div>
                                </div>
                            </div>
                            <Form.Field>

                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Name of Client or Select Anon."
                                    value={formInput.name}
                                    onChange={handleInput}
                                    disabled={name ? false : true}
                                />
                            </Form.Field>


                            <label className='formLabel'>Wallet Address</label>
                            <Form.Input
                                name="walletAddress"
                                placeholder="Wallet Address"
                                value={formInput.walletAddress}
                                onChange={handleInput}
                                required
                            />
                            <br />


                            <label className='formLabel'>Trial Identification</label>
                            <Form.Select
                                placeholder='Select Associated Trial'
                                options={
                                    trials.map(trial => {
                                        return {
                                            key: trial.name,
                                            value: trial._id,
                                            text: trial.name
                                        }
                                    })
                                }
                                onChange={handleSelect}
                                required />
                            <br />


                            <label className='formLabel'>Percentage Completed</label><br />
                            <Slider
                                size='small'
                                defaultValue={50}
                                step={5}
                                marks
                                min={0}
                                max={100}
                                onChange={handleSlider}
                                valueLabelDisplay='auto'
                                style={{ color: 'rosybrown' }}
                                color='secondary'
                            />
                            <br /><br />


                            <Button onClick={handleSubmit} type="submit" className="btn" id="signupButton">
                                Submit
                            </Button>

                        </Form>

                        {error ? <ErrorMessage error={error} /> : null}
                        {success ? <SuccessMessage success={success} /> : null}
                    </Grid.Column>
                </Grid>
            </>
        );
    }
}