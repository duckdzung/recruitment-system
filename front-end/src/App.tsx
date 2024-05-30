import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route element={<PublicRoute restricted={true} />}>
                    <Route path="/login" element={<Login />} />
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
