import { Button, Modal } from "react-bootstrap";
import React from "react";
import { deleteById } from "../service/footballerService.js";

const DeleteFootballerModal = ({ closeModal, deleteFootballer, showModal }) => {

    const handleClose = () => {
        closeModal();
    };

    const handleDelete = () => {
        deleteById(deleteFootballer.id);
        closeModal();
    };

    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa cầu thủ <span className={'text-danger fw-bold'}>{deleteFootballer.name}</span> không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteFootballerModal;