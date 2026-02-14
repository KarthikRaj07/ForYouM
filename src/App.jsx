import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Landing from './pages/Landing';
import Main from './pages/Main';
import Gallery from './pages/Gallery';
import Navbar from './components/Navbar';

function App() {
  const location = useLocation();

  return (
    <div className="font-poppins text-slate-900 overflow-x-hidden min-h-screen">
      {location.pathname !== '/' && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Landing />
              </PageWrapper>
            }
          />
          <Route
            path="/main"
            element={
              <PageWrapper>
                <Main />
              </PageWrapper>
            }
          />
          <Route
            path="/gallery"
            element={
              <PageWrapper>
                <Gallery />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

// Wrapper for smooth fade animations between pages
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

export default App;
