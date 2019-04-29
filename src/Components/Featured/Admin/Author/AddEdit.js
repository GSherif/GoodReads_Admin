import { Form, Button, Modal } from 'react-bootstrap';
import React from 'react';
import { addauthor, editauthor } from '../../../../API/Authors';

import SimpleSchema from 'simpl-schema';

import uuidv1 from 'uuid/v1';


export default class AddEditAuthorForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.editmode) {
      this.state = {
        firstname: this.props.editmode ? this.props.firstname : "",
        lastname: this.props.editmode ? this.props.lastname : "",
        photourl: this.props.editmode ? this.props.photourl : "",
        birthdate: this.props.editmode ? this.props.birthdate : "",
        errors: [],

      };
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = () => (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newAuthor = {
      id: uuidv1(),
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      photourl: this.state.photourl,
      birthdate: this.state.birthdate,
      deleted: false,
    };
    let formValidator = new SimpleSchema({
      firstname: {
        type: String, required: true, min: 3, max: 50
      },
      lastname: {
        type: String, required: true, min: 3, max: 50
      },
      photourl: { type: String, regEx: SimpleSchema.RegEx.Url },
      birthdate: String,
      extras: {
        type: Object,
        blackbox: true
      }
    }, { requiredByDefault: false });

    let formValidatorCtx = formValidator.newContext();
    formValidatorCtx.validate(formValidatorCtx.clean(newAuthor));

    if (formValidatorCtx.validationErrors().length === 0) {
      if (this.props.editmode) {
        // edit function
        newAuthor.id = this.props.id;
        editauthor({ ...newAuthor })
          .then((res) => {
            console.log(res);
            this.props.update();
          })
          .catch((error) => {
            console.log(error);
          });
      }
      else {

        // add function
        addauthor({ ...newAuthor })
          .then((res) => {
            console.log(res);
            this.props.update();
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.setState({
        photourl: '', birthdate: '', firstname: '', lastname: ''
      });
      this.props.onHide();
    }
    else {
      this.setState({ errors: [...formValidatorCtx.validationErrors()] });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (

      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton className="text-white bg-darkgrey">
          <Modal.Title>{this.props.editmode ? 'Edit Author' : 'Add New Author'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit} >
            <Form.Group controlId="fName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                isValid={!this.state.errors.find(e => e.name === "firstname")}
                isInvalid={this.state.errors.find(e => e.name === "firstname")}
                placeholder="Enter First Name"
                name="firstname"
                value={this.state.firstname}
                onChange={this.handleChange} />
              <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Name must be between 3-50 characters!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="lName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                placeholder="Enter Last Name"
                name="lastname"
                value={this.state.lastname}
                onChange={this.handleChange}
                isValid={!this.state.errors.find(e => e.name === "lastname")}
                isInvalid={this.state.errors.find(e => e.name === "lastname")} />
              <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Name must be between 3-50 characters!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="photoURL">
              <Form.Label>Photo URl</Form.Label>
              <Form.Control
                placeholder="Enter Photo URL"
                name="photourl"
                value={this.state.photourl}
                onChange={this.handleChange}
                isInvalid={this.state.errors.find(e => e.name === "photourl")} />
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
          <Button className="bg-mint border-0" type="submit" onClick={this.handleSubmit}>{this.props.editmode ? 'Save Changes' : 'Add'}</Button>
        </Modal.Footer>
      </Modal>

    );
  }
}
