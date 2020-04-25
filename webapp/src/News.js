import React from 'react';
import './App.css';
import 'react-spinning-wheel/dist/style.css';

import CardsArray from './CardsArray'
import NavigationComponent from './MinorComponents/NavigationComponent'
import { CardResourceTypes } from './Shared/Enums'
import { Container } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';



const hub = {color: '#eac45f'};

class NewsPage extends React.Component { 

  constructor() {
    super();
    this.state = {
      
    };
  }
  
  componentDidMount() {

  }

  render()
  {  
    return (   

<div className="newsstatsPage"> 
    <NavigationComponent title="News" />

    <div style={{padding: '25px 10px 25px 10px'}}>

      <Typography variant="caption" color="inherit" style={{float: "left"}}>
        Last Updated: {(new Date()).toLocaleTimeString()}
      </Typography>
      <Container fluid>
        <CardsArray resourceType={CardResourceTypes.NEWS} />
      </Container>
      <Container fluid>
      <h1 className="tag">Service provided by the FSU Innovation Hub <br></br>
         <a style={hub} href="https://innovation.fsu.edu/" target="_blank">innovation.fsu.edu</a></h1>
         </Container>
    </div>

</div>

      )
  }
}
export default NewsPage;
