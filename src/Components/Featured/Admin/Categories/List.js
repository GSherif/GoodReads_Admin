import React,{Component} from 'react'
import Table from 'react-bootstrap/Table'
import { Container, Row, Col, Button } from 'react-bootstrap';

import {GetAllCategories} from '../../../../API/Category';

import AdminCategoryCard from './Card';


export default class AdminCategoriesList extends Component {
	state = {
		categories: [],
	  };
	  
	  componentDidMount() {
		  
		GetAllCategories().then(c => {
		
			this.setState({categories:c.categories},()=>{
				console.log(this.state.categories)
			});
			
		}).catch(err=>console.log(err))
	  }

	render() {
		return (
			
			 <Container>
			 
				<Row >
					<Col sm={11}>
					</Col>
					<Col sm={1}>
						<Button className="bg-darkgrey border-0"><i className="fas fa-plus-circle text-white"></i></Button>
					</Col>
				</Row>
			
				<Table bordered hover responsive >
					<thead>
						<tr className=" text-center text-white bg-darkgrey" >
							<th>ID</th>
							<th>Name </th>
							<th>Action </th>
						</tr>
					</thead>
					{this.state.categories.length &&
						<tbody>
						
							{this.state.categories.map(c => 
								
								<AdminCategoryCard key={c.Id}  {...c} />)}
						</tbody>
					}
				</Table>
			</Container>
		)
				}
}