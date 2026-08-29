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

export default function AppRoutes() {
    return (
        <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Citizen filing wizard */}
            <Route path="/file-rti" element={<FileRTI />} />
            <Route path="/file-rti/applicant" element={<RTIApplicant />} />
            <Route path="/file-rti/request" element={<RTIRequest />} />
            <Route path="/file-rti/review" element={<RTIReview />} />
            <Route path="/file-rti/payment" element={<RTIPayment />} />
            <Route path="/file-rti/success" element={<RTISuccess />} />

            {/* Citizen services */}
            <Route path="/track" element={<TrackApplication />} />
            <Route path="/first-appeal" element={<FirstAppeal />} />
            <Route path="/dashboard" element={<Dashboard />} />
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