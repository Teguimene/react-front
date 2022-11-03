import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './components/Home/index';
import DetailsProduit from './components/Produits/DetailsProduit';
import Welcome from './components/Welcome';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/welcome/:token/:user_name/:user_id" element={<Welcome />} />
        <Route exact path="/produit/:produit_id/:token" element={<DetailsProduit/>} />
      </Routes>
    </Router>
  );
}

export default App;
