import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Professionals from './pages/Professionals';
import About from './pages/About';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import NotFound from './pages/notfound';
import Layout from './components/chat/layout/Layout'; // chat layout
import MainLayout from './mainlayout';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div key={location.pathname} className="animate-fadeIn">
      {children}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes that include Navbar and Footer */}
        <Route
          path="*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
                <Route path="/professionals" element={<PageWrapper><Professionals /></PageWrapper>} />
                <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
                <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
                <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
                <Route path="/notfound" element={<PageWrapper><NotFound /></PageWrapper>} />
              </Routes>
            </MainLayout>
          }
        />

        <Route path="/chat" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;
