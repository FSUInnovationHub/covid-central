import React, {useState} from 'react';
import './App.css';
import { NavLink } from 'react-router-dom'
import { css } from "@emotion/core";
import { Redirect } from 'react-router-dom';
import 'react-spinning-wheel/dist/style.css';
import NumberFormat from 'react-number-format';
import Select from 'react-select';


/*array of form values*/
const emotionsList = [
  { value: 'anxious', label: 'anxious' },
  { value: 'curious', label: 'curious' },
  { value: 'creative', label: 'creative'},
  
];

const sourcesList = [
  { value: 'facts', label: 'facts' },
  { value: 'stats', label: 'stats' },
  { value: 'news', label: 'news' },
  { value: 'commentary', label: 'commentary' },
];

/*This page will display a form that will redirect the user to different views based on their input. 
It functions with React states and react Redirects*/
class Launch extends React.Component { 

  //the states of emotion and source will be set to null initially until the user had filled out the form.
  constructor() {
    super();
    this.state = {
      emotion: null,
      source: null,
    };
   
  }
  

  handleEmotion = emotion => {
    this.setState({ emotion });
  };

  handleSource = source => {
    this.setState({ source });
  };


  render()
  {  
    return (   
      <div className="noScroll"> {/* DO NOT REMOVE THIS DIV COMPONENT*/}
        <div className="launchCont">
          <h1>Covid Central</h1>
          <h2 className="imFeeling">i'm feeling</h2>
          <div className="dropdown">
           <Select
              value={this.state.emotion}
              onChange={this.handleEmotion}
              options={emotionsList}
            />
          </div>
          <h2 className="showMeThe">show me the</h2>
          <div className="dropdown">
            <Select
              value={this.state.source}
              onChange={this.handleSource}
              options={sourcesList}
            />
           </div>
          <NavLink style={{ textDecoration: 'none' }} className="submitTxt" to="/dashboard"> submit </NavLink>   
       </div> 
      </div>
      )
  }
}
export default Launch;
