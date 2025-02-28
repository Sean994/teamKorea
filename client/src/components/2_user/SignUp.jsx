// New Signup component. This component allows a user to sign up for our amazing
// Korean food delivery service.

import { useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useMain } from '../utils/MainProvider';

const axios = require('axios').default;

const AlertDismissibleExample = ({ message }) => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>{message}</p>
      </Alert>
    );
  }
  return <Button onClick={() => setShow(true)}>Show Alert</Button>;
};

const SignUp = () => {
  const { mainState } = useMain();
  const { user, isAuthenticated } = mainState;
  let history = useHistory();
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    // handleSubmit uses axios to POST a form
    event.preventDefault();
    if (!user.username) {
      axios
        .post('/api/v1/user', {
          first_name: event.target.first_name.value,
          last_name: event.target.last_name.value,
          contact: event.target.contact.value,
          email: event.target.email.value,
          username: event.target.username.value,
          password: event.target.password.value,
          address: event.target.address.value,
          postal_code: event.target.postal_code.value,
          birthday: event.target.birthday.value,
        })
        .then(function (response) {
          if (response.data.status === 'success') {
            console.log('New user created');
            history.push('/user/signin');
          }
        })
        .catch(function (error) {
          setError(error.response.data.error);
        });
    } else {
      axios
        .put(`/api/v1/user/${user._id}`, {
          first_name: event.target.first_name.value,
          last_name: event.target.last_name.value,
          contact: event.target.contact.value,
          email: event.target.email.value,
          username: event.target.username.value,
          password: event.target.password.value,
          address: event.target.address.value,
          postal_code: event.target.postal_code.value,
          birthday: event.target.birthday.value,
        })
        .then(function (response) {
          if (response.data.status === 'success') {
            console.log('User updated🎉', response.data);
            history.goBack();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  console.log('🍉', user);
  return (
    <div className="container px-5">
      {isAuthenticated && <h1>Edit User </h1>}
      {!isAuthenticated && <h1>New User</h1>}

      <h3>Embark on a brand new journey of gastronomic happiness.</h3>
      {error && <AlertDismissibleExample message={error} />}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              defaultValue={isAuthenticated ? user.first_name : ''}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              defaultValue={isAuthenticated ? user.last_name : ''}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Birthday</Form.Label>
            <Form.Control type="date" name="birthday" />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              name="username"
              defaultValue={isAuthenticated ? user.username : ''}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" name="password" />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              required
              type="tel"
              name="contact"
              defaultValue={isAuthenticated ? user.contact : ''}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              defaultValue={isAuthenticated ? user.email : ''}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              type="address"
              name="address"
              defaultValue={isAuthenticated ? user.address : ''}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              required
              type="number"
              name="postal_code"
              defaultValue={isAuthenticated ? user.postal_code : ''}
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
