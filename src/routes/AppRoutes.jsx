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
            <Route
                path="*"
                element={<NotFound />}
            />
            <Route
                path="/dashboard"
                element={<Dashboard />}
            />
            {/* Citizen services */}
            <Route path="/file-rti" element={<FileRTI />} />
            <Route
                path="/file-rti/applicant"
                element={<RTIApplicant />}
            />

            <Route
                path="/file-rti/request"
                element={<RTIRequest />}
            />
            <Route
                path="/file-rti/review"
                element={<RTIReview />}
            />

            <Route
                path="/file-rti/payment"
                element={<RTIPayment />}
            />

            <Route
                path="/file-rti/success"
                element={<RTISuccess />}
            />
            <Route
                path="/authorities"
                element={<Authorities />}
            />

            <Route
                path="/authorities/:id"
                element={<AuthorityDetails />}
            />

            <Route
                path="/track"
                element={<TrackApplication />}
            />

            <Route
                path="/first-appeal"
                element={<FirstAppeal />}
            />

            {/* Public authorities */}
            <Route
                path="/authorities"
                element={<Authorities />}
            />

            <Route
                path="/authorities/:id"
                element={<AuthorityDetails />}
            />

            {/* Knowledge */}
            <Route
                path="/learn"
                element={<Learn />}
            />

            <Route
                path="/faq"
                element={<FAQ />}
            />

            <Route
                path="/help"
                element={<Help />}
            />

            {/* Account */}
            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />

            {/* 404 */}
            <Route
                path="*"
                element={
                    <div className="mx-auto max-w-7xl px-4 py-20 text-center">
                        <h1 className="text-4xl font-bold text-navy-900">
                            404
                        </h1>

                        <p className="mt-3 text-slate-500">
                            Page not found.
                        </p>
                    </div>
                }
            />

        </Routes>
    );
}