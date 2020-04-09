import React from 'react';
import './App.css';
import 'react-spinning-wheel/dist/style.css';

import NavigationComponent from './MinorComponents/NavigationComponent'

// icons

//var articles = [];

class NewsPage extends React.Component { 

  constructor() {
    super();
    this.state = {

    };
  }
  
  componentDidMount() {

  }

  render()
  {  
    return (   

<div className="newsContainer"> 
    <NavigationComponent title="News" />

    <div style={{marginTop: '40px'}}>

    </div>
</div>

      )
  }
}
export default NewsPage;
