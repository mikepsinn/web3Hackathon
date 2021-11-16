import React, { useState } from "react";
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
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
    });

    function handleInput(e) {
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value,
        });
    }


    function handleValidation() {
        let formIsValid = true;

        //Name

        if (typeof formInput.username !== "undefined") {
            if (!formInput.username.length > 6) {
                formIsValid = false;
                setError('Username must be at least 6 characters')
            }
            if (!validator.isAlphanumeric(formInput.username)) {
                formIsValid = false;
                setError('Username must be alpha-numeric')
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
                // minSymbols: 1, 
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
        console.log(formIsValid)
        return formIsValid;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (handleValidation()) {
            userService.signup(formInput);
        }
        history.push("/index");
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
                            <span className='alreadyClientText'>Already a client?</span>
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
                        {/* <Segment stacked className="signupForm"> */}
                        <label className='formLabel'>Username <span style={{ fontSize: '8px' }}>(at least 6 characters alpha-numeric)</span></label>
                        <Form.Input
                            class='test'
                            name="username"
                            placeholder="username"
                            value={formInput.username}
                            onChange={handleInput}
                            required
                        />
                        <label className='formLabel'>Email</label>
                        <Form.Input
                            type="email"
                            name="email"
                            placeholder="email"
                            value={formInput.email}
                            onChange={handleInput}
                            required
                        />
                        <br />
                        <label className='formLabel'>Password <br /> <span style={{ fontSize: '8px' }}>must contain at least 1: uppercase, lowercase, number and symbol</span></label>
                        <Form.Input
                            name="password"
                            type="password"
                            placeholder="password"
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
                        {/* </Segment> */}
                    </Form>
                </Grid.Column>
            </Grid>
        </>
    );
}
