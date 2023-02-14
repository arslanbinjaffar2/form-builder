import React, {useState,useEffect, useContext }  from 'react';
import { FormDataContext } from 'app/contexts/FormDataContext';
import moment from 'moment';

const lastModified = (date) => {
  return moment(date).format('DD MMM, YYYY');
}
const HomeFormsList = (props) => {
  const { data, getForms, processing, cancelAllRequests, setCurrentForm } = useContext(FormDataContext);
  const [source, setsource] = useState(null)

  useEffect(() => {
    getForms(parseInt(props.event_id), parseInt(props.registration_form_id));
    return () => {
          cancelAllRequests();
    }
  }, []);


  useEffect(() => {
    setsource(data);
  }, [data]);



  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.value;
    if (query === '') {
      setsource(data);
    } else {
      const searchList = data.slice().filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
      if (searchList) {
        setsource(searchList);
      }
    }
  }
    return (
      <React.Fragment>
        {data.length <= 0 && processing && 
        <div className="ebs-loader-backdrop">
          <div className="ebs-loader-wrapper">
            <div className="ebs-loader"></div>
          </div>
        </div>
      }
        {data && !processing && <div className="ebs-all-forms">
          <div className="ebs-top-panel">
            <div className="container">
            <div className="row d-flex">
              <div className="col-4">
                <h4>All forms</h4>
              </div>
              <div className="col-8 d-flex justify-content-end">
                <div className="ebs-panel">
                  <div className="ebs-more-option-panel ebs-option-panel-medium">
                    <button className="ebs-btn tooltip-small">
                      <img src={require('img/ico-list.svg')} alt="" />
                    </button>
                    <div className="ebs-app-tooltip">
                      <div className="ebs-tooltip-item ebs-active"><i className="material-icons ebs-icon">check</i>Sort by name</div>
                      <div className="ebs-tooltip-item">Sort by date</div>
                      <div className="ebs-tooltip-item">Sort by name</div>
                    </div>
                  </div>
                  <label className="ebs-btn">
                    <img src={require('img/ico-search.svg')} alt="" />
                    <input placeholder=' ' type="text" onChange={handleSearch} />
                  </label>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className="ebs-form-list">
            <div className="container">
              <div className="row d-flex align-items center">
                {source && source.map((item,k) => 
                  <div key={k} className="col-lg-3 col-md-4" onClick={()=>{ setCurrentForm(parseInt(props.event_id), parseInt(props.registration_form_id), item.id) }}>
                    <div className="ebs-form-box">
                      <div className="ebs-box-image">
                        <img src={item.screenShot ? item.screenShot : require('img/template.svg') } alt="" />
                      </div>
                      <div className="ebs-desc-box">
                        <h3>{item.title ? item.title : 'Untitled form'}</h3>
                        <div className="ebs-bottom-panel">
                          <div className="ebs-timedate">
                          <span style={{color: 'rgba($black,0.1)'}} className="material-icons">description</span>
                          Opened {lastModified(item.updated_at)}</div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {source && source.length === 0 && <div className='col-md-12'><p>No record found.</p></div>}
              </div>
            </div>
          </div>
        </div>}
     </React.Fragment>
    )
}

export default HomeFormsList
