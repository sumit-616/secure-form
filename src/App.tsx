import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FormContainer from './components/form/FormContainer';
import FormSummary from './components/form/FormSummary';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormContainer />} />
        <Route path="/summary" element={<FormSummary formData={{}} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;