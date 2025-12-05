import { addNewFootballer, findFootballerById, updateFootballer } from "../service/footballerService.js";
import { getAllPositions } from "../service/positionService.js";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import * as Yup from "yup";

const FootballerForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [footballer, setFootballer] = useState({
        code: "",
        name: "",
        dob: "",
        value: "",
        position: ""
    });

    const [positions, setPositions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const positionData = await getAllPositions();
            setPositions(positionData);

            if (id) {
                const data = await findFootballerById(id);
                if (data) {
                    setFootballer({
                        ...data,
                        position: JSON.stringify(data.position)
                    });
                }
            }
        }
        fetchData();
    }, [id]);

    const handleSubmit = async (values) => {
        const payload = {
            ...values,
            position: JSON.parse(values.position)
        };

        let isSuccess = false;
        if (id) {
            isSuccess = await updateFootballer(payload);
        } else {
            isSuccess = await addNewFootballer(payload);
        }

        if (isSuccess) {
            toast.success(id ? "Cập nhật thành công" : "Thêm mới thành công", {
                position: "top-right",
                theme: "dark",
                autoClose: 500
            });
            navigate("/footballers");
        } else {
            toast.error(id ? "Cập nhật thất bại" : "Thêm mới thất bại", {
                position: "top-right",
                theme: "dark",
                autoClose: 500
            });
        }
    }

    const validation = Yup.object({
        code: Yup.string().required("Mã không được để trống").matches(/^C[0-9]{3}$/, "Mã phải có dạng Cxxx"),
        name: Yup.string().required("Tên không được để trống"),
        dob: Yup.date().required("Vui lòng chọn ngày sinh"),
        value: Yup.number().required("Vui lòng nhập giá trị").min(1000, "Giá trị tối thiểu 1000"),
        position: Yup.string().required("Yêu cầu chọn vị trí")
    });

    return (
        <div className="container mt-4">
            <h2 className="text-center">{id ? "Cập nhật cầu thủ" : "Thêm cầu thủ mới"}</h2>
            <Formik
                enableReinitialize={true}
                initialValues={footballer}
                onSubmit={handleSubmit}
                validationSchema={validation}
            >
                <Form className="w-50 mx-auto border p-4 rounded shadow">
                    <div className="mb-3">
                        <label>Mã cầu thủ</label>
                        <Field type="text" name="code" className="form-control" />
                        <ErrorMessage className="text-danger" name="code" component="small" />
                    </div>

                    <div className="mb-3">
                        <label>Tên cầu thủ</label>
                        <Field type="text" name="name" className="form-control" />
                        <ErrorMessage className="text-danger" name="name" component="small" />
                    </div>

                    <div className="mb-3">
                        <label>Ngày sinh</label>
                        <Field type="date" name="dob" className="form-control" />
                        <ErrorMessage className="text-danger" name="dob" component="small" />
                    </div>

                    <div className="mb-3">
                        <label>Giá trị chuyển nhượng</label>
                        <Field type="number" name="value" className="form-control" />
                        <ErrorMessage className="text-danger" name="value" component="small" />
                    </div>

                    <div className="mb-3">
                        <label>Vị trí</label>
                        <Field as="select" name="position" className="form-control">
                            <option value="">--- Chọn vị trí ---</option>
                            {positions && positions.map((pos) => (
                                <option key={pos.id} value={JSON.stringify(pos)}>
                                    {pos.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage className="text-danger" name="position" component="small" />
                    </div>

                    <div className="text-center">
                        <Button className="btn-success btn-sm" type="submit">
                            {id ? "Cập nhật" : "Thêm mới"}
                        </Button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default FootballerForm;