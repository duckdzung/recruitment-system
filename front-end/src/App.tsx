import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route element={<PublicRoute restricted={true} />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route element={<PublicRoute restricted={false} />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
            <ToastContainer />
        </Router>
    );
};

export default App;
