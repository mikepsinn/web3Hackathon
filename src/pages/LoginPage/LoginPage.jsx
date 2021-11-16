import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import "./LoginPage.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import {
    Grid,
    Form,
    Header,
    Button,
    Icon,
} from "semantic-ui-react";

export default function LoginPage(props) {
    const history = useHistory();
    const [error, setError] = useState("");
    const [formInput, setFormInput] = useState({
        password: "",
        email: "",
    });
    function handleInput(e) {
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await userService.login(formInput);
            props.handleSignUpOrLogin();
            history.push("/index");
        } catch (err) {
            setError(err.message);
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
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" color="red" textAlign="center">
                        <span className="signupText">Login </span>
                        <i>
                            <span className='alreadyClientText'>Not a client?</span>
                            <u>
                                <Link to='/register' style={{ color: 'black' }}>
                                    <span className='loginText'>Register</span>
                                    <span className='loginTextIcon'><Icon id='loginIcon' className='long arrow alternate right' /></span>
                                </Link>
                            </u>
                        </i>
                    </Header>
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                        <label className='formLabel'>Email</label>
                        <Form.Input
                            type="email"
                            name="email"
                            placeholder="email"
                            value={formInput.email}
                            onChange={handleInput}
                            required
                        />
                        <label className='formLabel'>Password</label>
                        <Form.Input
                            name="password"
                            type="password"
                            placeholder="password"
                            value={formInput.password}
                            onChange={handleInput}
                            required
                        />
                        <Button type="submit" className="btn" id="signupButton">
                            Login
                        </Button>
                    </Form>

                    {error ? <ErrorMessage error={error} /> : null}
                </Grid.Column>
            </Grid>
        </>
    );
}
