import React, { useState } from 'react';
import Proptypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthdate);
    props.onRegister(username);
  }

  return (
    <Form>
      <Form.Group controlId='registerUsername'>
        <Form.Label>Username:</Form.Label>
        <Form.Control type='text' onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId='registerPassword'>
        <Form.Label>Password:</Form.Label>
        <Form.Control type='password' onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group controlId='registerEmail'>
        <Form.Label>Email:</Form.Label>
        <Form.Control type='text' onChange={e => setEmail(e.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
    </Form.Text>
      </Form.Group>
      <Form.Group controlId='registerBirthdate'>
        <Form.Label>Birthdate:</Form.Label>
        <Form.Control type='text' onChange={e => setBirthdate(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant='primary' type='submit' onClick={handleSubmit}>
        Submit
            </Button>
      <Button variant='secondary' onClick={props.toggleRegister}>
        Existing User
            </Button>

    </Form>
  )
}

RegistrationView.Proptypes = {
  onRegister: Proptypes.func.isRequired
};