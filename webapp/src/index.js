import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import * as serviceWorker from './serviceWorker';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Temp from './Temp'
import Stats from './Stats'
import Launch from './Launch'
import NewsPage from './News'
import CardsArray from './CardsArray'

/*using react router we set a constant equal to whatever component
we would like to render*/
const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={Launch}/>
      <Route exact path="/launch" component={Launch}/>
      <Route exact path="/stats" component={Stats}/>
      <Route exact path="/news" component={NewsPage}/>
      <Route exact path="/CardsArray" component={CardsArray} />
      <Route exact path="/*" exact component={Temp} />
    </Switch>
  </Router>
)

/*the code below reads the path and renders component on a conditional basis.
i.e. /home throws two different components at different places...*/
ReactDOM.render(routing, document.getElementById("root"));
serviceWorker.unregister();
