import React from 'react';
import '../App.css';
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

  constructor(props) {
    super(props);
    this.title = this.props.title
    //this.refreshCallback = this.props.refreshCallback
    this.state = {

    };
  }

  render()
  {  
    return (   

<div className="navBanner"> 
    <AppBar position="fixed">
        <Toolbar>
          <Typography variant="title" color="inherit">{this.title}</Typography>

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

