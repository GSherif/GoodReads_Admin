import { Form, Button, Modal, Col } from 'react-bootstrap';
import React from 'react';
import axios from 'axios';
import SimpleSchema from 'simpl-schema';
import LoaderGIF from '../../../Shared/Loader/Loader';
import { server, EditBook, AddBook } from '../../../../API/Book';

export default class AddEditBookForm extends React.Component {
    constructor(props) {
        super(props);
        //initial values from end points when mounting??
        this.state = {
            title: this.props.editmode ? this.props.title : "",
            authorId: this.props.editmode ? this.props.authorId : "0",
            categoryId: this.props.editmode ? this.props.categoryId : "0",
            cover: this.props.editmode ? this.props.cover : "",
            errors: [],
            // Categories: [],
            // Authors: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        axios.get(`${server}/api/authors/`)
            .then(data => {
                debugger
                this.setState({ Authors: data.data }, () => {
                    console.log(this.state);
                })
            })
            .catch(err => {
                console.log(err);
            });
        axios.get(`${server}/api/categories/`)
            .then(data => {
                debugger
                this.setState({ Categories: data.data.categories }, () => {
                    console.log(this.state);
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        let newBook = {
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

        debugger
        if (formValidatorCtx.validationErrors().length === 0) {
            debugger
            if (this.props.editmode) {
                newBook._id = this.props._id;
                // actionHandler(newBook); // edit function
                EditBook(newBook)
                    .then(data => {
                        debugger
                        this.props.update();
                    })
                    .catch(err => {
                        // this.props.history.push('/error');
                        console.log(err);
                    });;
            }
            else {
                // actionHandler(newBook); // add function

                AddBook(newBook).then(res => {
                    console.log(this.props);
                    this.props.update();
                }).catch(error => console.log(error));

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
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.editmode ? "Edit Book" : "Add New Book"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.Categories &&
                        <>
                            <Form onSubmit={this.handleSubmit}>
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
                                        <option key="0" value="0">Choose Category ...</option>
                                        {
                                            this.state.Categories./*filter(c => c.deleted === false).*/map(c => <option key={c._id} value={c._id}>{c.Name}</option>)
                                        }
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control as="select" name="authorId" onChange={this.handleChange} value={this.state.authorId}>
                                        <option key="0" value="0">Choose Author ...</option>
                                        {
                                            this.state.Authors.filter(a => !a.deleted).map(a => <option key={a._id} value={a._id}>{a.firstname + ' ' + a.lastname}</option>)
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
                        </>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                    <Button className="bg-mint border-0" type="submit" onClick={this.handleSubmit}>{this.props.editmode ? "Save Changes" : "Add"}</Button>
                </Modal.Footer>
            </Modal>

        );
    }
}