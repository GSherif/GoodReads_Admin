import { Form, Button, Modal } from 'react-bootstrap';
import React from 'react';

import SimpleSchema from 'simpl-schema';

import uuidv1 from 'uuid/v1';
import { context } from '../../../../App';

export default class AddEditAuthorForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.editmode) {
      this.state = {
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        photo: this.props.photo,
        birthdate: this.props.birthdate,
        errors: []
      };
    }
    else {
      this.state = {
        firstName: '',
        lastName: '',
        photo: '',
        birthdate: '',
        errors: []
      };
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit = actionHandler => (e) => {
    // e.preventDefault();
    // e.stopPropagation();
    // const newAuthor = {
    //   id: uuidv1(),
    //   firstName: this.state[firstName],
    //   lastName: this.state[lastName],
    //   photo: this.state.photo,
    //   birthdate: this.state.birthdate,
    //   deleted: false,
    // };
    // let formValidator = new SimpleSchema({
    //   firstName: {
    //     type: String, required: true, min: 3, max: 50
    //   },
    //   lastName: {
    //     type: String, required: true, min: 3, max: 50
    //   },
    //   photo: { type: String, regEx: SimpleSchema.RegEx.Url },
    //   birthdate: String,
    //   extras: {
    //     type: Object,
    //     blackbox: true
    //   }
    // }, { requiredByDefault: false });

    // let formValidatorCtx = formValidator.newContext();
    // formValidatorCtx.validate(formValidatorCtx.clean(newAuthor));

    // if (formValidatorCtx.validationErrors().length === 0) {
    //   if (this.props.editmode) {
    //     newAuthor.id = this.props.id;
    //     actionHandler(newAuthor); // edit function
    //   }
    //   else {

    //     actionHandler(newAuthor); // add function
    //   }
    //   this.setState({
    //     photo: '', birthdate: '', firstName: '', lastName: ''
    //   });
    //   this.props.onHide();
    // }
    // else {
    //   this.setState({ errors: [...formValidatorCtx.validationErrors()] });
    // }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <context.Consumer>
        {
          value => (
            <Modal show={this.props.show} onHide={this.props.onHide}>
              <Modal.Header closeButton className="text-white bg-darkgrey">
                <Modal.Title>{this.props.editmode ? 'Edit Author' : 'Add New Author'}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={this.props.editmode ? this.handleSubmit(value.editAuthor) : this.handleSubmit(value.addAuthor)} >
                  <Form.Group controlId="fName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      isValid={!this.state.errors.find(e => e.name === "firstName")}
                      isInvalid={this.state.errors.find(e => e.name === "firstName")}
                      placeholder="Enter First Name"
                      name="firstName"
                      value={this.statefirstName}
                      onChange={this.handleChange} />
                    <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Name must be between 3-50 characters!</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="lName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      placeholder="Enter Last Name"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.handleChange}
                      isValid={!this.state.errors.find(e => e.name === "lastName")}
                      isInvalid={this.state.errors.find(e => e.name === "lastName")} />
                    <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Name must be between 3-50 characters!</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="photoURL">
                    <Form.Label>Photo URl</Form.Label>
                    <Form.Control
                      placeholder="Enter Photo URL"
                      name="photo"
                      value={this.state.photo}
                      onChange={this.handleChange}
                      isInvalid={this.state.errors.find(e => e.name === "photo")} />
                    <Form.Control.Feedback type="invalid">Invalid URL!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="birthdate">
                    <Form.Label>Birthdate</Form.Label>
                    <Form.Control type="date" placeholder="Enter Birthdate" name="birthdate" value={this.state.birthdate} onChange={this.handleChange} />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                <Button className="bg-mint border-0" type="submit" onClick={this.props.editmode ? this.handleSubmit(value.editAuthor) : this.handleSubmit(value.addAuthor)}>{this.props.editmode ? 'Save Changes' : 'Add'}</Button>
              </Modal.Footer>
            </Modal>
          )
        }
      </context.Consumer>


    );
  }
}
