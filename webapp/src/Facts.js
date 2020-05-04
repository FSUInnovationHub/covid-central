import React from 'react';
import './App.css';
import 'react-spinning-wheel/dist/style.css';
import NavigationComponent from './MinorComponents/NavigationComponent'
import { Container } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import dosAndDont from './Content/dosAndDont.jpg'
import typesOfMasks from './Content/typesOfMasks.png'
import socialDistancing from './Content/socialDistancing.jpg'
import hotlines from "./Content/hotlines.PNG"

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

  render()
  {  
    return (   
        <div className="statsPage">  
          <NavigationComponent title="Facts" />
          <div style={{marginTop: "4vh"}}></div>
          <Container fluid>
              <div className="flexRow"> 
                <div className="factsCont">
                  <MuiThemeProvider theme={textTheme}>
                    <div className="newsCardHeader">
                      <Typography variant="h5" color="secondary">
                        <center>Covid-Central</center>
                      </Typography>
                    </div>
                    <hr className="cardDivider" />
                    <div className="newsCardBody">
                      <Typography variant="body2" color="secondary">
                        Covid-Central is a data centralization tool that hosts reliable information regarding the outbreak of the COVID-19 virus.
                        We provide you five pages (Facts, Stats, News, Resources, and Commentary). 
                        <br></br>
                        <br></br>
                        Each of these pages has been designed to serve you with a specific subset of data. Some of these pages allow you to comb through its 
                        contents using emotion "flairs". When a flair is activated, all articles or resources that pertain to that flair will appear. 
                        <br></br>
                        <br></br>
                        This was done in an effort to succintly provide you the type of content 
                        that you would like to see. Although a lot of the pages are automated and update themselves, the articles and resources that have an emotion 
                        "flair" have been carefully hand picked by our research team. We hope that you enjoy your experience and if you have any questions please email
                        <br></br>
                        <br></br>
                        
                      </Typography>
                      <Typography variant="header1" color="secondary">
                        info@innovation.fsu.edu
                      </Typography>
                    </div>
                  </MuiThemeProvider>  
                </div>

                <div className="factsCont">
                  <MuiThemeProvider theme={textTheme}>
                    <div className="newsCardHeader">
                      <Typography variant="h5" color="secondary">
                        Background Information (CDC)
                      </Typography>
                    </div>
                    <hr className="cardDivider" />
                    <div className="newsCardBody">
                      <Typography variant="body2" color="secondary">
                        “COVID-19 is caused by a new coronavirus. Coronaviruses are a large family of viruses that are common in people and many different species of animals, including camels, cattle, cats, and bats. Rarely, animal coronaviruses can infect people and then spread between people such as with MERS-Co-V-2. MERS-CoV, SARS-CoV, and now this new virus, names SARS-CoV-2. 
                        <br></br>
                        <br></br>
                        Early on, many of the patients at the epicenter of the outbreak in Wuhan, Hubei Province, China had some link to a large seafood and live animal market, suggesting animal-to-person spread. Later, a growing number of patients reportedly did not have exposure to animal markets, indicating person-to-person spread. 
                        Person-to-person spread was subsequently reported outside Hubei and in countries outside China, including in the United States. Most international destinations now have ongoing community spread with the virus that causes COVID-19, as does the United States. Community spread means some people have been infected and 
                        it is not known how or where they became exposed."
                        <br></br>
                        <br></br>
                        <a href="https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/summary.html" target="_blank" rel="noopener noreferrer"><Typography variant="body2" color="secondary" style={{color: "#7da4ff"}} >Learn More</Typography></a>
                      </Typography>
                    </div>
                  </MuiThemeProvider>
                </div>

                <div className="factsCont">
                  <MuiThemeProvider theme={textTheme}>
                    <div className="newsCardHeader">
                      <Typography variant="h5" color="secondary">
                        Pandemic Declaration (WHO)
                      </Typography>
                    </div>
                    <hr className="cardDivider" />
                    <div className="newsCardBody">
                      <Typography variant="body2" color="secondary">
                        On March 11, the COVID-19 outbreak was characterized as a Pandemic by the World Health Organization. 
                        <br></br>
                        <br></br>
                        A pandemic is a global outbreak of disease. Pandemics happen when a new virus emerges to infect people and can spread between people sustainably. Because there is little to no pre-existing immunity against the new virus, it spreads worldwide.
                        <br></br>
                        <br></br>
                        <a href="https://www.who.int/dg/speeches/detail/who-director-general-s-opening-remarks-at-the-media-briefing-on-covid-19---11-march-2020" target="_blank" rel="noopener noreferrer"><Typography variant="body2" color="secondary" style={{color: "#7da4ff"}} >Learn More</Typography></a>
                      </Typography>
                    </div>
                  </MuiThemeProvider> 
                </div>
                <div className="cardCont"><img src={typesOfMasks} alt="types of masks graphic" /></div>
                <div className="cardCont"><img src={dosAndDont}  alt="dos and donts graphic" /></div>
                <div className="cardCont"><iframe title="no sew mask video tutorial" src="https://www.youtube.com/embed/Mgp7DSGN33k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/></div>
              <div className="cardCont"><iframe title="sew mask video tutorial" src="https://www.youtube.com/embed/DFt9OuSKsOs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/></div>
                <div style={{marginTop: "3vh"}}></div> 
                <div className="cardCont"><img src={socialDistancing} alt="social distancing graphic" /></div>
                <div className="cardCont"><iframe title="power of social distancing video" src="https://www.youtube.com/embed/UMqi0AfLnro" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/></div>
                <div className="cardCont"><img src={hotlines} alt="hotlines graphic" /></div>
              </div>
            
              <h1 className="tagFacts">Service provided by the FSU Innovation Hub <br></br>
              <a  className="tagFacts" style={hub} href="https://innovation.fsu.edu/" target="_blank" rel="noopener noreferrer">innovation.fsu.edu</a></h1>  
            
          </Container>
        </div>
      )
     
  }
}
export default Commentary;