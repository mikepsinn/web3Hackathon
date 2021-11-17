import React, { useState, useEffect } from "react";
import { Grid, Header, Form, Button, Input } from 'semantic-ui-react'
import './AddTrial.css'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import SuccessMessage from '../../components/SuccessMessage/SuccessMessage'
import trialsService from "../../utils/trialsService";


export default function AddTrial() {

    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const [formInput, setFormInput] = useState({
        name: '',
    })


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
        return formIsValid;
    }


    async function handleSubmit() {
        if (handleValidation()) {
            try {
                const data = await trialsService.addTrial(formInput)
                setSuccess(data.msg)
            } catch (err) {
                setError(err.message)
            }
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
            setSuccess(null);
        }, 3000);
        return () => clearTimeout(timer);
    }, [success]);

    return (
        <>

            <Grid
                textAlign="center"
                style={{ margin: "1em" }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 425 }}>
                    <Header as="h2" color="blue" textAlign="center">
                        <span className="signupText">Add Trial</span>
                    </Header><br />


                    <Form autoComplete="off" onSubmit={handleSubmit}>
                        <label id='nameLabelClient' className='formLabel' >Name Of Trial</label>
                        <Form.Field>
                            <Input
                                type="text"
                                name="name"
                                placeholder="Name of Trial"
                                value={formInput.name}
                                onChange={handleInput}
                            />
                        </Form.Field>

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