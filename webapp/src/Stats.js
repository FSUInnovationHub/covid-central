import React from 'react';
import './App.css';
import 'react-spinning-wheel/dist/style.css';
import NumberFormat from 'react-number-format';
import Select from 'react-select'

import * as Util from './Shared/Util.js'
import NavigationComponent from './MinorComponents/NavigationComponent'
import { Container } from 'react-bootstrap';

import CardsArray from './CardsArray'
import { CardResourceTypes } from './Shared/Enums'

import Typography from '@material-ui/core/Typography';

/*empty array of form values*/
var listOfCountries = [];
var listOfStates = [];

//sort by world or state options NOTE- No recoveries have been reported by states.
const topTenOptions = [
  { value: 'positives', label: 'By Known Cases', color: 'orange' },
  {value: 'recovered', label: 'By Known Recoveries', color: 'green' },
  { value: 'deaths', label: 'By Known Deaths', color: 'red' },
];
const topTenOptionsState = [
  { value: 'positives', label: 'By Known Cases', color: 'orange' },
  { value: 'deaths', label: 'By Known Deaths', color: 'red' },
]


/*shorthand css*/
const green = {color: 'green'};
const orange = {color: 'orange'};
const red = {color: 'red'};
const gray = {color: 'gray'};
const link = {color: '#7da4ff'};

//this function converts the time to the local user's time zone and then seperates the day and time
//0 is day, 1 is time
var dateArray = function(apiDate) {
  var timestamp = Util.IsoToLocalFormatted(apiDate);
  var day = [];
  var time = [];
  var returnArr = [];
  for(var d = 0; d < timestamp.length; d++)
  {
    if(timestamp[d] === " ")
    {
      for(var t = d; t < timestamp.length; t++)
      {
        time.push(timestamp[t])
      }
      break
    }
      day.push(timestamp[d])
  }
  returnArr.push(day.join(""))
  returnArr.push(time.join(""))
  return returnArr;
}

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
      worldUpdatedDay: null,
      worldUpdatedTime: null,
      topTenCountries: [],
      state: "",
      statePositives: null,
      stateNegatives: null,
      stateDead: null,
      stateTotalTests: null,
      stateUpdatedDay: null,
      stateUpdatedTime: null,
      topTenStates: [],
      byKnownWorld: "",
      byKnownStates: "",

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
          this.sortTop(listOfCountries)
          for(i = 0; i < data2.length; i++)
          {

            if(data2[i].state === "FL")
            {
              dateArray(data2[i].dateModified)
              //the default state will be florida, therefore the initial states are set
              this.setState({
                state: "FL",
                statePositives: data2[i].positive,
                stateNegatives: data2[i].negative,
                stateDead: data2[i].death,
                stateUpdatedDay: dateArray(data2[i].dateModified)[0],
                stateUpdatedTime: dateArray(data2[i].dateModified)[1],
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
            worldUpdatedDay: dateArray(data1['Date'])[0],
            worldUpdatedTime: dateArray(data1['Date'])[1],
            topTenCountries: (this.sortTop(listOfCountries, 'positives')),
            topTenStates: (this.sortTop(listOfStates, 'positives'))
          })
      });


  }

  //this fnc sorts through the list and arranges it in descending order based on the query put in ex) by known cases
  sortTop(list, query) {
    var sortedList = list.sort(function(a,b) {return (b[query] - a[query])})
    var topTen = []
    var upper = 10;
    for(var i = 0; i < upper; i++)
    {
      //world was forced to the beginning of the listOfCountries array. This ensures it doesn't get counted in the top ten.
      if(sortedList[i]['label'] === "World"){
        upper++;
        continue
      }
      //2 dimenstional array allows for the list value and its query to be saved... ex) India, positives
      topTen.push([sortedList[i]['label'], sortedList[i][query]])
    }
    return topTen
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
      stateUpdatedDay: dateArray(state['lastUpdated'])[0],
      stateUpdatedTime: dateArray(state['lastUpdated'])[1]
    })
  }

  handleByKnownWorld = byKnownWorld => {
    //sets states for the individual country being queried
    this.setState({
      byKnownWorld,
      topTenCountries: this.sortTop(listOfCountries, byKnownWorld['value']),
    })
  }

  handleByKnownStates = byKnownStates => {
    //sets states for the individual state being queried
    this.setState({
      byKnownStates,
      topTenStates: this.sortTop(listOfStates, byKnownStates['value']),
    })
  }

  render()
  {
    //maps out the top ten countries. the conditional rendering is used to pick the color of the figures being shown.
    //ex) recoveries renders green
    const topTenCountryNames = this.state.topTenCountries.map((item) =>
      <li key={item}>{item[0]}
      (
      {this.state.byKnownWorld['value'] === "deaths" ? (
        <NumberFormat style={red} value={item[1]} displayType={'text'} thousandSeparator={true}/>
      )
      :
      (
        this.state.byKnownWorld['value'] === "recovered" ? (
          <NumberFormat style={green} value={item[1]} displayType={'text'} thousandSeparator={true}/>
        )
        :
        (
          <NumberFormat style={orange} value={item[1]} displayType={'text'} thousandSeparator={true}/>
        )
      )})
      </li>
    );

    //maps out the top ten states. the conditional rendering is used to pick the color of the figures being shown.
    //ex) recoveries renders green
    const topTenStates = this.state.topTenStates.map((item) =>
      <li key={item}>{item[0]}
      (
      {this.state.byKnownStates['value'] === "deaths" ? (
        <NumberFormat style={red} value={item[1]} displayType={'text'} thousandSeparator={true}/>
      )
      :
      (
        this.state.byKnownStates['value'] === "recovered" ? (
          <NumberFormat style={green} value={item[1]} displayType={'text'} thousandSeparator={true}/>
        )
        :
        (
          <NumberFormat style={orange} value={item[1]} displayType={'text'} thousandSeparator={true}/>
        )
      )})
      </li>
    );

    return (

    <div className="statsPage"> {/* DO NOT REMOVE THIS DIV COMPONENT*/}
      <NavigationComponent title="Stats" />
      <div style={{padding: '25px 10px 25px 10px'}}>
        <Typography variant="caption" color="inherit">
          Last Updated: {(new Date()).toLocaleTimeString()}
        </Typography>
      </div>

    <Container fluid>
      {/*COUNTRY TRACKER WIDGET*/}
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
            <a className="updatedAt" style={gray}>{this.state.worldUpdatedTime} </a>
            <br></br>
            <a className="updatedAt" style={gray}>{this.state.worldUpdatedDay} </a>
            <a className=".dataSource" style={link} href="https://covid19api.com/" target="_blank"><div className="dataSource"> Source </div></a>
            <br></br>
          </div>
        </div>
    </Container>

    <Container fluid>
      {/*STATE TRACKER WIDGET*/}
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
            <a style={gray} className="updatedAt"> {this.state.stateUpdatedTime}</a>
            <br></br>
            <a style={gray} className="updatedAt"> {this.state.stateUpdatedDay}</a>
            <a className=".dataSource" style={link} href="https://covidtracking.com/" target="_blank"><div className="dataSource"> Source </div></a>
          </div>
        </div>
    </Container>

    <Container fluid>
      {/*TOP TEN COUNTRIES WIDGET*/}
        <div className="statsCont">
          <h1 className="topTenHeader">Top Ten Countries <br></br></h1>
          <Select className="selectCountry"
            placeholder={"By Known Cases"}
            value={this.state.byKnownWorld}
            onChange={this.handleByKnownWorld}
            options={topTenOptions}
          />
          <div>
            <ol className="topTen">{topTenCountryNames}</ol>
            <br></br>
          </div>
            <a className=".dataSource" style={link} href="https://covid19api.com/" target="_blank"><div className="dataSource"> Source </div></a>
        </div>
    </Container>

      
    <Container fluid>
      {/*TOP TEN STATES WIDGET*/}
        <div className="statsCont">
          <h1 className="topTenHeader">Top Ten States <br></br></h1>
          <Select className="selectCountry"
            placeholder={"By Known Cases"}
            value={this.state.byKnownStates}
            onChange={this.handleByKnownStates}
            options={topTenOptionsState}
          />
          <div>
            <ol className="topTen">{topTenStates}</ol>
            <br></br>
          </div>
            <a className=".dataSource" style={link} href="https://covidtracking.com/" target="_blank"><div className="dataSource"> Source </div></a>
        </div>
    </Container>

    
        <CardsArray resourceType={CardResourceTypes.STATS} />
      

</div>
      )
  }
}
export default Stats;
