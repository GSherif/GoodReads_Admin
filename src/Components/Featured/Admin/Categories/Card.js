import React from 'react'
import AdminCategoriesAddEditForm from './AddEditForm'
import { context } from '../../../../App'
	;

export default class AdminCategoryCard extends React.Component {
	constructor() {
		super();
		this.state = {
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
	handleDelete = (value) => (e) => {
		const confirmation = window.confirm('Are you sure ,you want delete this category');
		if (confirmation) {
			const Categories = value.Categories.slice();
			const id = this.props.id;
			const categoryIndex = Categories.findIndex(c => c.id === id);
			Categories[categoryIndex].deleted = true;
			value.setCategories(Categories);
		}
		else {
			return;
		}
	}


	render() {
		return (
			<context.Consumer>
				{
					value => (
						<>
							<tr className="no-gutters text-center">
								<td>{this.props.id}   </td>
								<td>{this.props.name}</td>
								<td>
									<i className="fas fa-edit edit" onClick={this.handleShow} ></i>
									<i className="fas fa-trash-alt" onClick={this.handleDelete(value)} ></i>
								</td>
							</tr>
							<AdminCategoriesAddEditForm show={this.state.showAddModal} onHide={this.handleClose} editmode {...this.props} />
						</>
					)
				}
			</context.Consumer>
		)
	}
}