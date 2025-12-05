import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
// Import các hàm service đã viết ở trên
import { addNewFootballer, findFootballerById, updateFootballer, getAllPositions } from '../service/footballerService';

function FootballerForm() {

    const { id } = useParams();
    const navigate = useNavigate();


    const [positions, setPositions] = useState([]);


    const [initialValues, setInitialValues] = useState({
        code: '',
        name: '',
        dob: '',
        value: '',
        position: ''
    });


    useEffect(() => {

        const fetchPositions = async () => {
            const data = await getAllPositions();
            setPositions(data);
        };
        fetchPositions();
    }, []);


    useEffect(() => {
        if (id) {
            const fetchDetail = async () => {

                const data = await findFootballerById(id);
                if (data) {

                    setInitialValues(data);
                }
            };
            fetchDetail();
        }
    }, [id]);


    const validationSchema = Yup.object({
        code: Yup.string().required("Mã không được để trống"),
        name: Yup.string().required("Tên không được để trống"),
        value: Yup.number().required("Giá trị phải là số").min(1000, "Giá trị quá thấp"),

        position: Yup.string().required("Vui lòng chọn vị trí")
    });


    const handleSubmit = async (values) => {

        const payload = {
            ...values,
            position: parseInt(values.position), // Chuyển "1" -> 1 để khớp dữ liệu db.json
            value: parseInt(values.value)
        };

        if (id) {

            await updateFootballer(payload);
            toast.success("Cập nhật thành công!");
        } else {

            await addNewFootballer(payload);
            toast.success("Thêm mới thành công!");
        }

        navigate('/footballers');
    };

    return (
        <div className="container mt-4">
            <h2>{id ? "Cập nhật cầu thủ" : "Thêm cầu thủ mới"}</h2>

            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="w-50 mx-auto border p-4 rounded shadow">
                    <div className="mb-3">
                        <label>Mã cầu thủ:</label>
                        <Field name="code" className="form-control" />
                        <ErrorMessage name="code" component="div" className="text-danger small" />
                    </div>

                    <div className="mb-3">
                        <label>Tên cầu thủ:</label>
                        <Field name="name" className="form-control" />
                        <ErrorMessage name="name" component="div" className="text-danger small" />
                    </div>

                    <div className="mb-3">
                        <label>Ngày sinh:</label>
                        <Field name="dob" type="date" className="form-control" />
                    </div>

                    <div className="mb-3">
                        <label>Giá trị chuyển nhượng:</label>
                        <Field name="value" type="number" className="form-control" />
                        <ErrorMessage name="value" component="div" className="text-danger small" />
                    </div>

                    <div className="mb-3">
                        <label>Vị trí:</label>
                        {/* as="select" biến Field thành thẻ <select> */}
                        <Field as="select" name="position" className="form-control">
                            <option value="">-- Chọn vị trí --</option>
                            {/* Map qua mảng positions lấy từ API để tạo option */}
                            {positions.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="position" component="div" className="text-danger small" />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        {id ? "Cập nhật" : "Thêm mới"}
                    </button>
                </Form>
            </Formik>
        </div>
    );
}

export default FootballerForm;