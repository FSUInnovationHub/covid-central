import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import * as serviceWorker from './serviceWorker';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Stats from './Stats'
import Launch from './Launch'
import NewsPage from './News'
import Resources from './Resources'
import Commentary from './Commentary';
import Facts from './Facts';
import StatesGraph from './MinorComponents/StatesGraph'



/*using react router we set a constant equal to whatever component
we would like to render*/
const routing = (
  <Router>
    <Switch>
      <Route exact path="/facts" component={Facts}/>
      <Route exact path="/stats" component={Stats}/>
      <Route exact path="/news" component={NewsPage}/>
      <Route exact path="/resources" component={Resources}/>
      <Route exact path="/commentary" component= {Commentary} />
      <Route exact path="/graph" component= {StatesGraph} />
      <Route exact path="/*" component={Launch}/>  
    </Switch>
  </Router>
)

/*the code below reads the path and renders component on a conditional basis.
i.e. /home throws two different components at different places...*/
ReactDOM.render(routing, document.getElementById("root"));
serviceWorker.unregister();
