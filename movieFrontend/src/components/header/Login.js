import React, { useState, useContext } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';

const Login = ({ show, handleClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/users/login', { username, password });
      login({ username });
      showMessage(`Hello ${username}`, 'success');
      setTimeout(() => {
        handleClose();
        clearMessage();
      }, 1000);
    } catch (error) {
      console.error('Login failed:', error);
      showMessage('Login failed', 'danger');
    }
  };

  const showMessage = (text, variant) => {
    setMessage({ text, variant });
  };

  const clearMessage = () => {
    setMessage(null);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && <Alert variant={message.variant}>{message.text}</Alert>}
        <Form>
          <Form.Group className="mb-3" controlId="loginUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleLogin}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
