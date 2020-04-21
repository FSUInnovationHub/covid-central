import React from 'react';
import '../App.css';
import 'react-spinning-wheel/dist/style.css';

import { Emotions } from '../Shared/Enums'

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';

class FlairFilterComponent extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {
      
        general: 'orange',
        anxiety: '',
        innovation: '',
        curiousity: '',
        factual: '',
        inspiring: '',
    

    };

    this.toggleFilter = this.toggleFilter.bind(this);
  }

  toggleFilter(flair) {
    //unselects all articles to focus on one flair
    if((this.props.flairs["all"] === true) && (flair !== "all"))
    {
      this.setState({all: ''})
      this.props.flairs["all"] = false
    }
    //hides all articles when general selected
    if((this.props.flairs["all"] === false) && (flair === "all"))
    {

      this.setState({all: ''})
      this.props.flairs["anxiety"] = false
      this.props.flairs["innovation"] = false
      this.props.flairs["curiousity"] = false
      this.props.flairs["factual"] = false
      this.props.flairs["inspiring"] = false
      {this.setState({anxiety: '', innovation: '', curiousity: '', factual: '', inspiring: ''})}
      
    }
    //shows all articles when general selected
    if((this.props.flairs["all"] === true) && (flair === "all"))
    {

      this.setState({all: ''})
      this.props.flairs["anxiety"] = false
      this.props.flairs["innovation"] = false
      this.props.flairs["curiousity"] = false
      this.props.flairs["factual"] = false
      this.props.flairs["inspiring"] = false
      {this.setState({anxiety: '', innovation: '', curiousity: '', factual: '', inspiring: ''})}
      
    }
    
    //switch to set the colors of chips
    switch(flair) {
      case 'all':
        if(this.state.general === '')
        {
          this.setState({general: 'orange'})
        }
        else{this.setState({general: ''})}
        break;

      case 'anxiety':
        if(this.state.anxiety === '')
        {
          this.setState({anxiety: '#809CFF'})
        }
        else{this.setState({anxiety: ''})}
        
        this.props.flairs['all'] = false;
        this.setState({general: ''})

        break;
      case 'innovation':
        if(this.state.innovation === '')
        {
          this.setState({innovation: '#A8EAA8'})
        }
        else{this.setState({innovation: ''})}

        this.props.flairs['all'] = false;
        this.setState({general: ''})

        break;
      case 'curiousity':
        if(this.state.curiousity === '')
        {
          this.setState({curiousity: '#FFDF8C'})
        }
        else{this.setState({curiousity: ''})}

        this.props.flairs['all'] = false;
        this.setState({general: ''})

        break;
      case 'factual':
        if(this.state.factual === '')
        {
          this.setState({factual: '#B38710'})
        }
        else{this.setState({factual: ''})}

        this.props.flairs['all'] = false;
        this.setState({general: ''})

        break;
      case 'inspiring':
        if(this.state.inspiring === '')
        {
          this.setState({inspiring: '#A25EE6'})
        }
        else{this.setState({inspiring: ''})}

        this.props.flairs['all'] = false;
        this.setState({general: ''})

        break;

    }
    
    this.props.flairs[flair] = !this.props.flairs[flair];
    this.props.filterFunc(this.props.flairs);
  }

  render()
  {  
    return (

      //refactor to map from the emotions enum
    <div  style={{ marginLeft: "0vw"}}>
      <br></br>
      <Container maxWidth="lg">
        <Chip size="small" style={{backgroundColor: this.state.general, padding: '3vw', marginBottom: '2vw', fontWeight: 'bold', fontSize: '4vw'}}className="emotionChip" label="general" onClick={() => this.toggleFilter("all")}/>
        &nbsp;
        <Chip size="small" style={{backgroundColor: this.state.anxiety, padding: '3vw', marginBottom: '2vw', fontWeight: 'bold', fontSize: '4vw'}} className="emotionChip" label="anxiety" onClick={() => this.toggleFilter("anxiety")} />
        &nbsp;
        <Chip size="small" style={{backgroundColor: this.state.innovation, padding: '3vw', marginBottom: '2vw', fontWeight: 'bold', fontSize: '4vw'}} className="emotionChip" label="innovation" onClick={() => this.toggleFilter("innovation")} />
        <br></br>
        <Chip size="small" style={{backgroundColor: this.state.curiousity, padding: '3vw', marginBottom: '2vw', fontWeight: 'bold', fontSize: '4vw'}} className="emotionChip" label="curiousity" onClick={() => this.toggleFilter("curiousity")} />
        &nbsp;
        <Chip size="small" style={{backgroundColor: this.state.factual, padding: '3vw', marginBottom: '2vw', fontWeight: 'bold', fontSize: '4vw'}} className="emotionChip" label="factual" onClick={() => this.toggleFilter("factual")} />
        &nbsp;
        <Chip size="small" style={{backgroundColor: this.state.inspiring, padding: '3vw', marginBottom: '2vw', fontWeight: 'bold', fontSize: '4vw'}} className="emotionChip" label="inspiring" onClick={() => this.toggleFilter("inspiring")} />
      </Container>
    </div>
    )
  }
}

export default FlairFilterComponent;
