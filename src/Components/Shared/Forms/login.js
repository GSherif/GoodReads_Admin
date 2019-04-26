import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { context } from '../../../App';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    handleSubmit = (value) => (e) => {
        e.preventDefault();
        if (!(this.state.email && this.state.password)) return;
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        value.checkUser(user);
        console.log(value.loggedUser);
        if (value.loggedUser.admin === true) {
            this.props.history.push('/admin');
        }
        else if (value.loggedUser.admin === false) {
            this.props.history.push('/userProfile');
        }
        else {
            this.props.history.push('/categories');
        }
    }

    render() {
        return (
            <context.Consumer>
                {
                    value => (
                        <Form className='login bg-darkgrey form-border' onSubmit={this.handleSubmit(value)}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="text-white">Email address</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label className="text-white">Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                            </Form.Group>
                            <Button className="login-btn" type="submit">
                                Login
                            </Button>
                        </Form>
                    )
                }
            </context.Consumer>
        );
    }
}