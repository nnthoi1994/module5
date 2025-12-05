import React from 'react';
function Bai1(){
    const listCity = React.createElement(
        'ul',
        {className:'list-group'},
        React.createElement('li',{className: 'list-group-item'}, 'Hà Nội'),
        React.createElement('li',{className: 'list-group-item'}, 'Đà Nẵng'),
        React.createElement('li',{className: 'list-group-item'}, 'Hải Phòng'),
        React.createElement('li',{className: 'list-group-item'}, 'Hồ Chí Minh'),
        React.createElement('li',{className: 'list-group-item'}, 'Cần Thơ')
    );
    return (
        <div>
            <h3>
                Bài 1: Danh sách thành phố
            </h3>
            {listCity}
        </div>
    );
}

function Bai2(){
    const customers =[
        {id:1, ma: "C1", ten: "Nguyen Van A", diaChi: "322NDT", loaiKH: "Vip" },
        {id:1, ma: "C3", ten: "Nguyen Van Q", diaChi: "2NDT", loaiKH: "SVIP" },
        {id:1, ma: "C5", ten: "Nguyen Van C", diaChi: "652NDT", loaiKH: "VVip" },
        {id:1, ma: "C8", ten: "Nguyen Van N", diaChi: "22NDT", loaiKH: "Vip" },
        {id:1, ma: "C9", ten: "Nguyen Van M", diaChi: "232NDT", loaiKH: "Normal" }
    ]
    return (
        <div>
            <h3>Bài 2: Danh sách khách hàng</h3>
            <table className= "table table-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Mã KH</th>
                    <th>Tên KH</th>
                    <th>Địa chỉ</th>
                    <th>Loại khách hàng</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer)=>(
                    <tr key={customer.loaiKH}>
                        <td>{customer.id}</td>
                        <td>{customer.ma}</td>
                        <td>{customer.ten}</td>
                        <td>{customer.diaChi}</td>
                        <td>{customer.loaiKH}</td>
                    </tr>
                ))
                }
                </tbody>
            </table>
        </div>
    )
}

function Bai3(){
    return(
        <div>
            <h3>Đăng nhập</h3>
            <form>
                <div className='mb-3'>
                    <label htmlFor="emailInput" className='form-label'>Dia chi mail</label>
                    <input type="email" className='form-control' id='emailInput' placeholder="Nhap email tai day"/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="passInput" className='form-label'>Mật khẩu</label>
                    <input type="password" className='form-control' id='emailInput' placeholder="Nhap email tai day"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="checkRemember" />
                    <label className="form-check-label" htmlFor="checkRemember">Nhớ pass</label>
                </div>
                <button type="submit" className="btn btn-primary">Sign in</button>
            </form>
        </div>
    )
}

function App(){
    return (
        <div className='container mt-5'>
<h1>Bài tập react</h1>
            <Bai1/>
            <hr/>
            <Bai2/>
            <hr/>
            <Bai3/>

        </div>
    );

}

export default App;