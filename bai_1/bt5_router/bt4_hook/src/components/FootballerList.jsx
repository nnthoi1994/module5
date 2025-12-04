import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAll, deleteById, searchByName } from '../service/footballerService.js';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';

function FootballerList() {
    const [footballers, setFootballers] = useState([]);
    const [searchName, setSearchName] = useState("");


    const [showModal, setShowModal] = useState(false);
    const [selectedFootballer, setSelectedFootballer] = useState(null);

    useEffect(() => {
        setFootballers(getAll());
    }, []);

    const handleSearch = () => {
        const result = searchByName(searchName);
        setFootballers(result);
    };

    const handleShowDelete = (footballer) => {
        setSelectedFootballer(footballer);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        deleteById(selectedFootballer.id);
        setFootballers(getAll());
        setShowModal(false);
        toast.success(`Đã xóa cầu thủ ${selectedFootballer.name}`);
    };

    return (
        <div className="container mt-4">
            <h2>Danh sách cầu thủ</h2>

            <div className="d-flex justify-content-between my-3">
                <Link to="/footballers/create" className="btn btn-success">
                    + Thêm cầu thủ mới
                </Link>
                <div className="d-flex gap-2">
                    <input
                        className="form-control"
                        placeholder="Tìm kiếm tên..."
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleSearch}>Tìm</button>
                </div>
            </div>

            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Mã cầu thủ</th>
                    <th>Tên</th>
                    <th>Ngày sinh</th>
                    <th>Giá trị</th>
                    <th>Vị trí</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {footballers.map(f => (
                    <tr key={f.id}>
                        <td>{f.id}</td>
                        <td>{f.code}</td>
                        <td>{f.name}</td>
                        <td>{f.dob}</td>
                        <td>{f.value.toLocaleString()} $</td>
                        <td>{f.position}</td>

                        <td>

                            <Link to={`/footballers/edit/${f.id}`} className="btn btn-warning btn-sm me-2">
                                Sửa
                            </Link>
                            <button onClick={() => handleShowDelete(f)} className="btn btn-danger btn-sm">
                                Xóa
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>


            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton><Modal.Title>Xác nhận xóa</Modal.Title></Modal.Header>
                <Modal.Body>Bạn có chắc muốn xóa <b>{selectedFootballer?.name}</b>?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Hủy</Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>Xóa</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default FootballerList;