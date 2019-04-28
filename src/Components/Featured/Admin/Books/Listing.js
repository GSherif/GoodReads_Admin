import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { context } from '../../../../App';

import BookAdminCard from './Card';
import AddBookForm from './AddEdit';
import LoaderGIF from '../../../Shared/Loader/Loader';
export default class BooksAdminListing extends React.Component {
    constructor() {
        super();
        this.state = {
            books: [],
            showAddModal: false,
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.updateBooks = this.updateBooks.bind(this);
    }
    handleClose = () => {
        this.setState({ showAddModal: false });
    }
    handleShow = () => {
        this.setState({ showAddModal: true })
    }
    componentDidMount() {
        debugger;
        axios.get(`http://localhost:3000/api/books/`)
            .then(data => {
                debugger;
                this.setState({ books: data });
            })
            .catch(err => {
                debugger;
                // this.props.history.push('/error');
                console.log(err);
            });
    }
    updateBooks() {
        axios.get(`http://localhost:3000/api/books/`)
            .then(data => {
                this.setState({ books: data });
            })
            .catch(err => {
                // this.props.history.push('/error');
                console.log(err);
            });
    }
    render() {
        return (
            <Container fluid={true} className="p-2">
                {this.state.showAddModal && <AddBookForm show={this.state.showAddModal} onHide={this.handleClose} editmode={false} />}
                <Row className="no-gutters m-1 d-flex flex-row-reverse">
                    <Button className="align-self-end border-0 bg-darkgrey" onClick={this.handleShow}><i className="fas fa-book"></i> <i className="fas fa-plus"></i></Button>
                </Row>
                <Row className="no-gutters m-1">
                    <Col sm={12}>
                        <Table bordered hover responsive className="text-center">
                            <thead className="text-white bg-darkgrey">
                                <tr>
                                    <th>ID</th>
                                    <th>Cover</th>
                                    <th>Title</th>
                                    <th>Category ID</th>
                                    <th>Author ID</th>
                                    <th colSpan="2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!this.state.books.length ? <LoaderGIF /> :
                                    this.state.books.filter(b => b.deleted === false).map(b => <BookAdminCard {...b} key={b._id} update={this.updateBooks} />)}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    }
}