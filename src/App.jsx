import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import JournalPage from '@/components/pages/JournalPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-body">
        <Routes>
          <Route path="/" element={<JournalPage />} />
          <Route path="/entry/:date" element={<JournalPage />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;