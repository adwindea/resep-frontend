import React, { Component } from "react";
import ResepDataService from "../services/resep.service";
import { Link } from "react-router-dom";

export default class ResepsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveReseps = this.retrieveReseps.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveReseps();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveReseps() {
    ResepDataService.getAll()
      .then(response => {
        this.setState({
          reseps: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    ResepDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          reseps: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, reseps, currentResep, currentIndex } = this.state;

    return (
      <div className="row">
          <div className="col-12">
            <div className="row">
                <div className="col-md-6">
                    <h4>Reseps List</h4>
                </div>
                <div className="col-md-12">
                <div className="input-group mb-3">
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name"
                    value={searchTitle}
                    onChange={this.onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={this.searchTitle}
                    >
                        Search
                    </button>
                    </div>
                </div>
                </div>
            </div>
            <div className="row">
            {reseps &&
              reseps.map((resep, index) => (
                <div className="col-md-6 col-12">
                    <div className="card">
                        <div className="card-body">
                            <div class="row">
                                <div className="col-4">
                                    <span>should be image</span>
                                    {/* <img src="ai.jpg" style="max-width:100%"></img> */}
                                </div>
                                <div className="col-8">
                                    <div className="row">
                                        <div className="col-12">
                                            <h4>{resep.title}</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            {resep.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
    </div>
    )
  }
}