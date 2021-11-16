import React, { useState, useEffect } from "react";
import { Grid, Header, Form, Button, Checkbox, Input } from 'semantic-ui-react'
import './AddClient.css'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import SuccessMessage from '../../components/SuccessMessage/SuccessMessage'
import clientService from '../../utils/clientService'
import { Slider } from '@mui/material'


export default function AddClient() {

    const [error, setError] = useState()
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

    const trialOptions = [
        { key: 'trial1', value: 'trial1', name: 'trialIdentification', text: 'Trial 1' },
        { key: 'trial2', value: 'trial2', name: 'trialIdentification', text: 'Trial 2' },
        { key: 'trial3', value: 'trial3', name: 'trialIdentification', text: 'Trial 3' },
        { key: 'trial4', value: 'trial4', name: 'trialIdentification', text: 'Trial 4' },
    ];

    function handleInput(e) {

        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value,
        });
    }
    function handleValidation() {
        let formIsValid = true;
        if (formInput.trialIdentification == '' || formInput.trialIdentification == 'undefined') {
            formIsValid = false
            setError('Select a trial')
        }
        if (name == true && formInput.name.length < 4) {
            formIsValid = false
            setError('Check input of name')
        }
        //put web3 validation ===== isAddress(formInput.walletAddress){ 
        // formIsValid = false
        // setError('Address invalid')
        // }
        return formIsValid;
    }


    async function handleSubmit() {
        if (handleValidation()) {
            try {
                if (name == false) {
                    const data = await clientService.addClient({
                        percentageParticipated: formInput.percentageParticipated,
                        walletAddress: formInput.walletAddress,
                        trialIdentification: formInput.trialIdentification,
                        name: 'Anonymous'
                    })
                    setSuccess(data.msg)
                } else {
                    const data = await clientService.addClient(formInput)
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

    return (
        <>

            <Grid
                textAlign="center"
                style={{ height: "100vh" }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 425 }}>
                    <Header as="h2" color="blue" textAlign="center">
                        <span className="signupText">Add Client Form</span>
                    </Header><br />


                    <Form autoComplete="off" onSubmit={handleSubmit}>
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
                            options={trialOptions}
                            onChange={handleSelect}
                            required={true} />
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


                        <Button type="submit" className="btn" id="signupButton">
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