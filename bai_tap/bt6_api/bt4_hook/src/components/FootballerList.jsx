import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';

import { getAllFootballers, deleteFootballerById, searchFootballerByName, getAllPositions } from '../service/footballerService';

function FootballerList() {
    const [footballers, setFootballers] = useState([]);
    const [positions, setPositions] = useState([]);
    const [searchName, setSearchName] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [selectedFootballer, setSelectedFootballer] = useState(null);


    useEffect(() => {

        const loadData = async () => {

            const [listData, positionData] = await Promise.all([
                getAllFootballers(),
                getAllPositions()
            ]);

            setFootballers(listData);
            setPositions(positionData);
        };
        loadData();
    }, []);


    const getPositionName = (id) => {
        const pos = positions.find(p => p.id === parseInt(id));
        const player = footballers.find(pp => pp.id === parseInt(id));
        console.log("day la id vi tri: "+ id);
        return player ? pos.name : "Không xác định";
    };

    const handleSearch = async () => {

        const result = await searchFootballerByName(searchName);
        setFootballers(result);
    };


    const handleShowDelete = (footballer) => {
        setSelectedFootballer(footballer);
        setShowModal(true);
    };


    const handleConfirmDelete = async () => {
        if (selectedFootballer) {

            await deleteFootballerById(selectedFootballer.id);
            toast.success(`Đã xóa ${selectedFootballer.name}`);


            const newList = await getAllFootballers();
            setFootballers(newList);


            setShowModal(false);
        }
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
                    <th>STT</th>
                    <th>Mã</th>
                    <th>Tên</th>
                    <th>Ngày sinh</th>
                    <th>Giá trị</th>
                    <th>Vị trí</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {footballers.map((f, index) => (
                    <tr key={f.id}>
                        <td>{index + 1}</td>
                        <td>{f.code}</td>
                        <td>{f.name}</td>
                        <td>{f.dob}</td>

                        <td>{parseInt(f.value).toLocaleString()} VND</td>


                        <td>{getPositionName(f.position)}</td>

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
                <Modal.Body>
                    Bạn có chắc muốn xóa cầu thủ <b>{selectedFootballer?.name}</b> không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Hủy</Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>Xóa</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default FootballerList;