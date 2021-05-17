import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* the call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <div className="login-form">
      <Form className>
        <Form.Label>
          <h3>Welcome to MyFlix</h3>
        </Form.Label>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        <Button variant="success" className="login-button" type="button" onClick={handleSubmit}>
          Login
				</Button>
        <br />
        <br />
        <Button variant="dark" className="register-button" onClick={props.toggleRegister}>
          Register
				</Button>
        <br />
      </Form>
    </div>
  );
}

LoginView.propTypes = {
  setUsername: PropTypes.string,
  setPassword: PropTypes.string
};