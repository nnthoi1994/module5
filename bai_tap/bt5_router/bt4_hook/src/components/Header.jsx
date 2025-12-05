import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
            <span className="navbar-brand">Football Manager</span>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/footballers" className="nav-link">Danh sách cầu thủ</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
export default Header;