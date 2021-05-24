import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        /* Send a request to the server for authentication */
        axios.post('https://flixofficial.herokuapp.com/login', {
            Username: username,
            Password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('The user doesnt exist')
                alert('Invalid username or password');
            });
    };

    return (
        <Form>
            <h1 className='text'>Welcome to myFlix!</h1>
            <p className='mb-5'>Please login to continue.</p>
            <Form.Group controlId='formUsername'>
                <Form.Label>Username:</Form.Label>
                <Form.Control type='text' placeholder='Enter Username' onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='formPassword'>
                <Form.Label>Password:</Form.Label>
                <Form.Control type='password' placeholder='Enter Password' onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant='success' type='submit' onClick={handleSubmit}>
                Login
            </Button>
            <Button variant='dark' onClick={props.toggleRegister}>
                New User
            </Button>
        </Form>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
    onRegister: PropTypes.func,
};