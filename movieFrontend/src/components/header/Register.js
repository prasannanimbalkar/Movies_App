import React, { useState, useContext } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';

const Register = ({ show, handleClose: close }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const { login } = useContext(AuthContext);

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/users/register', { username, email, password });
      login({ username });
      showMessage(`Welcome Aboard! ${username}`, 'success');
      setTimeout(() => {
        handleClose();
      }, 2000); // Delay for 2 seconds before closing
    } catch (error) {
      console.error('Registration failed:', error);
      const errorMessage = error.response && error.response.data ? error.response.data : 'Registration failed. Please try again.';
      showMessage(errorMessage, 'danger');
    }
  };

  const showMessage = (text, variant) => {
    setMessage({ text, variant });
  };

  const clearMessage = () => {
    setMessage(null);
  };

  const handleClose = () => {
    clearMessage();
    close();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && <Alert variant={message.variant}>{message.text}</Alert>}
        <Form>
          <Form.Group className="mb-3" controlId="registerUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="registerEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="registerPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleRegister}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Register;
