import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.sass';
import { Dashboard, Calc } from "./components";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <h3 className="navbar-item">IAS HandyMan</h3>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                <Link to="/" className="button is-info">Reporte de servicio</Link>
                <Link to="/calc" className="button is-warning">Cálculo de horas de trabajo</Link>
                </div>
              </div>
            </div>
          </nav>

          <Switch>
            <Route path="/calc">
              <Calc />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
