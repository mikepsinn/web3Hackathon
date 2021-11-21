import React, { useState, useEffect } from 'react'
import './TrialsFind.css'
import { Form, Grid, Loader, Table, Button, Input } from 'semantic-ui-react'
import trialsService from '../../../utils/trialsService'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'
import validator from 'validator';
import SendEthButton from '../../MOLECULES/SendEthButton/SendEthButton'


export default function TrialsFind(props) {
    const [loading, setLoading] = useState(false)
    const [showEth, setShowEth] = useState(false)
    const [show, setShow] = useState(true)
    const [errorEth, setErrorEth] = useState()
    const [error, setError] = useState()
    const [payment, setPayment] = useState(false)
    const [perClient, setPerClient] = useState()
    const [input, setInput] = useState({
        ethInput: ''
    })
    const [compile, setCompile] = useState(false)
    const [currentTrial, setCurrentTrial] = useState()
    const [formInput, setFormInput] = useState({
        trial: ''
    })
    const [clients, setClients] = useState()


    function handleSelect(e, { value }) {
        setFormInput({ ...formInput, ['trial']: value })
        setCurrentTrial(value)
    }

    function toggle(e) {
        e.preventDefault()
        setShow(true)
    }

    async function backendPayload(arr, trial) {
        let payload = { trialId: trial, participants: arr }
        console.log(payload)
    }

    function resetHandler() {
        setCompile(false)
        setShowEth(false)
        setInput({ ethInput: '' })
        setPayment(false)
    }


    function percentByTrial(client) {
        let trials = client.trials
        for (let i = 0; i < trials.length; i++) {
            if (trials[i].trialIdentification === formInput.trial) {
                return trials[i].percentageCompleted
            } else {
                console.log(false)
            }
        }
    }

    async function selectHandler(e) {
        e.preventDefault()
        setLoading(true)
        const data = await trialsService.findClients(formInput.trial)
        setClients(data.clients)
        setShow(false)
        setLoading(false)

    }

    async function getTotals(total) {
        let clientPayload = [];
        let sumPercent = 0;

        clients.forEach((client) => {
            client.trials.forEach((trial, i) => {
                if (trial.trialIdentification === currentTrial) {
                    clientPayload.push(trial)
                }
            })
        })
        clientPayload.forEach((client) => {
            sumPercent += client.percentageCompleted
        })

        await setPerClient(total / sumPercent)
        setCompile(true);
        setPayment(true)
    }


    function handleInput(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }


    async function handleSubmitEth(e) {
        e.preventDefault()
        if (!validator.isNumeric(input.ethInput)) {
            setErrorEth('Only Numeric Values Allowed')
        } else {
            await getTotals(input.ethInput)
        }
    }


    useEffect(() => {
        const timer = setTimeout(() => {
            setError(null);
        }, 3000);
        return () => clearTimeout(timer);
    }, [error]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorEth(null);
        }, 3000);
        return () => clearTimeout(timer);
    }, [errorEth]);

    if (loading) {
        return (
            <Grid
                textAlign="center"
                style={{ height: "50vh" }, { margin: '10em' }}
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

        if (show == true) {
            return (

                <Form>
                    <label>Find clients of trial</label>
                    <br /><br />
                    <Form.Select
                        placeholder='Select Associated Trial'
                        id='TrialFindSelect'
                        options={
                            props.trials.map(trial => {
                                return {
                                    key: trial.name,
                                    value: trial._id,
                                    text: trial.name
                                }
                            })
                        }
                        onChange={handleSelect}
                        required={true}
                    /> <Form.Button id='TrialFindButtonForm' size='mini' onClick={selectHandler}>Search</Form.Button>
                </Form>
            )
        } else if (!show) {
            if (!showEth) {
                return (
                    <>
                        <Table unstackable celled compact='very'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell width={8}>ETH Wallet Address</Table.HeaderCell>
                                    <Table.HeaderCell width={1} >% Completed</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {clients.map((client, i) => {
                                    return (
                                        <>
                                            <Table.Row key={i}>
                                                <Table.Cell key={i, 0} style={{ fontSize: '10px' }}>{client.walletAddress}</Table.Cell>
                                                <Table.Cell key={i, 1}>{percentByTrial(client)}</Table.Cell>
                                            </Table.Row>
                                        </>
                                    )
                                })}
                            </Table.Body>
                            <Table.Footer></Table.Footer>
                        </Table>
                        <Button style={{ marginRight: '2em' }} onClick={toggle}>Select Another Trial</Button>
                        <Button onClick={() => { setShowEth(true) }}>Convert to ETH</Button>
                        <ErrorMessage error={error} />
                    </>
                )
            } else {
                return (
                    <>
                        {!payment ?
                            <>
                                <Form>
                                    <Input
                                        placeholder='Total Amount of ETH'
                                        name='ethInput'
                                        value={input.ethInput}
                                        onChange={handleInput}
                                        required
                                    ></Input>
                                    <Button onClick={handleSubmitEth} style={{ position: 'absolute', right: '2vw', color: 'darkgreen', backgroundColor: 'lightgray' }}>Compile</Button>
                                </Form>
                                <br />
                                <label style={{ color: 'red', fontSize: '10px', marginBottom: '-.05em' }}>{errorEth}</label>
                                <img src={process.env.PUBLIC_URL + 'ethereum.png'} alt='ETH icon' style={{ height: '2em', position: 'absolute', left: '10vw', top: '6vh' }} />
                            </> : ''}
                        <Table unstackable celled compact='very' style={{ marginTop: '0em' }}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell width={8}>ETH Wallet Address</Table.HeaderCell>
                                    <Table.HeaderCell width={1} >Eth to Send</Table.HeaderCell>
                                    {payment ?
                                        <Table.HeaderCell width={3}>ETH Wallet Address</Table.HeaderCell>
                                        : ''}
                                </Table.Row>
                            </Table.Header>
                            {!compile ?
                                <Table.Body>
                                    {clients.map((client, i) => {
                                        return (
                                            <>
                                                <Table.Row key={client + i}>
                                                    <Table.Cell key={i, 0} style={{ fontSize: '10px' }}>{client.walletAddress}</Table.Cell>
                                                    <Table.Cell key={i, 1} style={{ fontSize: 10 }}>Please Compile</Table.Cell>
                                                </Table.Row>
                                            </>
                                        )
                                    })}
                                </Table.Body>
                                :
                                <Table.Body>
                                    {clients.map((client, i) => {
                                        return (
                                            <>
                                                <Table.Row key={i + client}>
                                                    <Table.Cell key={i, 0} style={{ fontSize: '10px' }}>{client.walletAddress}</Table.Cell>
                                                    <Table.Cell key={i, 1} style={{ fontSize: '10px' }}>{(percentByTrial(client) * perClient).toFixed(6)}</Table.Cell>
                                                    {payment ?
                                                        <Table.Cell key={i, 2} style={{ fontSize: 10 }} ><SendEthButton client={client} amount={(percentByTrial(client) * perClient)} /></Table.Cell>
                                                        : ''}
                                                </Table.Row>
                                            </>
                                        )
                                    })}
                                </Table.Body>
                            }
                            <Table.Footer></Table.Footer>
                        </Table>
                        <Button style={{ marginRight: '2em' }} onClick={toggle}>Select Another Trial</Button>
                        <Button onClick={resetHandler}>Return</Button>
                        <ErrorMessage error={error} />
                    </>
                )
            }
        }

    }
}
