import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import FileRTI from "../pages/FileRTI";
import TrackApplication from "../pages/TrackApplication";
import FirstAppeal from "../pages/FirstAppeal";
import Authorities from "../pages/Authorities";
import AuthorityDetails from "../pages/AuthorityDetails";
import Learn from "../pages/Learn";
import FAQ from "../pages/FAQ";
import Help from "../pages/Help";
import PaymentReconciliation from "../pages/PaymentReconciliation";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import RTIApplicant from "../pages/RTIApplicant";
import RTIRequest from "../pages/RTIRequest";
import RTIReview from "../pages/RTIReview";
import RTIPayment from "../pages/RTIPayment";
import RTISuccess from "../pages/RTISuccess";
import NotFound from "../pages/NotFound";

import Profile from "../pages/Profile";
import ProtectedRoute from "../components/common/ProtectedRoute";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Citizen filing wizard (Protected for Logged-In Citizens) */}
            <Route path="/file-rti" element={<ProtectedRoute><FileRTI /></ProtectedRoute>} />
            <Route path="/file-rti/applicant" element={<ProtectedRoute><RTIApplicant /></ProtectedRoute>} />
            <Route path="/file-rti/request" element={<ProtectedRoute><RTIRequest /></ProtectedRoute>} />
            <Route path="/file-rti/review" element={<ProtectedRoute><RTIReview /></ProtectedRoute>} />
            <Route path="/file-rti/payment" element={<ProtectedRoute><RTIPayment /></ProtectedRoute>} />
            <Route path="/file-rti/success" element={<ProtectedRoute><RTISuccess /></ProtectedRoute>} />

            {/* Citizen services */}
            <Route path="/track" element={<TrackApplication />} />
            <Route path="/first-appeal" element={<FirstAppeal />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/payment-reconciliation" element={<PaymentReconciliation />} />

            {/* Public authorities */}
            <Route path="/authorities" element={<Authorities />} />
            <Route path="/authorities/:id" element={<AuthorityDetails />} />

            {/* Knowledge & Help */}
            <Route path="/learn" element={<Learn />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/help" element={<Help />} />

            {/* Account / Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 404 Catch-All */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}