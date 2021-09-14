import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '@/Home';
import createForm from '@/createForm';
import Error404 from '@/Error404';
class RouterOutlet extends React.Component {
  render() {
    return (
        <Switch>
          createForm  
          <Route path="/" component={Home} exact/>
          <Route path="/form/create" component={createForm} exact/>
          <Route component={Error404}/>
        </Switch>
    );
  }
}

export default RouterOutlet;
