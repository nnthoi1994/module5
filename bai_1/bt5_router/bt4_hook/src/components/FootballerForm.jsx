import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addNew, findById, update } from '../service/footballerService.js';
import { toast } from 'react-toastify';
import {getAll} from "../service/footballerService.js";

function FootballerForm() {
    const { id } = useParams();
    const navigate = useNavigate();


    const [initialValues, setInitialValues] = useState({
        name: '',
        position: '',
        code: '',
        dob:'',
        value:''
    });


    useEffect(() => {
        if (id) {
            const footballer = findById(id);
            if (footballer) {
                setInitialValues(footballer);
            }
        }
    }, [id]);

    const minAge = (age) =>
        new Date(new Date().setFullYear(new Date().getFullYear() - age));

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Tên không được để trống")
            .min(3, "Tên phải dài hơn 3 ký tự")
            .matches(/^[a-zA-Z\s]*$/, "Tên không được chứa số hoặc ký tự đặc biệt"),
        position: Yup.string()
            .required("Vui lòng chọn vị trí"),
        code: Yup.string()
            .required("Mã không được để trống")
            .matches(/^CT[0-9]{4}$/,"Mã cầu thủ là CTXXXX, trong đó X là số 0-9")
        .test("check trùng", "Mã cầu thủ đã tồn tại", function (value){

            const list = getAll();
            const currentId = this.parent.id;
            return !list.some(f => f.code === value && f.id !== currentId);
        }),
        dob: Yup.date()
            .required("Ngày tháng năm sinh không để trống")
        .max(new Date(), "Ngày sinh không lớn hơn hiện tại")
            .max(minAge(16),"Tuổi phải trên 16")

    });

    const handleSubmit = (values) => {
        if (id) {
            update(values);
            toast.success("Cập nhật thành công!");
        } else {
            addNew(values);
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
                        <label className="form-label">Tên cầu thủ:</label>
                        <Field name="name" type="text" className="form-control" />
                        <ErrorMessage name="name" component="div" className="text-danger small" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mã cầu thủ:</label>
                        <Field name="code" type="text" className="form-control" />
                        <ErrorMessage name="code" component="div" className="text-danger small" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Ngày sinh cầu thủ:</label>
                        <Field name="dob" type="date" className="form-control" />
                        <ErrorMessage name="dob" component="div" className="text-danger small" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Value cầu thủ:</label>
                        <Field name="value" type="text" className="form-control" />
                        <ErrorMessage name="value" component="div" className="text-danger small" />
                    </div>

                    {/*<div className="mb-3">*/}
                    {/*    <label className="form-label">Vị trí:</label>*/}
                    {/*    <Field as="select" name="position" className="form-control">*/}
                    {/*        <option value="">-- Chọn vị trí --</option>*/}
                    {/*        <option value="Thủ môn">Thủ môn</option>*/}
                    {/*        <option value="Hậu vệ">Hậu vệ</option>*/}
                    {/*        <option value="Tiền vệ">Tiền vệ</option>*/}
                    {/*        <option value="Tiền đạo">Tiền đạo</option>*/}
                    {/*    </Field>*/}
                    {/*    <ErrorMessage name="position" component="div" className="text-danger small" />*/}
                    {/*</div>*/}


                    <div className="mb-3">
                        <label className="form-label">Vị trí:</label>
                        <div className="form-check">
                            <Field type="radio" className="form-check-input" name="position" value="Thủ môn" />
                            <label className="form-check-label">Thủ môn</label>
                        </div>
                        <div className="form-check">
                            <Field type="radio" className="form-check-input" name="position" value="Hậu vệ" />
                            <label className="form-check-label">Hậu vệ</label>
                        </div>
                        <div className="form-check">
                            <Field type="radio" className="form-check-input" name="position" value="Tiền vệ" />
                            <label className="form-check-label">Tiền vệ</label>
                        </div>
                        <div className="form-check">
                            <Field type="radio" className="form-check-input" name="position" value="Tiền đạo" />
                            <label className="form-check-label">Tiền đạo</label>
                        </div>

                        <ErrorMessage name="position" component="div" className="text-danger small" />
                    </div>








                    <div className="text-center">
                        <button type="submit" className="btn btn-primary me-2">
                            {id ? "Cập nhật" : "Thêm mới"}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={() => navigate('/footballers')}>
                            Quay lại
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default FootballerForm;