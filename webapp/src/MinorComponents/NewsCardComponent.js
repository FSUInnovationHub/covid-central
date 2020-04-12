import React from 'react';
import '../App.css';
import 'react-spinning-wheel/dist/style.css';

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

const textTheme = createMuiTheme({
  palette: {
    primary: { main: "#e91e63", contrastText: "#fff" },
    secondary: { main: "#fff", contrastText: "#000" }
  }
});

class NewsCardComponent extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {
        articles: this.props.articles
    };
  }

  static getDerivedStateFromProps(props, state) {

  }

  render()
  {  
    return (
<div>
{
    this.props.articles.map((article, i) => (
      <div className="newsCont" key={i}>
        <div className="newsCardHeader">
          <Typography variant="h5" color="secondary">
            {article.headline}
          </Typography>
          { 
            article.emotions.map((emo, j) => (
              <Chip size="small" className="emotionChip" label={emo} key={i + j} />
            ))
          }
        </div>

        <hr className="cardDivider" />

        <div className="newsCardBody">
          <Typography variant="body2" color="secondary">
            {article.description}
          </Typography>
        </div>

        <hr className="cardDivider" />

        <MuiThemeProvider theme={textTheme}>
          <div className="newsCardFooter">
            <Button 
                size="small" 
                variant="contained" 
                color="primary" 
                href={article.url} 
                disableElevation>
              {article.datePublished}
            </Button>
            <Typography variant="body2" color="secondary" >
              {article.dateSubmitted}
            </Typography>
          </div>
        </MuiThemeProvider>
      </div>
    ))
}
</div>
    )
  }
}
export default NewsCardComponent;