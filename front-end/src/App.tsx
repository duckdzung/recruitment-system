import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PublicRoute from './routes/PublicRoute';
import ProtectedRoute from './routes/ProtectedRoute';

import Home from './pages/Home/Home';
import ContactUs from './pages/ContactUs/ContactUs';
import Legal from './pages/Legal/Legal';
import Authentication from './pages/Authentication/Authentication';
import Recruitment from './pages/Recruitment/Recruitment';
import UpdateMember from './pages/UpdateMember/UpdateMenber';

import { Role } from './types';
import AdminPage from './components/admin/AdminPage';
import CandidateListing from './components/admin/CandidateListing';
import PaymentDetails from './components/admin/PaymentDetails';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route element={<PublicRoute restricted={true} />}>
                    <Route path="/login" element={<Authentication />} />
                    <Route path="/register" element={<Authentication />} />
                </Route>

                <Route element={<PublicRoute restricted={false} />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/legal" element={<Legal />} />
                </Route>

                {/* Protected routes */}
                <Route element={<ProtectedRoute allowRoutes={[Role.MEMBER]} />}>
                    <Route path="/update-member" element={<UpdateMember />} />
                </Route>

                <Route element={<ProtectedRoute allowRoutes={[Role.ENTERPRISE]} />}>
                    <Route path="/recruitment" element={<Recruitment />} />
                </Route>

                <Route element={<ProtectedRoute allowRoutes={[Role.STAFF, Role.PRESIDENT]} />}>
                    <Route path="/admin" element={<AdminPage />}>
                        <Route path="candidate-listing" element={<CandidateListing />} />
                        <Route path="payment-details" element={<PaymentDetails />} />
                    </Route>
                </Route>
            </Routes>
            <ToastContainer position="top-center" />
        </Router>
    );
};

export default App;
