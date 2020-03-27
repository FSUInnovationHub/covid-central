import React, {useState} from 'react';
import './App.css';
import { css } from "@emotion/core";
import { Redirect } from 'react-router-dom';
import 'react-spinning-wheel/dist/style.css';
import NumberFormat from 'react-number-format';

//This page will display the current statistics from the COVID-19 Outbreak Specific to the USA
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
  
  //connects to the covidtracking api. I have asked them to include a "last modified: " category to their endpoints.
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
        totalTests: data1[0].totalTestResults,
        pending: data2[0].pending,

       
      })
      );
  }


  render()
  {  
    return (   
      <div> {/* DO NOT REMOVE THIS DIV COMPONENT*/}
       <h1>STATS</h1>
       <h1>POSITIVES: <NumberFormat value={this.state.positives} displayType={'text'} thousandSeparator={true}/></h1>
       <h1>NEGATIVES: <NumberFormat value={this.state.negatives} displayType={'text'} thousandSeparator={true}/></h1>
       <h1>DEATHS: <NumberFormat value={this.state.deaths} displayType={'text'} thousandSeparator={true}/></h1>
       <h1>TOTAL TESTS COMPLETED: <NumberFormat value={this.state.totalTests} displayType={'text'} thousandSeparator={true}/></h1>
       <h1>PENDING: <NumberFormat value={this.state.pending} displayType={'text'} thousandSeparator={true}/></h1>
      </div>
      )
  }
}
export default Stats;
