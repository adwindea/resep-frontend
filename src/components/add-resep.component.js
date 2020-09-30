import React, { Component } from "react";
import ResepDataService from "../services/resep.service";
import axios from "axios";

export default class AddResep extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.saveResep = this.saveResep.bind(this);
        this.newResep = this.newResep.bind(this);

        this.state = {
            id: null,
            title: "",
            description: "", 
            img: "", 

            submitted: false
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangeFile(e) {
        this.setState({
            img: e.target.files[0],
        });
    }
    saveResep() {
        const formFile = new FormData();
        formFile.append('file', this.state.img);
        axios.post("http://localhost:8080/api/resep/upload", formFile, { 
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        }).then(res => { // then print response status
            var data = {
                title: this.state.title,
                description: this.state.description,
                imgname: res.data.filename
            };
            ResepDataService.create(data)
            .then(response => {
                this.setState({
                id: response.data.id,
                title: response.data.title,
                description: response.data.description,
                submitted: true
                });
            })
            .catch(e => {
                console.log(e);
            });
        })
    }
    newResep() {
        this.setState({
            id: null,
            title: "",
            description: "",
            img: "",
            submitted: false
        });
    }  

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newResep}>
                        Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                            name="title"
                        />
                        </div>
            
                        <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            name="description"
                        />
                        </div>

                        <div className="form-group">
                        <label htmlFor="file">Image</label>
                        <input 
                            type="file" 
                            name="file" 
                            className="form-control-file border"
                            onChange={this.onChangeFile}
                        />
                        </div>

                        <button onClick={this.saveResep} className="btn btn-success">
                        Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}