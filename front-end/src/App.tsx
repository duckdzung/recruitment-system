import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/index.less';

import PublicRoute from './routes/PublicRoute';
import ProtectedRoute from './routes/ProtectedRoute';

import Home from './pages/Home/Home';
import ContactUs from './pages/ContactUs/ContactUs';
import Legal from './pages/Legal/Legal';
import Services from './pages/Services/Services';
import Authentication from './pages/Authentication/Authentication';
import Recruitment from './pages/Recruitment/Recruitment';
import UpdateMember from './pages/UpdateMember/UpdateMenber';

import { Role } from './types';
import AdminPage from './components/Admin/AdminPage';
import CandidateListing from './components/Admin/CandidateListing';
import PaymentDetails from './components/Admin/PaymentDetails';
import PrivacyPolicy from './components/Legals/PrivacyPolicy';
import TermsAndConditions from './components/Legals/TermsAndConditions';
import RefundPolicy from './components/Legals/RefundPolicy';
import CompensationConsulting from './components/Legals/CompensationConsulting';
import LeadershipTraining from './components/Legals/LeadershipTraining';
import TalentAcquisition from './components/Legals/TalentAcquisition';
import OrganizationalStructures from './pages/OrganizationalStructures/OrganizationalStructures';
import EnterpiseListing from './components/Admin/EnterpriseListing';
import JobAdvertisement from './components/Admin/JobAdvertisement';
import CurriculumVitae from './components/Admin/CurriculumVitae';

import FindWork from './pages/FindWork/FindWork';
import WorkDetails from './pages/WorkDetails/WorkDetails';

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
                    <Route path="/job-list" element={<FindWork />} />
                    <Route path="/job-details/:jobId" element={<WorkDetails />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/how-we-work" element={<OrganizationalStructures />} />
                    <Route path="/legal" element={<Legal />}>
                        <Route path="privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
                        <Route path="refund-policy" element={<RefundPolicy />} />
                    </Route>
                    <Route path="/services" element={<Services />}>
                        <Route path="compensation-consulting" element={<CompensationConsulting />} />
                        <Route path="leadership-training" element={<LeadershipTraining />} />
                        <Route path="talent-acquisition" element={<TalentAcquisition />} />
                    </Route>
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
                        <Route path="enterpise-listing" element={<EnterpiseListing />} />
                        <Route path="candidate-listing" element={<CandidateListing />} />
                        <Route path="payment-details" element={<PaymentDetails />} />
                        <Route path="job-advertisements" element={<JobAdvertisement />} />
                        <Route path="curriculum-vitae" element={<CurriculumVitae />} />
                    </Route>
                </Route>
            </Routes>
            <ToastContainer position="top-center" limit={1} />
        </Router>
    );
};

export default App;
