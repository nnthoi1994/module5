import { useEffect, useRef, useState } from "react";
import { addNew, getAll, searchByName } from "../service/footballerService.js";
import DeleteFootballerModal from "./DeleteFootballerModal.jsx";

const FootballerList = () => {

    const [footballerList, setFootballerList] = useState([]);
    const [deleteFootballer, setDeleteFootballer] = useState({ id: 0, name: "" });
    const [showModal, setShowModal] = useState(false);
    const [reloading, setReloading] = useState(false);


    const idRef = useRef();
    const codeRef = useRef();
    const nameRef = useRef();
    const dobRef = useRef();
    const valueRef = useRef();
    const positionRef = useRef();


    const searchRef = useRef();


    useEffect(() => {
        setFootballerList(getAll());
    }, [reloading]);


    const handleShowModal = (footballer) => {
        setDeleteFootballer(footballer);
        setShowModal(true);
    };


    const closeModal = () => {
        setReloading(pre => !pre);
        setShowModal(false);
    };


    const handleAdd = () => {
        const newFootballer = {
            id: parseInt(idRef.current.value),
            code: codeRef.current.value,
            name: nameRef.current.value,
            dob: dobRef.current.value,
            value: parseFloat(valueRef.current.value),
            position: positionRef.current.value
        };

        if(!newFootballer.id || !newFootballer.name) {
            alert("Vui lòng nhập đủ thông tin ID và Tên!");
            return;
        }

        addNew(newFootballer);


        idRef.current.value = "";
        codeRef.current.value = "";
        nameRef.current.value = "";
        dobRef.current.value = "";
        valueRef.current.value = "";
        positionRef.current.value = "";

        setReloading(pre => !pre);
    };


    const handleSearch = () => {
        const keyword = searchRef.current.value;
        const result = searchByName(keyword);
        setFootballerList(result);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center text-primary mb-4">Quản Lý Cầu Thủ Bóng Đá</h2>



                <h4>Thêm Cầu Thủ Mới</h4>
                <div className="row g-3">
                    <div className="col-md-2">
                        <input ref={idRef} className="form-control" placeholder="ID" type="number"/>
                    </div>
                    <div className="col-md-2">
                        <input ref={codeRef} className="form-control" placeholder="Mã cầu thủ" />
                    </div>
                    <div className="col-md-3">
                        <input ref={nameRef} className="form-control" placeholder="Tên cầu thủ" />
                    </div>
                    <div className="col-md-2">
                        <input ref={dobRef} className="form-control" type="date" placeholder="Ngày sinh" />
                    </div>
                    <div className="col-md-2">
                        <input ref={valueRef} className="form-control" type="number" placeholder="Giá trị CN" />
                    </div>
                    <div className="col-md-2">
                        <input ref={positionRef} className="form-control" placeholder="Vị trí" />
                    </div>
                    <div className="col-md-12 text-end">
                        <button onClick={handleAdd} className="btn btn-success">Thêm Mới</button>
                    </div>
                </div>



            <div className="row mb-3">
                <div className="col-md-6">
                    <div className="input-group">
                        <input ref={searchRef} type="text" className="form-control" placeholder="Tìm kiếm theo tên..." />
                        <button onClick={handleSearch} className="btn btn-primary" type="button">Tìm kiếm</button>
                    </div>
                </div>
            </div>


            <table className="table table-striped table-hover table-bordered">
                <thead className="table-dark">
                <tr>
                    <th>STT</th>
                    <th>Code CT</th>
                    <th>Name</th>
                    <th>Happy birthday</th>
                    <th>Giá Trị</th>
                    <th>Vị trí</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {footballerList && footballerList.length > 0 ? (
                    footballerList.map((footballer, index) => (
                        <tr key={footballer.id}>
                            <td>{index + 1}</td>
                            <td>{footballer.code}</td>
                            <td>{footballer.name}</td>
                            <td>{footballer.dob}</td>
                            <td>{footballer.value.toLocaleString()} $</td>
                            <td>{footballer.position}</td>
                            <td>
                                <button
                                    onClick={() => handleShowModal(footballer)}
                                    className="btn btn-sm btn-danger"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" className="text-center">Không tìm thấy dữ liệu</td>
                    </tr>
                )}
                </tbody>
            </table>


            {showModal && (
                <DeleteFootballerModal
                    deleteFootballer={deleteFootballer}
                    showModal={showModal}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

export default FootballerList;