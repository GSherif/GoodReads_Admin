import React from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { getauthorsList } from '../../../../API/Authors';
import LoaderGIF from '../../../Shared/Loader/Loader';


import AuthorAdminCard from './Card';
import AddAuthorForm from './AddEdit';
export default class AuthorsAdminListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Authors: [],
            showAddModal: false,
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);

    }
    handleClose = () => {
        this.setState({ showAddModal: false });
    }
    handleShow = () => {
        this.setState({ showAddModal: true })
    }
    componentDidMount() {
        getauthorsList()
            .then((res) => {
                const data = res;
                this.setState({ Authors: data });
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });

        this.updateauthors = () => {
            getauthorsList()
                .then((res) => {
                    const data = res;
                    this.setState({ Authors: data });
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    render() {
        return (
            <Container fluid={true} className="p-2">
                {this.state.showAddModal && <AddAuthorForm show={this.state.showAddModal} onHide={this.handleClose} editmode={false} />}
                <Row className="no-gutters m-1 d-flex flex-row-reverse">
                    <Button className="align-self-end border-0 bg-darkgrey" onClick={this.handleShow}><i className="fas fa-user-plus"></i></Button>
                </Row>
                <Row className="no-gutters m-1">
                    <Col sm={12}>
                        <Table bordered hover responsive className="text-center">
                            <thead className="text-white bg-darkgrey">

                                <tr>
                                    <th>ID</th>
                                    <th>Photo URL</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Birth Date</th>
                                    <th colSpan="2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {!this.state.Authors.length ? <LoaderGIF /> :
                                    this.state.Authors.filter(a => a.deleted === false).map(a => <AuthorAdminCard {...a} key={a._id} update={this.updateauthors} />)}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    }
}