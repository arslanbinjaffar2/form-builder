import * as React from 'react';
import { Link } from "react-router-dom";
import AppNavbar from '@/AppNavbar';
import HomeFormsList from './const/HomeFormsList';

class Home extends React.Component {

  render() {

    return (
     <React.Fragment>
      <AppNavbar />
      <main className="ebs-main" role="main">
        <div className="ebs-template-box">
          <div className="container">
          <div className="ebs-form-title">Start a new form</div>
          <div className="row d-flex">
            <div className="col-2">
              <Link to="/form/create" className="ebs-btn-add"></Link>
              <div className="ebs-add-new">Blank</div>
            </div>
          </div>
          </div>
        </div>
        <HomeFormsList />
      </main>
     </React.Fragment> 
    );
  }
}

export default Home;
