import React, {useState} from 'react';
import '../App.css';
import { css } from "@emotion/core";
import { Redirect } from 'react-router-dom';
import 'react-spinning-wheel/dist/style.css';

// material ui
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// icons
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import RefreshIcon from '@material-ui/icons/Refresh';

class NavigationComponent extends React.Component { 

  constructor() {
    super();
    //this.title = this.props.title
    this.state = {

    };
  }

  render()
  {  
    return (   

<div className="navBanner"> 
    <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">Title</Typography>

          <section style={{marginLeft: 'auto'}}>
              <IconButton href={"/launch"} color="inherit">
                <NavigateBeforeIcon />
              </IconButton>

              <IconButton color="inherit">
                <RefreshIcon />
              </IconButton>
          </section>
        </Toolbar>
    </AppBar>
</div>

      )
  }
}
export default NavigationComponent;

