import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Home from './pages/Home/Home';
import Authentication from './pages/Authentication/Authentication';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateMember from './components/UpdateMember';
import Recruitment from './pages/Recruitment/Recruitment';
import AdminRoute from './routes/AdminRoute';
import CandidateListing from './components/CandidateListing';
import PaymentDetails from './components/PaymentDetails';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route element={<PublicRoute restricted={true} />}>
                    <Route path="/login" element={<Authentication />} />
                    <Route path="/register" element={<Authentication />} />
                </Route>

                <Route element={<PublicRoute restricted={false} />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/recruitment" element={<Recruitment />} />
                </Route>

                <Route element={<PrivateRoute />}>
                    <Route path="/update-member" element={<UpdateMember />} />
                </Route>

                <Route element={<AdminRoute />}>
                    <Route path="/admin/candidate-listing" element={<CandidateListing />} />
                </Route>
                <Route element={<AdminRoute />}>
                    <Route path="/admin/payment-details" element={<PaymentDetails />} />
                </Route>
            </Routes>
            <ToastContainer />
        </Router>
    );
};

export default App;
