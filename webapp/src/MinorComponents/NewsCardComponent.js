import React from 'react';
import '../App.css';
import 'react-spinning-wheel/dist/style.css';

class NewsCardComponent extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {
        articles: this.props.articles
    };

    console.log(this.state.articles);
  }

  render()
  {  
    return (
<div>
{
    this.props.articles.map((article, i) => (
      <div className="newsCont" key={i}>
        <span className="cardTitle">{article.headline}</span>
      </div>
    ))
}
</div>
    )
  }
}
export default NewsCardComponent;