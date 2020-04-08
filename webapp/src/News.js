import React, {useState} from 'react';
import './App.css';
import { css } from "@emotion/core";
import { Redirect } from 'react-router-dom';
import 'react-spinning-wheel/dist/style.css';
import NavigationComponent from './MinorComponents/NavigationComponent'

import * as Util from './Shared/Util.js'
import { Button } from '@material-ui/core';

// icons
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import RefreshIcon from '@material-ui/icons/Refresh';

var articles = [];

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
    <NavigationComponent />
</div>

      )
  }
}
export default NewsPage;
