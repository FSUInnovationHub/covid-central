import React from 'react';
import '../App.css';
import 'react-spinning-wheel/dist/style.css';

import { Emotions } from '../Shared/Enums'

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

class FlairFilterComponent extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {

    };

    this.toggleFilter = this.toggleFilter.bind(this);
  }

  toggleFilter(flair) {
    this.props.flairs[flair] = !this.props.flairs[flair];

    this.props.filterFunc(this.props.flairs);
  }

  render()
  {  
    return (

//refactor to map from the emotions enum
<div style={{ display: "flex", justifyContent: "center", marginTop: "3vh" }} >
    <Chip size="small" className="emotionChip" label="anxiety" onClick={() => this.toggleFilter("anxiety")} />
    <Chip size="small" className="emotionChip" label="innovation" onClick={() => this.toggleFilter("innovation")} />
    <Chip size="small" className="emotionChip" label="curiousity" onClick={() => this.toggleFilter("curiousity")} />
    <Chip size="small" className="emotionChip" label="factual" onClick={() => this.toggleFilter("factual")} />
    <Chip size="small" className="emotionChip" label="inspiring" onClick={() => this.toggleFilter("inspiring")} />
</div>

        )
  }
}

export default FlairFilterComponent;
