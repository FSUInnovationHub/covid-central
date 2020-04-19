import React from 'react';
import './App.css';
import 'react-spinning-wheel/dist/style.css';

import CardsArray from './CardsArray'
import NavigationComponent from './MinorComponents/NavigationComponent'
import { CardResourceTypes } from './Shared/Enums'
import { Container } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';

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

<div className="statsPage"> 
    <NavigationComponent title="News" />

    <div style={{padding: '25px 10px 25px 10px'}}>

      <Typography variant="caption" color="inherit" style={{float: "left"}}>
        Last Updated: {(new Date()).toLocaleTimeString()}
      </Typography>
      <Container fluid>
        <CardsArray resourceType={CardResourceTypes.NEWS} />
      </Container>

    </div>
</div>

      )
  }
}
export default NewsPage;
