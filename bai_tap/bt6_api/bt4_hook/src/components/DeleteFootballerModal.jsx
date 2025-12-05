import { Button, Modal } from "react-bootstrap";
import React from "react";
import { deleteFootballerById } from "../service/footballerService.js";
import { toast } from "react-toastify";

const DeleteFootballerModal = ({ closeModal, deleteFootballer, showModal }) => {

    const handleClose = () => {
        closeModal(false);
    }

    const handleDelete = () => {
        const fetchData = async () => {
            const isSuccess = await deleteFootballerById(deleteFootballer.id);
            if (isSuccess) {
                toast.success("Xoá thành công", {
                    position: "top-right",
                    theme: "dark",
                    autoClose: 500
                });
                closeModal(true);
            } else {
                toast.error("Xoá thất bại", {
                    position: "top-right",
                    theme: "dark",
                    autoClose: 500
                });
                closeModal(false);
            }
        }
        fetchData();
    }

    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn muốn xoá cầu thủ <span className={'text-danger fw-bold'}>{deleteFootballer?.name}</span>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteFootballerModal;