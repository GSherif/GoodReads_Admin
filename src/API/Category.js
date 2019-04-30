import axios from 'axios';
export const server = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';


export const  GetAllCategories=()=> {
  return  axios.get(`${server}/api/categories/`).then(d=>{
    debugger
    return  d.data
  })
}

// export function GetCategoryById(id) {
//     let output = {};
//     axios.get(`${server}/api/categories/${id}/details`)
//         .then(data => {
//             output = data;
//         })
//         .catch(err => {
//             // this.props.history.push('/error');
//             console.log(err);
//         });
//     return output;
// }
// export function EditCategory(category) {
//     let output = {};
//     axios.patch(`${server}/api/categories/${category._id}/edit`, {
//         ...category
//     })
//         .then(data => {
//             output = data;
//         })
//         .catch(err => {
//             // this.props.history.push('/error');
//             console.log(err);
//         });
//     return output;
// }
// export function DeleteCategoryById(id) {
//     let output = {};

//     axios.patch(`${server}/api/categories/${id}/delete`)
//         .then(data => {
//             output = data;
//         })
//         .catch(err => {
//             // this.props.history.push('/error');
//             console.log(err);
//         });
//     return output;
// }
// export function AddCategory(category) {
//     let output = {};
//     axios.post(`${server}/api/categories/add`, {
//         ...category
//     })
//         .then(data => {
//             output = data;
//         })
//         .catch(err => {
//             // this.props.history.push('/error');
//             console.log(err);
//         });
//     return output;
// }
