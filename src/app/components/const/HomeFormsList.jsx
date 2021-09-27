import React, {useState,useEffect, useContext }  from 'react';
import { FormDataContext } from 'app/contexts/FormDataContext';
import moment from 'moment';

const lastModified = (date) => {
  return moment(date).format('DD MMM, YYYY');
}
const HomeFormsList = () => {
  const { data } = useContext(FormDataContext);
  const [stateData, setstateData] = useState(null);
  useEffect( () => {
    setstateData(data);
  })
  
    return (
      <React.Fragment>
        {!stateData && <div>Loading...</div>}
        {stateData && <div className="ebs-all-forms">
          <div className="ebs-top-panel">
            <div className="container">
            <div className="row d-flex">
              <div className="col-4">
                <h4>All forms</h4>
              </div>
              <div className="col-8 d-flex justify-content-end">
                <div className="ebs-panel">
                  <span className="ebs-btn">
                    <img src={require('img/ico-list.svg')} alt="" />
                  </span>
                  <span className="ebs-btn">
                    <img src={require('img/ico-search.svg')} alt="" />
                  </span>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className="ebs-form-list">
            <div className="container">
              <div className="row d-flex align-items center">
                {stateData.map((item,k) => 
                  <div key={k} className="col-lg-3 col-md-4">
                    <div className="ebs-form-box">
                      <div className="ebs-box-image">
                        <img src={item.screenShot ? item.screenShot : require('img/template.svg') } alt="" />
                      </div>
                      <div className="ebs-desc-box">
                        <h3>{item.title ? item.title : 'Untitled form'}</h3>
                        <div className="ebs-bottom-panel">
                          <div className="ebs-timedate">
                          <span style={{color: 'rgba($black,0.1)'}} className="material-icons">description</span>
                          Opened {lastModified(item.lastModified)}</div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>}
     </React.Fragment>
    )
}

export default HomeFormsList
