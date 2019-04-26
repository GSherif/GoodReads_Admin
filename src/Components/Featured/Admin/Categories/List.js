import React from 'react'
import Table from 'react-bootstrap/Table'
import { Container, Row, Col, Button } from 'react-bootstrap';

import { context } from '../../../../App';
import AdminCategoryCard from './Card'
import AdminCategoriesAddEditForm from './AddEditForm'

export default class AdminCategoriesList extends React.Component {
	constructor() {
		super();
		this.state = {
			Categories: [],
			showAddModal: false,
		}
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleShow(e) {
		this.setState({ showAddModal: true })
	}
	handleClose(e) {
		this.setState({ showAddModal: false })
	}
	render() {
		return (
			<Container >
				<Row >
					<Col sm={11}>
					</Col>
					<Col sm={1}>
						<Button className="bg-darkgrey border-0" onClick={this.handleShow}><i className="fas fa-plus-circle text-white"></i></Button>
					</Col>
				</Row>
				{this.state.showAddModal && <AdminCategoriesAddEditForm show={this.state.showAddModal} onHide={this.handleClose} editmode={false} />}
				<Table bordered hover responsive >
					<thead>
						<tr className=" text-center text-white bg-darkgrey" >
							<th>ID</th>
							<th>Name </th>
							<th> Actions </th>
						</tr>
					</thead>
					{this.state.Categories.length &&
						<tbody>
							{this.state.Categories.map(c => <AdminCategoryCard key={c.id}  {...c} />)}
						</tbody>
					}
				</Table>
			</Container>
		)
	}
}