import {Component} from "react";
import {getAll} from "../service/customerService.js";
import DeleteClassModalComponent from "./DeleteClassModalComponent.jsx";



class ListClassComponent extends Component{

    constructor(props) {
        super(props);
        this.state = {
            customerList: [],
            showModal : false,
            deleteCustomer :{
                id:"",
                name:""
            }
        }
    }

    componentDidMount() {
        console.log("-------did mount----run----------")
        this.setState({
            customerList:[...getAll()]
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.showModal!==this.state.showModal){
            this.setState({
                customerList:[...getAll()]
            })
        }
    }

    handleShowModal = (customer)=>{
        this.setState({
            showModal: true,
            deleteCustomer: {
                ...customer
            }
        })
    }
    closeModal =()=>{
        this.setState({
            showModal: false,
        })
    }

    render() {
        console.log("-------list render --------------")
        return (
            <>
                <h1 style={{color:"yellow"}}>Danh sách khách hàng</h1>
                <table className="table table-dark">
                    <thead>
                    <tr>
                        <td>STT</td>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Adress</td>
                        <td>TypeCustomer</td>
                        <td>Delete</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.customerList.map((customer, i) => (
                            <tr key={customer.id}>
                                <td>{i + 1}</td>
                                <td>{customer.id}</td>
                                <td>{customer.name}</td>
                                <td>{customer.address}</td>
                                <td>{customer.typeCustomer}</td>
                                <td>
                                    <button onClick={()=>{
                                        this.handleShowModal(customer)
                                    }} className={'btn btn-sm btn-danger'}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                <DeleteClassModalComponent deleteCustomer = {this.state.deleteCustomer}
                                           showModal = {this.state.showModal}
                                           closeModal = {this.closeModal}
                />
            </>
        );
    }
}
export default ListClassComponent ;