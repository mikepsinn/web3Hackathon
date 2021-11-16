import React, { useState } from "react";
import { Grid, Header, Form, Button, Checkbox, Input } from 'semantic-ui-react'
import './AddClient.css'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

export default function AddClient() {

    const [error, setError] = useState()
    const [name, setName] = useState(true)
    const [formInput, setFormInput] = useState({
        name: '',
        walletAddress: '',
        percentageCompleted: '',
    })

    function handleInput(e) {
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit() {
        console.log(formInput)
    }

    function toggleName() {
        setName(!name)
    }

    return (
        <>
            <Grid
                textAlign="center"
                style={{ height: "100vh" }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" color="red" textAlign="center">
                        <span className="signupText">Add Client Form</span>
                    </Header>
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                        <label className='formLabel'>Name</label>
                        <Form.Field>
                            <div id='inputCont'>
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Name of Client or Select Anon."
                                    value={formInput.name}
                                    onChange={handleInput}
                                    disabled={name ? false : true}
                                />
                            </div>
                            <div id='checkboxCont'>
                                <label id='checkboxLabel'> Client Prefers to be Anonymous</label>
                                <Checkbox onClick={toggleName} />
                            </div>
                        </Form.Field>
                        <label className='formLabel'>Wallet Address</label>
                        <Form.Input
                            name="walletAddress"
                            placeholder="Wallet Address"
                            value={formInput.walletAddress}
                            onChange={handleInput}
                            required
                        />
                        <label className='formLabel'>Percentage Completed</label>
                        <Form.Input
                            name="percentageCompleted"
                            placeholder="Percentage Completed"
                            value={formInput.percentageCompleted}
                            onChange={handleInput}
                            required
                        />
                        <Button type="submit" className="btn" id="signupButton">
                            Submit
                        </Button>
                    </Form>
                    {error ? <ErrorMessage error={error} /> : null}
                </Grid.Column>
            </Grid>
        </>
    );
}