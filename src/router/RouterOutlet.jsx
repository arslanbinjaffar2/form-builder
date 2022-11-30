import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '@/Home';
import createForm from '@/createForm';
import viewForm from '@/viewForm';
import Error404 from '@/Error404';
class RouterOutlet extends React.Component {
  render() {
    return (
        <Switch>
          <Route path="/:event_id/:registration_form_id" component={Home} exact/>
          <Route path="/:event_id/:registration_form_id/form/update/:id" component={createForm} exact/>
          <Route path="/:event_id/:registration_form_id/form/update/:id/view" component={viewForm} exact/>
          <Route component={Error404}/>
        </Switch>
    );
  }
}

export default RouterOutlet;
