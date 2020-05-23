import React from 'react';
import './App.css';
import 'react-spinning-wheel/dist/style.css';
import CardsArray from './CardsArray'
import NavigationComponent from './MinorComponents/NavigationComponent'
import { CardResourceTypes } from './Shared/Enums'
import { Container } from 'react-bootstrap';


const hub = {color: '#eac45f'};

class NewsPage extends React.Component { 

  render()
  alert("The live news feed component is currently unavailable as we are attempting to resolve a bug associated with NEWS API (we believe the bug is on their end)."
  {  
    return (   
    <div className="desktopCont">
      <div className="newsstatsPage"> 
        <NavigationComponent title="News" />
        <div class="innerContentCont">
          <Container fluid>
            <CardsArray resourceType={CardResourceTypes.NEWS} />
          </Container>
          <h1 className="tagFacts" style={{paddingTop: "0vh"}}>Live news updates powered by <a style={{color: "#2b2d2f"}} className="tagFacts" href="https://newsapi.org" target="_blank" rel="noopener noreferrer">News API</a>
          <br></br>Service provided by the FSU Innovation Hub <br></br>
          <a style={hub} className="tagFacts" href="https://innovation.fsu.edu/" target="_blank" rel="noopener noreferrer">innovation.fsu.edu</a></h1>
        </div>
      </div>
    </div>
    )
  }
}
export default NewsPage;
