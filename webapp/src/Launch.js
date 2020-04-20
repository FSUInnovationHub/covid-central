import React from 'react';
import './App.css';
import 'react-spinning-wheel/dist/style.css';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const sources = [ 'Facts', 'Stats', 'News', 'Resources' , 'Commentary'];
  
/*This page will display a form that will redirect the user to different views based on their input. 
It functions with React states and react Redirects*/
class Launch extends React.Component { 

  //the states of emotion and source will be set to null initially until the user had filled out the form.
  constructor() {
    super();
    this.state = {
      emotion: '',
      source: '',
    };
  }

  handleEmotion = emotion => {
    this.setState({ emotion });
  };

  handleSource = newSource => {
    this.setState({source: newSource.target.value});
  };

  render()
  {  
    return (   
      <div className="noScroll"> {/* DO NOT REMOVE THIS DIV COMPONENT*/}
        <div className="launchCont" style={{position:'relative'}}>
          <h1>Covid-Central</h1>
          <hr className="solid"></hr>

          <h2 className="showMeThe">show me the</h2>
          <div className="dropdown">
            <Select
              style={{width:'auto',display:'block', verticalAlign: 'center'}}
              autoWidth={true}
              renderValue={(selected => { return !selected ? "Pick category" : selected})}
              displayEmpty={true}
              value={this.state.source || ''}
              onChange={this.handleSource}>
              { 
                sources.map((label, index) => 
                  <MenuItem key={index} value={label}>{label}</MenuItem>
              )}
            </Select>
           </div>

           <div>
              <hr className="solid"></hr>
              <Button 
                  className="submitTxt"
                  style={{fontSize:'10vw'}} 
                  variant="text"
                  href={"/" + this.state.source}
                  disabled={this.state.source === ""}>
                  Submit
              </Button>
            </div>
       </div> 
      </div>
      )
  }
}
export default Launch;
