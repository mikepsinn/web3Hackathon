import React, { useState, useEffect } from 'react'
import './TrialsFind.css'
import { Form, Grid, Loader, Table, Button } from 'semantic-ui-react'
import trialsService from '../../../utils/trialsService'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'


export default function TrialsFind(props) {
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(true)
    const [error, setError] = useState()
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

    async function handleDividends() {
        const clientPayload = []
        clients.forEach((client) => {
            client.trials.forEach((trial, i) => {
                if (trial.trialIdentification === currentTrial) {
                    clientPayload.push(trial)
                }
            })
        })
        try {
            backendPayload(clientPayload, currentTrial)
            // history.push('/success')
        } catch (err) {
            setError(err)
        }
    }


    useEffect(() => {
        const timer = setTimeout(() => {
            setError(null);
        }, 3000);
        return () => clearTimeout(timer);
    }, [error]);

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
                        required
                    /> <Form.Button id='TrialFindButtonForm' size='mini' onClick={selectHandler}>Search</Form.Button>
                </Form>

            )
        } else if (!show) {
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
                    <Button onClick={handleDividends}>Send Dividends</Button>
                    <ErrorMessage error={error} />
                </>
            )
        }

    }
}
