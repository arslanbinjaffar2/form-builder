import * as React from 'react';
import RouterOutlet from 'router/RouterOutlet.jsx';
import {withRouter} from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap';
import FormDataContextProvider from './contexts/FormDataContext';
import CreateQuestionContextProvider from './contexts/CreateQuestionContext';
class App extends React.Component {
  render() {
    return (
      <div id="App">
        <FormDataContextProvider>
          <CreateQuestionContextProvider>
            <RouterOutlet />
          </CreateQuestionContextProvider>
        </FormDataContextProvider>
      </div>
    );
  }
}

export default withRouter(App);
