import { Link } from "react-router-dom";
import { useAccessibility } from "../../context/AccessibilityContext";

export default function Footer() {
    const { setIsPanelOpen } = useAccessibility();

    return (
        <footer className="bg-navy-900 text-white">

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

                    <div>
                        <Link to="/" className="inline-block">
                            <h2 className="text-lg font-bold hover:text-rti-400 transition">
                                RTI ONLINE
                            </h2>
                        </Link>

                        <p className="mt-3 max-w-sm text-sm leading-6 text-white/60">
                            Your right to information, made simpler.
                            File, track and manage RTI applications
                            with Central Government public authorities.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white">
                            Citizen Services
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm text-white/60">
                            <li>
                                <Link to="/file-rti" className="hover:text-white transition">
                                    File RTI Application
                                </Link>
                            </li>
                            <li>
                                <Link to="/track" className="hover:text-white transition">
                                    Track Application Status
                                </Link>
                            </li>
                            <li>
                                <Link to="/first-appeal" className="hover:text-white transition">
                                    File First Appeal
                                </Link>
                            </li>
                            <li>
                                <Link to="/payment-reconciliation" className="hover:text-white transition">
                                    Payment Reconciliation
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="hover:text-white transition">
                                    My RTI History
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white">
                            Knowledge Centre
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm text-white/60">
                            <li>
                                <Link to="/learn" className="hover:text-white transition">
                                    How RTI Works
                                </Link>
                            </li>
                            <li>
                                <Link to="/learn" className="hover:text-white transition">
                                    RTI Act 2005 Guidelines
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="hover:text-white transition">
                                    Frequently Asked Questions
                                </Link>
                            </li>
                            <li>
                                <Link to="/authorities" className="hover:text-white transition">
                                    Public Authorities Directory
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white">
                            Help &amp; Support
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm text-white/60">
                            <li>
                                <Link to="/help" className="hover:text-white transition">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/help" className="hover:text-white transition">
                                    Helpdesk &amp; Grievances
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => setIsPanelOpen(true)}
                                    className="text-left hover:text-white transition focus:outline-none focus:underline"
                                >
                                    Accessibility Options
                                </button>
                            </li>
                            <li>
                                <Link to="/help" className="hover:text-white transition">
                                    Terms &amp; Privacy Policies
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <div>
                        <p className="text-sm text-white/50">
                            © 2026 Government of India · All Rights Reserved
                        </p>

                        <p className="mt-1 text-xs text-white/40">
                            Department of Personnel &amp; Training ·
                            National Informatics Centre
                        </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-white/50">
                        <Link to="/" className="hover:text-white transition">Home</Link>
                        <span>·</span>
                        <Link to="/file-rti" className="hover:text-white transition">File RTI</Link>
                        <span>·</span>
                        <Link to="/track" className="hover:text-white transition">Track</Link>
                        <span>·</span>
                        <Link to="/authorities" className="hover:text-white transition">Authorities</Link>
                    </div>

                </div>

            </div>

        </footer>
    );
}