import React from 'react';
import './App.css';
import 'react-spinning-wheel/dist/style.css';

import CardsArray from './CardsArray'
import NavigationComponent from './MinorComponents/NavigationComponent'
import { CardResourceTypes } from './Shared/Enums'
import { Container } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import * as Util from './Shared/Util'

const hub = {color: '#eac45f'};

class Resources extends React.Component { 

  constructor() {
    super();
    this.state = {

    };
  }
  
  componentDidMount() {

  }

  render()
  {  
    const isMobile = Util.IsMobileUserAgent()
    var divClass = "newsstatsPage"
    var divClass2 = "desktopCont"
    var tag = "tagCommentary"
    var desktopUrl = "hubLink"
    if(isMobile)
    {
      divClass = "newsstatsPageMobile"
      divClass2 = undefined
      desktopUrl = undefined
      tag = "tag"
    }
    return (   

<div className={divClass2}>
<div className={divClass}> 
    <NavigationComponent title="Resources" />

    <div class="innerContentCont">

      <Typography variant="caption" color="inherit" style={{float: "left"}}>
        Last Updated: {(new Date()).toLocaleTimeString()}
      </Typography>
      <Container fluid>
        <CardsArray resourceType={CardResourceTypes.RESOURCES} />
        <h1 className={tag}>Service provided by the FSU Innovation Hub <br></br>
         <a style={hub} className={desktopUrl} href="https://innovation.fsu.edu/" target="_blank">innovation.fsu.edu</a></h1>
      </Container>

    </div>

</div>
</div>

      )
  }
}
export default Resources;
