import React, {useState} from 'react';
import './App.css';
import { css } from "@emotion/core";
import { Redirect } from 'react-router-dom';
import 'react-spinning-wheel/dist/style.css';
import NumberFormat from 'react-number-format';
import {Select} from 'react-select';

const emotionsList = [
  { value: 'anxious', label: 'anxious' },
  { value: 'curious', label: 'curious' },
];

const sourcesList = [
  { value: 'facts', label: 'facts' },
  { value: 'stats', label: 'stats' },
  { value: 'news', label: 'news' },
  { value: 'commentary', label: 'commentary' },
];

//This page will display the current statistics from the COVID-19 Outbreak Specific to the USA
class Stats extends React.Component { 

  constructor() {
    super();
    this.state = {
      emotion: null,
      source: null,
    };
   
  }
  
  handleChange = emotion => {
    this.setState({ emotion });
    console.log(`Option selected:`, emotion);
  };

  handleChange = source => {
    this.setState({ source });
    console.log(`Option selected:`, source);
  };
  



  render()
  {  
    const { selectedOption } = this.state;
    return (   
      <div> {/* DO NOT REMOVE THIS DIV COMPONENT*/}
        <div className="launchCont">
          <h1>Covid Central</h1>
          <h2 className="imFeeling">i'm feeling</h2>
          <div className="dropdown">
           {/* <Select
              value={this.state.emotion}
              onChange={this.handleChange}
              options={emotionsList}
            />
          </div>

          <h2 className="showMeThe">show me the</h2>

          <div className="dropdown">
            <Select
              value={this.state.source}
              onChange={this.handleChange}
              options={sourcesList}
            />
           </div>*/}
           </div>
          
          <form action="https://covid-central.netlify.com/error" method="POST" > 
          
     

          
    
          

          
      
      
      
  <button className="submitTxt" type="submit" value="Submit">submit</button>
    </form>
          
    
         
       </div>
       
       
      </div>
      )
  }
}
export default Stats;
