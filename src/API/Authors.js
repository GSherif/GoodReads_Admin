import axios from 'axios';
const BackendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

////Get authors List
export const getauthorsList = () => {
	return axios.get(`${BackendUrl}/api/authors`, {
		// headers: {
		// 	authorization: `Bearer ${this.localStorage.getItem('token')}`
		// }
	})
		.then(res =>
			res.data
		)
		.catch(err => err)
}

///////Add author
export const addauthor = (newauthor) => {
	return axios.post(`${BackendUrl}/api/authors/add`, {
		// headers: {
		// 	authorization: `Bearer ${this.localStorage.getItem('token')}`
		// }, 
		newauthor,
	})
		.then(res =>
			res.data
		)
		.catch(err => err)
}

//Edit author
export const editauthor = (newauthor) => {
	return axios.patch(`${BackendUrl}/api/authors/${newauthor._id}/edit`, {
		// headers: {
		// 	authorization: `Bearer ${this.localStorage.getItem('token')}`
		// }, 
		newauthor
	})
		.then(res =>
			res.data
		)
		.catch(err => err)
}
//delete author
export const deleteauthor = (id) => {
	return axios.patch(`${BackendUrl}/api/authors/${id}/delete`, {
		// headers: {
		// 	authorization: `Bearer ${this.localStorage.getItem('token')}`
		// }, id
	})
		.then(res =>
			res.data
		)
		.catch(err => err)
}

