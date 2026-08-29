import { BrowserRouter } from "react-router-dom";

import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AccessibilityModal from "./components/common/AccessibilityModal";

import AppRoutes from "./routes/AppRoutes";

import { RTIApplicationProvider } from "./context/RTIApplicationContext";
import { AuthProvider } from "./context/AuthContext";
import { AccessibilityProvider } from "./context/AccessibilityContext";

function App() {
  return (
    <BrowserRouter>
      <AccessibilityProvider>
        <AuthProvider>
          <RTIApplicationProvider>

            <div className="min-h-screen bg-slate-50">

              <Header />

              <Navbar />

              <main id="main-content">
                <AppRoutes />
              </main>

              <Footer />

              <AccessibilityModal />

            </div>

          </RTIApplicationProvider>
        </AuthProvider>
      </AccessibilityProvider>
    </BrowserRouter>
  );
}

export default App;