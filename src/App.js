import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddResep from "./components/add-resep.component";
import Resep from "./components/resep.component";
import ResepList from "./components/resep-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/resep" className="navbar-brand">
            Dan
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/resep"} className="nav-link">
                Resep List
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Resep
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/resep"]} component={ResepList} />
            <Route exact path="/add" component={AddResep} />
            <Route path="/resep/:id" component={Resep} />
          </Switch>
        </div>
      </div>
    );
  }}

export default App;