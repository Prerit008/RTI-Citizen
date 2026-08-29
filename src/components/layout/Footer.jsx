export default function Footer() {
    return (
        <footer className="bg-navy-900 text-white">

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

                    <div>
                        <h2 className="text-lg font-bold">
                            RTI ONLINE
                        </h2>

                        <p className="mt-3 max-w-sm text-sm leading-6 text-white/60">
                            Your right to information, made simpler.
                            File, track and manage RTI applications
                            with Central Government public authorities.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold">
                            Citizen
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm text-white/60">
                            <li>File RTI</li>
                            <li>Track Application</li>
                            <li>First Appeal</li>
                            <li>RTI History</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold">
                            Learn
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm text-white/60">
                            <li>How RTI Works</li>
                            <li>RTI Act</li>
                            <li>FAQs</li>
                            <li>User Guide</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold">
                            Help
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm text-white/60">
                            <li>Contact</li>
                            <li>Helpdesk</li>
                            <li>Accessibility</li>
                            <li>Policies</li>
                        </ul>
                    </div>

                </div>

                <div className="mt-12 border-t border-white/10 pt-6">

                    <p className="text-sm text-white/50">
                        © 2026 Government of India
                    </p>

                    <p className="mt-2 text-xs text-white/40">
                        Department of Personnel & Training ·
                        National Informatics Centre
                    </p>

                </div>

            </div>

        </footer>
    );
}