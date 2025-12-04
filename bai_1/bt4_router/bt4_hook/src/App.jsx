import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import FootballerList from './pages/FootballerList';
import FootballerForm from './pages/FootballerForm';

function App() {
    return (
        <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/footballers" element={<FootballerList />} />
                    <Route path="/footballers/create" element={<FootballerForm />} />
                    <Route path="/footballers/edit/:id" element={<FootballerForm />} />
                </Routes>
            <Footer />
            <ToastContainer position="top-right" autoClose={3000} />
        </BrowserRouter>
    );
}

export default App;