import React from 'react';
import { Routes, Route } from "react-router-dom";

import Chat from './features/Chat/Chat';
import Join from './features/Join/Join';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Join />} />
      <Route path="/chat/:name" element={<Chat />} />
    </Routes>
  );
}

export default App;