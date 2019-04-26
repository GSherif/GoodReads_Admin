import { Form, Button, Modal, Col } from 'react-bootstrap';
import React from 'react';

import SimpleSchema from 'simpl-schema';

import { context } from '../../../../App';
import uuidv1 from 'uuid/v1';
export default class AddEditBookForm extends React.Component {
    constructor(props) {
        super(props);
        //initial values from end points when mounting??
        if (this.props.editmode) {
            this.state = {
                title: this.props.title,
                authorId: this.props.authorId,
                categoryId: this.props.categoryId,
                cover: this.props.cover,
                errors: []
            }
        }
        else {
            this.state = {
                title: "",
                authorId: "1",
                categoryId: "1",
                cover: "",
                errors: []
            }
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit = (actionHandler) => (e) => {
        e.preventDefault();
        e.stopPropagation();

        let newBook = {
            id: uuidv1(),
            title: this.state.title,
            authorId: this.state.authorId,
            categoryId: this.state.categoryId,
            cover: this.state.cover,
            deleted: false
        }

        const formValidator = new SimpleSchema({
            title: { type: String, required: true, min: 1, max: 50 },
            categoryId: { type: String, required: true },
            authorId: { type: String, required: true },
            cover: { type: String, regEx: SimpleSchema.RegEx.Url },
            extras: {
                type: Object,
                blackbox: true
            }
        }, { requiredByDefault: false });
        let formValidatorCtx = formValidator.newContext();
        formValidatorCtx.validate(formValidator.clean(newBook));

        if (formValidatorCtx.validationErrors().length === 0) {
            if (this.props.editmode) {
                newBook.id = this.props.id;
                actionHandler(newBook); // edit function
            }
            else {
                actionHandler(newBook); // add function
            }
            this.setState({ title: "", authorId: "0", categoryId: "0", cover: "" });
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
            <context.Consumer>
                {
                    value => (
                        <Modal show={this.props.show} onHide={this.props.onHide}>
                            <Modal.Header closeButton>
                                <Modal.Title>{this.props.editmode ? "Edit Book" : "Add New Book"}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={this.props.editmode ? this.handleSubmit(value.editBook) : this.handleSubmit(value.addBook)}>
                                    <Form.Group controlId="title">
                                        <Form.Label>Book Name</Form.Label>
                                        <Form.Control
                                            placeholder="Enter Book Name"
                                            name="title"
                                            value={this.state.title} onChange={this.handleChange}
                                            isValid={!this.state.errors.find(e => e.name === "title")}
                                            isInvalid={this.state.errors.find(e => e.name === "title")} />
                                        <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">Title must be between 3-50 characters!</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control as="select" name="categoryId" onChange={this.handleChange} value={this.state.categoryId}>
                                            {
                                                value.Categories.filter(c => c.deleted === false).map(c => <option key={c.id} value={c.id}>{c.name}</option>)
                                            }
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Author</Form.Label>
                                        <Form.Control as="select" name="authorId" onChange={this.handleChange} value={this.state.authorId}>
                                            {
                                                value.authors.filter(a => a.deleted === false).map(a => <option key={a.id} value={a.id}>{a['first-name'] + ' ' + a['last-name']}</option>)
                                            }
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="photoURL">
                                        <Form.Label>Book Cover</Form.Label>
                                        <Form.Control
                                            placeholder="Enter Photo URL"
                                            name="cover"
                                            value={this.state.cover} onChange={this.handleChange}
                                            isInvalid={this.state.errors.find(e => e.name === "cover")} />
                                        <Form.Control.Feedback type="invalid">Invalid URL!</Form.Control.Feedback>
                                    </Form.Group>

                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                                <Button className="bg-mint border-0" type="submit" onClick={this.props.editmode ? this.handleSubmit(value.editBook) : this.handleSubmit(value.addBook)}>{this.props.editmode ? "Save Changes" : "Add"}</Button>
                            </Modal.Footer>
                        </Modal>
                    )
                }
            </context.Consumer>


        );
    }
}