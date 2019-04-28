import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { login } from '../../../API/admin';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    handleChange = (fieldName) => (e) => {
        this.setState({ [fieldName]: e.target.value });
    }

    handleSubmit = () => {
        const { username, password } = this.state;
        debugger;
        login({ username, password })
            .then(res => {
                localStorage.setItem('token', res.token);
                this.props.history.push('/admin');
            })
            .catch(err => {

            })
    }

    render() {
        const { username, password } = this.state;
        return (
            <Form className='login bg-darkgrey form-border' onSubmit={this.handleSubmit()}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="text-white">Username</Form.Label>
                    <Form.Control type="text" name="username" placeholder="Enter username" value={username} onChange={this.handleChange('username')} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label className="text-white">Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange('password')} />
                </Form.Group>
                <Button className="login-btn" type="submit">
                    Login
                </Button>
            </Form>
        )
    }
}