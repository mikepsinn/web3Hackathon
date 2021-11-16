import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { Grid, Header, Form, Segment, Button, Icon } from "semantic-ui-react";
import userService from "../../utils/userService";
import { useHistory } from "react-router-dom";
import "./SignupPage.css";
import validator from 'validator';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

export default function SignUpPage(props) {
    const history = useHistory();
    const [error, setError] = useState('')
    const [formInput, setFormInput] = useState({
        employeeId: "",
        password: "",
        confirmPassword: "",
        email: "",
        accessToken: ''
    });

    function handleInput(e) {
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value,
        });
    }


    function handleValidation() {
        let formIsValid = true;

        //Employee ID

        if (typeof formInput.employeeId !== "undefined") {
            if (!validator.isNumeric(formInput.employeeId)) {
                formIsValid = false;
                setError('ID must be numbers only')
            }
        }

        //Email

        if (typeof formInput.email !== "undefined") {
            let lastAtPos = formInput.email.lastIndexOf("@");
            let lastDotPos = formInput.email.lastIndexOf(".");

            if (
                !(
                    lastAtPos < lastDotPos &&
                    lastAtPos > 0 &&
                    formInput.email.indexOf("@@") == -1 &&
                    lastDotPos > 2 &&
                    formInput.email.length - lastDotPos > 2
                )
            ) {
                formIsValid = false;
                setError('Please enter a vaild email')
            }
        }
        // Password
        if (typeof formInput.password !== "undefined") {
            if (!validator.isStrongPassword(formInput.password, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 0,
                returnScore: false,
                pointsPerUnique: 1,
                pointsPerRepeat: 0.5,
                pointsForContainingLower: 10,
                pointsForContainingUpper: 10,
                pointsForContainingNumber: 10,
                pointsForContainingSymbol: 10
            })) {
                formIsValid = false;
                setError(`Password must be 8 characters
                and must contain at least 1: uppercase, lowercase, and number`)
            }
        }

        //Confirm Password
        if (typeof formInput.confirmPassword !== "undefined") {
            if (!validator.equals(formInput.confirmPassword, formInput.password)) {
                formIsValid = false;
                setError('Passwords do not match')
            }
        }
        return formIsValid;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (handleValidation()) {
            try {
                await userService.signup(formInput);
                history.push("/index");
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

    return (
        <>
            <Grid
                textAlign="center"
                style={{ height: "100vh" }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 700 }} className="signupForm">
                    <Header as="h2" color="red" textAlign="center">
                        <span className="signupText">Register </span>
                        <i>
                            <u>
                                <Link to='/login' style={{ color: 'black' }}>
                                    <span className='loginText'>Login</span>
                                    <span className='loginTextIcon'><Icon id='loginIcon' className='long arrow alternate right' /></span>
                                </Link>
                            </u>
                        </i>
                    </Header>

                    <br />
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                        <label className='formLabel'>Employee ID </label>
                        <Form.Input
                            name="employeeId"
                            placeholder="Employee ID"
                            value={formInput.employeeId}
                            onChange={handleInput}
                            required
                        />
                        <label className='formLabel'>Company Email</label>
                        <Form.Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formInput.email}
                            onChange={handleInput}
                            required
                        />
                        <br />
                        <label className='formLabel'>Access Token</label>
                        <Form.Input
                            type="accessToken"
                            name="accessToken"
                            placeholder="Access Token"
                            value={formInput.accessToken}
                            onChange={handleInput}
                            required
                        />
                        <br />
                        <label className='formLabel'>Password <br /> <span style={{ fontSize: '8px' }}>must contain at least 1: uppercase, lowercase, number</span></label>
                        <Form.Input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={formInput.password}
                            onChange={handleInput}
                            required
                        />
                        <Form.Input
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            value={formInput.confirmPassword}
                            onChange={handleInput}
                            required
                        />

                        <ErrorMessage error={error} />
                        <br />
                        <Button type="submit" className="btn" id="signupButton">
                            Register
                        </Button>
                    </Form>
                </Grid.Column>
            </Grid>
        </>
    );
}
