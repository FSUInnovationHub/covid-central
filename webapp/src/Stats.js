import React, {useState} from 'react';
import './App.css';
import { css } from "@emotion/core";
import { Redirect } from 'react-router-dom';
import 'react-spinning-wheel/dist/style.css';
import NumberFormat from 'react-number-format';
import Select from 'react-select'
import {NavLink} from 'react-router-dom'

import * as Util from './Shared/Util.js'
import { Button } from '@material-ui/core';

/*empty array of form values*/
var listOfCountries = [];
var listOfStates = [];

/*shorthand css*/
const green = {color: 'green'};
const orange = {color: 'orange'};
const red = {color: 'red'};
const gray = {color: 'gray'};
const link = {color: '#7da4ff'};

//This page will display the current statistics from the COVID-19 Outbreak Specific to the USA
class Stats extends React.Component { 

  constructor() {
    super();
    this.state = {
      //each country's individual statistics as states for dynamic rendering. Defaulted to "World"
      country: "",
      positives: null,
      recovered: null,
      deaths: null,
      lastUpdated: null,
      state: "",
      statePositives: null,
      stateNegatives: null,
      stateDead: null,
      stateTotalTests: null, 
      stateUpdated: null,
    };
  }
  
  //connects to the covid19api.com, which is sourced from Johns Hopkins CSSE
  componentDidMount() {
    //world totals will increment as as the api response is iterated through.
    var sumWorldPos = 0;
    var sumWorldRec = 0;
    var sumWorldDea = 0;

    /*
      The API response is wrapped in the following manner...
        res = response['Countries'][Country Code].Category
      For example, if I want to see the USA's total i would say 
        usTotal = response['Countries'][215].TotalConfirmed
    */
    
    Promise.all([
      fetch('https://api.covid19api.com/summary'),
      fetch('https://covidtracking.com/api/states'),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => 
        {  
          //this.setState({lastUpdated: new Date(data1['Date'])})
          //this for loop iterates through the entire APi response and pushed each cluster of data to the listOfCountries array.
          for(var i = 0; i < data1['Countries'].length; i++)
          {
            if(data1['Countries'][i].Country === 'US')
            { 
              listOfCountries.push({ value: data1['Countries'][i].Country, label: "United States", code: i, positives: data1['Countries'][i].TotalConfirmed, recovered: data1['Countries'][i].TotalRecovered, deaths: data1['Countries'][i].TotalDeaths})
            }
            else
            {
              listOfCountries.push({ value: data1['Countries'][i].Country, label: data1['Countries'][i].Country, code: i, positives: data1['Countries'][i].TotalConfirmed, recovered: data1['Countries'][i].TotalRecovered, deaths: data1['Countries'][i].TotalDeaths})
            }
            //world totals are incremented
            sumWorldPos += data1['Countries'][i].TotalConfirmed
            sumWorldRec += data1['Countries'][i].TotalRecovered
            sumWorldDea += data1['Countries'][i].TotalDeaths
          }

          //creates a world option since the API doesn't provide one
          listOfCountries.push({ value: "World", label: "World", positives: sumWorldPos, recovered: sumWorldRec, deaths: sumWorldDea})
          
          for(var i = 0; i < data2.length; i++)
          {
            if(data2[i].state === "FL")
            {
              //the default state will be florida, therefore the initial states are set
              this.setState({
                state: "FL",
                statePositives: data2[i].positive,
                stateNegatives: data2[i].negative,
                stateDead: data2[i].death,
                stateUpdated: Util.IsoToLocalFormatted(data2[i].dateModified)
              })
            }
            listOfStates.push({ value: data2[i].state, label: data2[i].state, positives: data2[i].positive, negatives: data2[i].negative, deaths: data2[i].death, lastUpdated: data2[i].dateModified})
          }
          //this allows for the default values to be set to "World"
          this.setState({
            country: "World",
            positives: sumWorldPos,
            recovered: sumWorldRec,
            deaths: sumWorldDea,
            lastUpdated: Util.IsoToLocalFormatted(data1['Date'])
          })
      });
  }

  handleCountry = country => {
    //sets states for the individual country being queried 
    this.setState({
      country,
      positives: country['positives'],
      recovered: country['recovered'],
      deaths: country['deaths'],
    });
  };

  handleState = state => {
    //sets states for the individual state being queried
    this.setState({
      state,
      statePositives: state['positives'],
      stateNegatives: state['negatives'],
      stateDead: state['deaths'],
      stateUpdated: Util.IsoToLocalFormatted(state['lastUpdated'])
    })
  } 

  render()
  {  
    return (   
      <div className="statsPage"> {/* DO NOT REMOVE THIS DIV COMPONENT*/}
       <div className="statsCont">
       <Select className="selectCountry"
       placeholder={"World"}
          value={this.state.country}
          onChange={this.handleCountry}
          options={listOfCountries}
        />
          <div>
            <h1 className="numbers">Total Cases: <br></br><NumberFormat style={orange} value={this.state.positives} displayType={'text'} thousandSeparator={true}/></h1>
            <h1 className="numbers">Recoveries: <br></br><NumberFormat style={green} value={this.state.recovered} displayType={'text'} thousandSeparator={true}/></h1>
            <h1 className="numbers">Deaths: <br></br><NumberFormat style={red} value={this.state.deaths} displayType={'text'} thousandSeparator={true}/></h1>
            <br></br>
            <a style={gray}>Updated at: {this.state.lastUpdated} </a>
            <a className=".dataSource" style={link} href="https://covid19api.com/" target="_blank"><div className="dataSource"> Source </div></a>
          </div>
          </div>
          <div className="statsCont">
       <Select className="selectCountry"
       placeholder={"FL"}
          value={this.state.state}
          onChange={this.handleState}
          options={listOfStates}
        />
          <div>
            <h1 className="numbers">Positives: <br></br><NumberFormat style={orange} value={this.state.statePositives} displayType={'text'} thousandSeparator={true}/></h1>
            <h1 className="numbers">Negatives: <br></br><NumberFormat style={green} value={this.state.stateNegatives} displayType={'text'} thousandSeparator={true}/></h1>
            <h1 className="numbers">Deaths: <br></br><NumberFormat style={red} value={this.state.stateDead} displayType={'text'} thousandSeparator={true}/></h1>
            <br></br>
            <a style={gray}> Updated At: {this.state.stateUpdated}</a>
            <a className=".dataSource" style={link} href="https://covidtracking.com/" target="_blank"><div className="dataSource"> Source </div></a>
            <br></br>
          </div>
          </div>

          {/*redirects the user back to the launch page*/}
          <NavLink style={{ textDecoration: 'none' }} className="resetTxt" to="/"> reset </NavLink>    
      </div>
      )
  }
}
export default Stats;
