import { BrowserRouter } from "react-router-dom";

import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AccessibilityModal from "./components/common/AccessibilityModal";

import AppRoutes from "./routes/AppRoutes";

import { RTIApplicationProvider } from "./context/RTIApplicationContext";
import { AuthProvider } from "./context/AuthContext";
import { AccessibilityProvider } from "./context/AccessibilityContext";
import { SearchProvider } from "./context/SearchContext";
import { LanguageProvider } from "./context/LanguageContext";
import LanguageSelectorModal from "./components/common/LanguageSelectorModal";

function App() {
  return (
    <BrowserRouter>
      <AccessibilityProvider>
        <LanguageProvider>
          <AuthProvider>
            <RTIApplicationProvider>
              <SearchProvider>

                <div className="min-h-screen bg-slate-50">

                  <Header />

                  <Navbar />

                  <main id="main-content">
                    <AppRoutes />
                  </main>

                  <Footer />

                  <AccessibilityModal />

                  <LanguageSelectorModal />

                </div>

              </SearchProvider>
            </RTIApplicationProvider>
          </AuthProvider>
        </LanguageProvider>
      </AccessibilityProvider>
    </BrowserRouter>
  );
}

export default App;