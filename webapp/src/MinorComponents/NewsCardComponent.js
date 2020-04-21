import React from 'react';
import '../App.css';
import 'react-spinning-wheel/dist/style.css';

import FlairFilterComponent from './FlairFilterComponent'

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import CardsArray from '../CardsArray';


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
        articles: this.props.articles,
        filterNeeded: this.props.filter,
        filters: {
          "all": true,
          "anxiety": false,
          "innovation": false,
          "curiousity": false,
          "factual": false,
          "inspiring": false
        }
    };

    this.filterNews = this.filterNews.bind(this);
  }

  filterNews(items) {
    this.setState({ filter: items });
  }

  componentDidUpdate() {
    
  }

  render()
  {  
    this.props.articles.sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));

    var state = this.state;

    return (
<div>
  {this.state.filterNeeded === true && <div> <FlairFilterComponent flairs={this.state.filters} filterFunc={this.filterNews} /> </div>}
{
    this.props.articles.filter(function (article) {
      var changed = false;
      var filtered = false;
      var filters = state.filters;
      
      article.emotions.forEach(function(emo) {
        if (filters[emo] === true) {
          filtered = true;
        }
      })

      // bugged
      if (changed = true)
      {
        return filtered
      }
    
    }).map((article, i) => (
      
      <div className="newsCont" key={i}>
        
        <div className="newsCardHeader">
          <Typography variant="h5" color="secondary">
            {article.headline}
          </Typography>
          { 
            article.emotions.sort().map((emo, j) => (
              <div key={"chip"+j}>
                {/*added "all" invisible chip to every resource*/}
                
                {emo === "anxiety" && <Chip size="small" style={{backgroundColor:'#809CFF', fontWeight: 'bold'}} className="emotionChip" label={emo} key={i + j} />}
                {emo === "innovation" && <Chip size="small" style={{backgroundColor:'#A8EAA8', fontWeight: 'bold'}} className="emotionChip" label={emo} key={i + j} />}
                {emo === "curiousity" && <Chip size="small" style={{backgroundColor:'#FFDF8C', fontWeight: 'bold'}} className="emotionChip" label={emo} key={i + j} />}
                {emo === "factual" && <Chip size="small" style={{backgroundColor:'#B38710', fontWeight: 'bold'}} className="emotionChip" label={emo} key={i + j} />}
                {emo === "inspiring" && <Chip size="small" style={{backgroundColor:'#A25EE6', fontWeight: 'bold'}} className="emotionChip" label={emo} key={i + j} />}
              </div>
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
                target="_blank"
                href={article.url} 
                disableElevation>
              {article.source}
            </Button>
            <Typography variant="body2" color="secondary" >
             {article.datePublished}
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