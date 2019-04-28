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
        // e.preventDefault(); 
        // if (!(this.state.email && this.state.password)) return;
        const { username, password } = this.state;
        debugger;
        login({ username, password })
            .then(res => {
                localStorage.setItem('token', res.token);
                this.props.history.push('/admin');
            })
        .catch(err => {

        })
        // value.checkUser(user);
        // console.log(value.loggedUser);
        // if (value.loggedUser.admin === true) {
        //     this.props.history.push('/admin');
        // }
        // else if (value.loggedUser.admin === false) {
        //     this.props.history.push('/userProfile');
        // }
        // else {
        //     this.props.history.push('/categories');
        // }
    }

    render() {
        const { username, password } = this.state;
        return (
            <Form className='login bg-darkgrey form-border' onSubmit={this.handleSubmit()}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="text-white">Email address</Form.Label>
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