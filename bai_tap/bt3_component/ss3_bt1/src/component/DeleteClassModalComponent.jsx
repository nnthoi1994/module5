import React, {Component} from "react";
import {Modal,Button} from "react-bootstrap";
import {deleteById, getAll} from "../service/customerService.js";


class DeleteClassModalComponent extends Component{
    constructor(props) {
        super(props);

    }
    handleClose =()=>{
        // chưa code
        this.props.closeModal();

    }
    handleDelete=()=>{

        deleteById(this.props.deleteCustomer.id);
        this.props.closeModal();
        // xoá
    }

    render() {
        console.log("-----delete run-------")
        return(
            <>
                <Modal show={this.props.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Bạn muốn xoá khách hàng {this.props.deleteCustomer.id}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleDelete}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
export default DeleteClassModalComponent ;