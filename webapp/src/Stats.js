import React, {useState} from 'react';
import './App.css';
import { css } from "@emotion/core";
import { Redirect } from 'react-router-dom';
import 'react-spinning-wheel/dist/style.css';
import ClockLoader from "react-spinners/ClockLoader";



//The stats page will temporarily display 
class Stats extends React.Component { 

  constructor() {
    super();
    this.state = {
      positives: null,
      negatives: null,
      pending: null,
      deaths: null,
      totalTests: null,
      

    };
  }
  componentDidMount() {
    Promise.all([
      fetch('https://covidtracking.com/api/us'),
      fetch('https://covidtracking.com/api/us/daily')
      ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => this.setState({
        positives: data1[0].positive,
        negatives: data1[0].negative,
        deaths: data1[0].death,
        pending: data2[0].pending,
        totalTests: data1[0].totalTestResults,

       
      })
      );
    /*
    fetch('https://covidtracking.com/api/us')
    .then(results => results.json())
    .then(data => {
      this.setState({
        positives: data[0].positive,
        negatives: data[0].negative,
        deaths: data[0].death,
        totalTests: data[0].totalTestResults
      })
    })

    fetch('https://covidtracking.com/data/')
    .then(results => results.text())
    .then(results => {
      this.setState({message: results})
    })*/
  }
  render()
  {  
    return (   
      <div> {/* DO NOT REMOVE THIS DIV COMPONENT*/}
       <h1>STATS</h1>
       <h1>POSITIVES: {this.state.positives}</h1>
       <h1>NEGATIVES: {this.state.negatives}</h1>
       <h1>DEATHS: {this.state.deaths}</h1>
       <h1>TOTAL TESTS: {this.state.totalTests}</h1>
       <h1>PENDING: {this.state.pending}</h1>
       
      </div>
      )
  }
}
export default Stats;
