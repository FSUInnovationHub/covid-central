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
    { value: 'Reuters', label: 'Reuters'},
    { value: 'NewYorker', label: 'The New Yorker'},
    { value: 'CBSNews', label: 'CBS'},
    { value: 'CNN', label: 'CNN'},
    { value: 'BBCWorld', label: 'BBCWorld'},
    { value: 'CNNbrk', label: 'CNN Breaking News'},
    { value: 'MSNBC', label: 'MSNBC'},
  ]
},
];

const topTenOptionsState = [
  
  
]
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
  
  componentDidMount() {
    
    
  }
  handleTwitterHandle = twitterHandle => {
    //sets states for the individual state being queried
    if(this.state.change === true)
    {
      this.setState({twitterHandle,
        username: twitterHandle['value'], change: false})
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

    <div style={{padding: '25px 10px 25px 10px'}}>
      <Typography variant="caption" color="inherit" style={{float: "left"}}>
        Last Updated: {(new Date()).toLocaleTimeString()}
      </Typography>
      <Container fluid>
      
      <div style={{marginTop: "6vh"}}></div>
      <Select className="selectUser"
            placeholder={"World Health Organization"}
            value={this.state.twitterHandle}
            onChange={this.handleTwitterHandle}
            options={options}
            style={{fontSize: "40vw"}}
          />
       <div style={{marginTop: "2vh"}}></div> 
       
      {this.state.change === false && <TwitterTimelineEmbed
  sourceType="profile"
  screenName={this.state.username}
  options={{height: "64vh"}}
    />}
    {this.state.change === true && <TwitterTimelineEmbed
  sourceType="profile"
  screenName={this.state.username}
  options={{height: "64vh"}}
    />}
        
        <h1 className="tagCommentary">Service provided by the FSU Innovation Hub <br></br>
         <a style={hub} href="https://innovation.fsu.edu/" target="_blank">innovation.fsu.edu</a></h1>
      </Container>


    </div>

</div>

      )
  }
}
export default Commentary;
