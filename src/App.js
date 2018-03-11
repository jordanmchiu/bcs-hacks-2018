import React, { Component } from 'react';
import './App.css';
import EntryForm from './entryForm';
// import HTMLParser from './HTMLParser';

class EntryApp extends Component {
    constructor (props) {
        super(props);
        this.state = {
            urls: [],
            obj: {drivers: Number, startloc: String, endloc: String, urls: []}
        }
        let routificSolution;
    }
    addURL = (url, time, priority) => {
        // const {urls} = this.state.urls
        const currUrl = {url: url, time: time, priority: priority}
        // const output = <ul><li> currUrl</li></ul>
        this.state.urls.push(currUrl)
        this.setState({urls: this.state.urls, obj: this.state.obj})
    }
    addDriver = (drivers, startloc, endloc) => {
        const obj = {drivers: drivers, startloc: startloc, endloc: endloc, urls: this.state.urls}
        // this.setState({urls: this.state.urls, obj: obj});
        // let parser = new HTMLParser();
        // this.routificSolution = parser.routify(obj);
    }
    render(){
        // const {obj} = this.state.obj
        let listofHouses;
        const listofResults = this.state.urls.map((urls) =>
        <li>{urls.url}</li>);
        if (this.routificSolution) {
            listofHouses = this.routificSolution.solution;
        }
        return (
            <div>
                <h1 className="App-header">Roomtific</h1>
                <EntryForm addEntry ={this.addURL} addDriver={this.addDriver}/>
                {/*console.log({this.state.url});*/}
                <h2 className="form">List Of URLs</h2>
                <ul>{listofResults}</ul>
                <h3 className="results">List Of Appointments</h3>
                {JSON.stringify(listofHouses)}
            </div>
        );
    }
}

export default EntryApp