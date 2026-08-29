import { BrowserRouter } from "react-router-dom";

import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import AppRoutes from "./routes/AppRoutes";

import { RTIApplicationProvider } from "./context/RTIApplicationContext";

function App() {
  return (
    <BrowserRouter>
      <RTIApplicationProvider>

        <div className="min-h-screen bg-slate-50">

          <Header />

          <Navbar />

          <main>
            <AppRoutes />
          </main>

          <Footer />

        </div>

      </RTIApplicationProvider>
    </BrowserRouter>
  );
}

export default App;