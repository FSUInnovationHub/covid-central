import React from 'react';
import './App.css';
import 'react-spinning-wheel/dist/style.css';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import CardsArray from './CardsArray'
import NavigationComponent from './MinorComponents/NavigationComponent'
import { CardResourceTypes } from './Shared/Enums'
import { Container } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select'
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import dosAndDont from './Content/dosAndDont.jpg'
import typesOfMasks from './Content/typesOfMasks.png'
import socialDistancing from './Content/socialDistancing.jpg'
import filler from './Content/filler.jpg'
import * as Util from './Shared/Util'


//options of reliable twitter users to render
const options = [
    { value: 'General', label: 'General'},
    { value: 'Masks', label: 'Masks'},
    { value: 'Social Distancing', label: 'Social Distancing'},
    { value: 'Hotlines', label: 'Hotlines'},
  ];

const hub = {color: '#eac45f'};

const textTheme = createMuiTheme({
  palette: {
    primary: { main: "#e91e63", contrastText: "#fff" },
    secondary: { main: "#fff", contrastText: "#000" }
  }
});

class Commentary extends React.Component { 

  constructor() {
    super();
    this.state = {
      category: {value: "General", label: "General"},
      general: true,
      masks: true, 
      socialDistancing: true, 
      hotlines: true, 

    };
  }
  
  handleCategory = category => {
    //sets state for the twitter user being queried 
    //the change boolean MUST be here to ensure a pseudo rerender without losing the option being selected
    
    this.setState({category})
    switch(category['value'])
    {
      case "General":
        this.setState({general: true, masks: true, socialDistancing: true, hotlines: true})
        break;
      case "Masks":
        this.setState({general: false, masks: true, socialDistancing: false, hotlines: false})
        break
      case "Social Distancing":
        this.setState({general: false, masks: false, socialDistancing: true, hotlines: false})
        break
      case "Hotlines":
        this.setState({general: false, masks: false, socialDistancing: false, hotlines: true})
        break
    }
  }

  render()
  {  
    const isMobile = Util.IsMobileUserAgent()
    return isMobile ? (   
    <div className="statsPage"> 
      <NavigationComponent title="Facts" />
        <div style={{padding: '25px 10px 0px 10px'}}>
        <Typography variant="caption" color="inherit" style={{float: "left"}}>
          Last Updated: {(new Date()).toLocaleTimeString()}
        </Typography>

      <Container fluid className="factsContainer">
        <div style={{marginTop: "4vh"}}></div>
          <Select className="selectFacts"
            placeholder={"General"}
            value={this.state.category}
            onChange={this.handleCategory}
            options={options}
            style={{fontSize: "40vw"}}
          />
       
       <div style={{marginTop: "2vh"}}></div> 


       {this.state.general && <div>
         <div className="newsCont">

        <MuiThemeProvider theme={textTheme}>
              <div className="newsCardHeader">
                <Typography variant="h5" color="secondary">
                  What is Covid-Central
                </Typography>
              </div>

              <hr className="cardDivider" />

              <div className="newsCardBody">
                <Typography variant="body2" color="secondary">
                Covid Central is a data centralization tool that helps cater sources based on your emotion.
                
                </Typography>
              </div>
            </MuiThemeProvider>

            
        </div>
        <div className="factsCont">

        <MuiThemeProvider theme={textTheme}>
              <div className="newsCardHeader">
                <Typography variant="h5" color="secondary">
                  CDC
                </Typography>
              </div>

              <hr className="cardDivider" />

              <div className="newsCardBody">
                <Typography variant="body2" color="secondary">
                “COVID-19 is caused by a new coronavirus. Coronaviruses are a large family of viruses that are common in people and many different species of animals, including camels, cattle, cats, and bats. Rarely, animal coronaviruses can infect people and then spread between people such as with MERS-Co-V-2. MERS-CoV, SARS-CoV, and now this new virus, names SARS-CoV-2.”  
 
                </Typography>
              </div>
            </MuiThemeProvider>

            
        </div>
        <div className="newsCont">

        <MuiThemeProvider theme={textTheme}>
              <div className="newsCardHeader">
                <Typography variant="h5" color="secondary">
                  Pandemic Declaration 
                </Typography>
              </div>

              <hr className="cardDivider" />

              <div className="newsCardBody">
                <Typography variant="body2" color="secondary">
                On March 11, the COVID-19 outbreak was characterized as a Pandemic by the World Health Organization. “A pandemic is a global outbreak of disease. Pandemics happen when a new virus emerges to infect people and can spread between people sustainably. Because there is little to no pre-existing immunity against the new virus, it spreads worldwide.”
 
                </Typography>
              </div>
            </MuiThemeProvider>
            

            
        </div>
        <div style={{marginTop: "3vh"}}></div> 
        </div>}
       {this.state.masks && <div >
        <div className="cardCont"><img src={typesOfMasks} style={{width: "90vw", height: "auto"}} alt="Logo" /></div>
        <div className="cardCont"><iframe style={{width:"90vw", height:"30vh"}} src="https://www.youtube.com/embed/Mgp7DSGN33k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/></div>
        <div className="cardCont"><iframe style={{width:"90vw", height:"30vh"}} src="https://www.youtube.com/embed/DFt9OuSKsOs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/></div>
        
        <div className="cardCont"><img src={dosAndDont} style={{width: "90vw", height: "auto"}} alt="Logo" /></div>
        
        </div>}
       {this.state.socialDistancing && <div>
        <div className="cardCont"><img src={socialDistancing} style={{width: "90vw", height: "auto"}} alt="Logo" /></div>
        <div className="cardCont"><iframe style={{width:"90vw", height:"30vh"}} src="https://www.youtube.com/embed/UMqi0AfLnro" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/></div>
        </div>}
       {this.state.hotlines && <div>
        <div className="cardCont">
        <img src={filler} style={{width: "90vw", height: "50vh"}} alt="Logo" />
      
       </div>
      </div>}
        
        
        <h1 className="tagFacts">Service provided by the FSU Innovation Hub <br></br>
        <a style={hub} href="https://innovation.fsu.edu/" target="_blank">innovation.fsu.edu</a></h1>
        
      </Container>
    </div>
</div>

      )
      :




      (
        <div className="statsPage"> 
      <NavigationComponent title="Facts" />
        <div style={{padding: '25px 10px 0px 10px'}}>
        <Typography variant="caption" color="inherit" style={{float: "left"}}>
          Last Updated: {(new Date()).toLocaleTimeString()}
        </Typography>


        <div style={{marginTop: "4vh"}}></div>
          <Select className="selectFacts"
            placeholder={"General"}
            value={this.state.category}
            onChange={this.handleCategory}
            options={options}
            style={{fontSize: "40vw"}}
          />
       
       <div style={{marginTop: "2vh"}}></div> 

       
      <Container fluid className="container-fluidDesktop">
        <div className="contentWrapper">
       {this.state.general && <div>
         <div className="newsCont">

        <MuiThemeProvider theme={textTheme}>
              <div className="newsCardHeader">
                <Typography variant="h5" color="secondary">
                  What is Covid-Central
                </Typography>
              </div>

              <div className="newsCardBody">
                <Typography variant="body2" color="secondary">
                Covid Central is a data centralization tool that helps cater sources based on your emotion.
                
                </Typography>
              </div>
            </MuiThemeProvider>

            
        </div>
        <div className="newsCont">

        <MuiThemeProvider theme={textTheme}>
              <div className="newsCardHeader">
                <Typography variant="h5" color="secondary">
                  CDC
                </Typography>
              </div>


              <div className="newsCardBody">
                <Typography variant="body2" color="secondary">
                “COVID-19 is caused by a new coronavirus. Coronaviruses are a large family of viruses that are common in people and many different species of animals, including camels, cattle, cats, and bats. Rarely, animal coronaviruses can infect people and then spread between people such as with MERS-Co-V-2. MERS-CoV, SARS-CoV, and now this new virus, names SARS-CoV-2.”  
 
                </Typography>
              </div>
            </MuiThemeProvider>

            
        </div>
        <div className="newsCont">

        <MuiThemeProvider theme={textTheme}>
              <div className="newsCardHeader">
                <Typography variant="h5" color="secondary">
                  Pandemic Declaration 
                </Typography>
              </div>


              <div className="newsCardBody">
                <Typography variant="body2" color="secondary">
                On March 11, the COVID-19 outbreak was characterized as a Pandemic by the World Health Organization. “A pandemic is a global outbreak of disease. Pandemics happen when a new virus emerges to infect people and can spread between people sustainably. Because there is little to no pre-existing immunity against the new virus, it spreads worldwide.”
 
                </Typography>
              </div>
            </MuiThemeProvider>
            

            
        </div>
        
        </div>}
        
       {this.state.masks && <div >
        <div className="cardCont" style={{width: "auto", maxWidth: "35vw"}}><center><img src={typesOfMasks} style={{width: "auto", maxWidth: "30vw", height: "auto"}} alt="Logo" /></center></div>
        <div className="cardCont" style={{width: "auto", maxWidth: "45vw"}}><center><iframe  style={{width: "40vw", height: "50vh"}} src="https://www.youtube.com/embed/Mgp7DSGN33k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/></center></div>
        <div className="cardCont" style={{width: "auto", maxWidth: "45vw"}}><center><iframe style={{width: "40vw", height: "50vh"}} src="https://www.youtube.com/embed/DFt9OuSKsOs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/></center></div>
        
        <div className="cardCont" style={{width: "auto", maxWidth: "35vw"}}><center><img src={dosAndDont} style={{width: "auto", maxWidth: "30vw", height: "auto"}} alt="Logo" /></center></div>
        
        </div>}
       {this.state.socialDistancing && <div>
        <div className="cardCont" style={{width: "auto", maxWidth: "35vw"}}><center><img src={socialDistancing} style={{width: "auto", maxWidth: "30vw", height: "auto"}} alt="Logo" /></center></div>
        <div className="cardCont" style={{width: "auto", maxWidth: "45vw"}}><center><iframe style={{width: "40vw", height: "50vh"}} src="https://www.youtube.com/embed/UMqi0AfLnro" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/></center></div>
        </div>}
       {this.state.hotlines && <div>
        <div className="cardCont">
        <div className="cardCont" style={{width: "auto", maxWidth: "35vw"}}><center><img src={filler} style={{width: "auto", maxWidth: "20vw", height: "auto"}} alt="Logo" /></center></div>
      
       </div>
      </div>}
      </div>
        
      </Container>
      <h1 className="tagCommentary">Service provided by the FSU Innovation Hub <br></br>
      <a style={hub}  className="hubLink" href="https://innovation.fsu.edu/" target="_blank">innovation.fsu.edu</a></h1>
    </div>
</div>
      )
  }
}
export default Commentary;
