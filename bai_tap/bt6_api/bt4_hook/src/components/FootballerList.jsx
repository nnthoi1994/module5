import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllFootballers, searchFootballerByName } from "../service/footballerService.js";
import DeleteFootballerModal from "./DeleteFootballerModal";

const FootballerList = () => {
    const [footballers, setFootballers] = useState([]);
    const [searchName, setSearchName] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [selectedFootballer, setSelectedFootballer] = useState(null);
    const [isReload, setIsReload] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllFootballers();
            setFootballers(data);
        }
        fetchData();
    }, [isReload]);

    const handleSearch = async () => {
        const data = await searchFootballerByName(searchName);
        setFootballers(data);
    }

    const handleShowDelete = (item) => {
        setSelectedFootballer(item);
        setShowModal(true);
    }

    const handleCloseModal = (shouldReload = false) => {
        setShowModal(false);
        if (shouldReload) {
            setIsReload(prev => !prev);
        }
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center text-primary">Danh Sách Cầu Thủ</h2>

            <div className="d-flex justify-content-between my-3">
                <Link to="/footballers/create" className="btn btn-success">Thêm mới</Link>
                <div className="input-group w-25">
                    <input
                        className="form-control"
                        placeholder="Tìm tên..."
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                    <button className="btn btn-outline-primary" onClick={handleSearch}>Tìm</button>
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
                    <th>Chức năng</th>
                </tr>
                </thead>
                <tbody>
                {footballers.map((item, index) => (
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.code}</td>
                        <td>{item.name}</td>
                        <td>{item.dob}</td>
                        <td>{parseInt(item.value).toLocaleString()} VND</td>
                        <td>{item.position.name}</td>
                        <td>
                            <Link to={`/footballers/edit/${item.id}`} className="btn btn-warning btn-sm me-2">Sửa</Link>
                            <button onClick={() => handleShowDelete(item)} className="btn btn-danger btn-sm">Xóa</button>
                        </td>
                    </tr>
                ))}
                {footballers.length === 0 && (
                    <tr><td colSpan="7" className="text-center">Không có dữ liệu</td></tr>
                )}
                </tbody>
            </table>

            <DeleteFootballerModal
                showModal={showModal}
                deleteFootballer={selectedFootballer}
                closeModal={handleCloseModal}
            />
        </div>
    );
}

export default FootballerList;