import React, {useState} from 'react';
import './App.css';
import { css } from "@emotion/core";
import { Redirect } from 'react-router-dom';
import 'react-spinning-wheel/dist/style.css';
import NumberFormat from 'react-number-format';
import Select from 'react-select'

/*empty array of form values*/
var listOfCountries = [];

/*shorthand css*/
const green = {color: 'green'};
const orange = {color: 'orange'};
const red = {color: 'red'};
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
      fetch('https://api.covid19api.com/summary')])
      .then(([res1]) => Promise.all([res1.json()]))
      .then(([data1]) => 
        {
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
          
          //this allows for the default values to be set to "World"
          this.setState({
            country: "World",
            positives: sumWorldPos,
            recovered: sumWorldRec,
            deaths: sumWorldDea
          })
      });
  }

  handleCountry = country => {
    //sets states for the individual country being queried 
    this.setState({
      country,
      positives: country['positives'],
      recovered: country['recovered'],
      deaths: country['deaths']
    });
  };

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
            <a style={link} href="https://github.com/CSSEGISandData/COVID-19" target="_blank">Data Source</a>
          </div>
          </div>
      </div>
      )
  }
}
export default Stats;
