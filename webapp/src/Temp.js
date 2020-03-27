import React, {useState} from 'react';
import './App.css';
import { css } from "@emotion/core";
import { Redirect } from 'react-router-dom';
import 'react-spinning-wheel/dist/style.css';
import ClockLoader from "react-spinners/ClockLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
// allows for the clock to be centered
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

//This class will temporarily display 
class Temp extends React.Component { 
  render()
  {  
    return (   
      <div> {/* DO NOT REMOVE THIS DIV COMPONENT*/}
       <div className="tempCont">
          <h1>Covid Central</h1>
          <br></br>
          <div className="clockWrapper">
            <ClockLoader
              css={override}
              size={150}
              color={"#FFFFFF"} 
              />
          </div>
          <br></br>
          <a className="see" href="https://github.com/FSUInnovationHub/covid-central" target="_blank">See what we're up to...</a>
       </div>
       
      </div>
      )
  }
}
export default Temp;

