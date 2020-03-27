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
      
    };
   
  }
  
  



  render()
  {  
    return (   
      <div> {/* DO NOT REMOVE THIS DIV COMPONENT*/}
        <div className="launchCont">
          <h1>Covid Central</h1>
          <h2 className="imFeeling">i'm feeling</h2>
          <form action="https://covid-central.netlify.com/error" method="POST" > 
          <div className="dropdown">
            <div align="center">
              <select required name="feeling"> 
                <option value="">select emotion</option>
                <option value="curious">curious</option>
                <option value="anxious">anxious</option>
              </select>
            </div>  
          </div>

          <h2 className="showMeThe">show me the</h2>
       
          <div className="dropdown">
            <div align="center">
              <select required name="option"> 
                <option value="">select source</option>
                <option value="facts">facts</option>
                <option value="stats">stats</option>
                <option value="news">news</option>
                <option value="commentary">commentary</option>
              </select>
            </div>  
          </div>

          

          
      
      
      
      <footer className="submit"><button className="submitTxt" type="submit" value="Submit">submit</button></footer>
        
    </form>
          
    
         
       </div>
       
       
      </div>
      )
  }
}
export default Stats;
