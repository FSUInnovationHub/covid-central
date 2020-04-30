import React from 'react';
import '../App.css';
import 'react-spinning-wheel/dist/style.css';

import * as Util from '../Shared/Util'

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

const textTheme = createMuiTheme({
  palette: {
    primary: { main: "#e91e63", contrastText: "#fff" },
    secondary: { main: "#fff", contrastText: "#000" }
  }
});

class DesktopUserNoticeComponent extends React.Component {

  constructor() {
    super();
    this.state = {

    };

    console.log(Util.IsMobileUserAgent())
  }

  render() {
    const isMobile = Util.IsMobileUserAgent()

    return (
      <div>
      { isMobile === false ? 
          <div className="newsCont" 
            style={{textAlign:'center',
                    display:'block', 
                    paddingTop:'0.1vh',
                    paddingBottom:'0.1vh',
                    verticalAlign:'center', 
                    width: "40vw",
                    marginLeft:'auto',
                    marginRight:'auto',
                    marginTop: "0vh"}}>
            <MuiThemeProvider theme={textTheme}>
              <div className="newsCardBody">
                <Typography variant="body2" color="secondary">
                  It looks like you&apos;re visitng from a desktop! We recommend a mobile browser for the best experience.
                </Typography>
              </div>
            </MuiThemeProvider>
          </div>
        : <div /> }
      </div>
    )
  }

}

export default DesktopUserNoticeComponent;