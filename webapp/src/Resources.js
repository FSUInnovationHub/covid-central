import React from 'react';
import './App.css';
import 'react-spinning-wheel/dist/style.css';

import CardsArray from './CardsArray'
import NavigationComponent from './MinorComponents/NavigationComponent'
import { CardResourceTypes } from './Shared/Enums'
import { Container } from 'react-bootstrap';

const hub = {color: '#eac45f'};

class Resources extends React.Component { 

  render()
  {  
    return (   
      <div className="desktopCont">
        <div className="newsstatsPage"> 
          <NavigationComponent title="Resources" />
          <div class="innerContentCont">
            <Container fluid>
              <CardsArray resourceType={CardResourceTypes.RESOURCES} />
            </Container>
            <h1 className="tagFacts" style={{paddingTop: "0vh"}}>
            <br></br>Service provided by the FSU Innovation Hub <br></br>
            <a style={hub} className="tagFacts" href="https://innovation.fsu.edu/" target="_blank" rel="noopener noreferrer">innovation.fsu.edu</a></h1>
          </div>
        </div>
      </div>
      )
  }
}
export default Resources;
