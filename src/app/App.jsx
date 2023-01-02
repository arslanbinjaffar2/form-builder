import React, {useEffect} from 'react';
import RouterOutlet from 'router/RouterOutlet.jsx';
import {withRouter} from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap';
import FormDataContextProvider from './contexts/FormDataContext';
import CreateQuestionContextProvider from './contexts/CreateQuestionContext';

const App = (props) => {
  useEffect(() => {
   let unlisten = props.history.listen((location, action) => {
      if (window && window.parent) {
        window.parent.postMessage(location.pathname, REACT_APP_EVENTCENTER_URL);
      }
    });
  
    return () => {
      unlisten();
    }
  }, []);
  
  return (
    <div id="App">
    <FormDataContextProvider>
      <CreateQuestionContextProvider>
        <RouterOutlet />
      </CreateQuestionContextProvider>
    </FormDataContextProvider>
  </div>
  )
}

export default withRouter(App);
