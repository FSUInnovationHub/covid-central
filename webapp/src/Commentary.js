import React from 'react';
import './App.css';
import 'react-spinning-wheel/dist/style.css';
import { TwitterTimelineEmbed  } from 'react-twitter-embed';
import NavigationComponent from './MinorComponents/NavigationComponent'
import { Container } from 'react-bootstrap';
import Select from 'react-select'

//options of reliable twitter users to render
const options = [{
  label: "Public Health",
  options: [
    { value: 'WHO', label: 'World Health Organization'},
    { value: 'CDCgov', label: 'Center For Disease Control'},
    { value: 'US_FDA', label: 'Food and Drug Administration'},
    { value: 'Surgeon_General', label: 'US Surgeon General'},
  ]
},
{
  label: "News Sources",
  options: [
    { value: 'ABC', label: 'ABC'},
    { value: 'AP', label: 'AP'},
    { value: 'axios', label: 'Axios'},
    { value: 'business', label: 'Bloomberg'},
    { value: 'businessinsider', label: 'Business Insider'},
    { value: 'CBSNews', label: 'CBS'},
    { value: 'CNN', label: 'CNN'},
    { value: 'FoxNews', label: 'FOX'},
    { value: 'googlenews', label: 'Google News'},
    { value: 'MSNBC', label: 'MSNBC'},
    { value: 'NBCNews', label: 'NBC'},
    { value: 'Reuters', label: 'Reuters'},
    { value: 'TechCrunch', label: 'Tech Crunch'},
    { value: 'techradar', label: 'Tech Radar'},
    { value: 'TIME', label: 'TIME'},
    { value: 'USATODAY', label: 'USA Today'},
    { value: 'WSJ', label: 'Wall Street Journal'},
  ]
},
];

const hub = {color: '#eac45f'};

class Commentary extends React.Component { 

  constructor() {
    super();
    this.state = {
      twitterHandle: "WHO",
      username: "WHO",
      change: false, 

    };
  }
  
  handleTwitterHandle = twitterHandle => {
    //sets state for the twitter user being queried 
    //the change boolean MUST be here to ensure a pseudo rerender without losing the option being selected
    if(this.state.change === true)
    {
      this.setState({
        twitterHandle,
        username: twitterHandle['value'],
        change: false})
    }
    else{
      this.setState({
        twitterHandle,
        username: twitterHandle['value'],
        change: true,
      })
    }
  }

  render()
  {  
    return (   
    <div> 
      <NavigationComponent title="Commentary" />
      <div className="factsCardContainer">
        <div className="noscroll" style={{padding: '25px 0px 0px 10px'}}>
          <Container fluid>
            <div>
              <div style={{marginTop: "6vh"}}></div>
              <Select className="selectUser"
                placeholder={"World Health Organization"}
                value={this.state.twitterHandle}
                onChange={this.handleTwitterHandle}
                options={options}
                style={{fontSize: "40vw"}}
              />
              <div style={{marginTop: "2vh"}}></div> 
              <div className="commentaryCont">
                {/*triggers rerender. MUST be here. won't work with simply changing the screename*/}
                {this.state.change === false && <TwitterTimelineEmbed
                  sourceType="profile"
                  screenName={this.state.username}
                  options={{height: "500px"}}
                />}
                {this.state.change === true && <TwitterTimelineEmbed
                  sourceType="profile"
                  screenName={this.state.username}
                  options={{height: "500px"}}
                />}
              </div>
              <h1 className="tagCommentary">Service provided by the FSU Innovation Hub <br></br>
              <a  className="tagCommentary" style={hub} href="https://innovation.fsu.edu/" target="_blank" rel="noopener noreferrer">innovation.fsu.edu</a></h1>
            </div> 
          </Container>
        </div>
      </div>
    </div>
    )
  }
}
export default Commentary;