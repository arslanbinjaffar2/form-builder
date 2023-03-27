import React, {useEffect, useContext, useState }  from 'react';
import { FormDataContext } from 'app/contexts/FormDataContext';
import moment from 'moment';
import FormGridView from '../ui/FormGridView';
import FormListView from '../ui/FormListView';


const HomeFormsList = (props) => {
  const { data, getForms, processing, cancelAllRequests, setCurrentForm } = useContext(FormDataContext);
  const [source, setSource] = useState(null)
  const [listView, setListView] = useState(false);

  useEffect(() => {
    getForms(parseInt(props.event_id), parseInt(props.registration_form_id));
    return () => {
          cancelAllRequests();
    }
  }, []);


  useEffect(() => {
    setSource(data);
  }, [data]);


  useEffect(() => {
    document.body.addEventListener('click',onBodyClick, false);
    return () => {
      document.body.removeEventListener('click',onBodyClick, false);
    }
  }, [])
  const onBodyClick = (e) => {
    var _tooltip = document.querySelectorAll('.ebs-more-option-panel .ebs-btn');
    if (_tooltip) {
      _tooltip.forEach(item => {
        item.classList.remove('ebs-btn-active');
      })
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const _window = window.innerWidth;
    e.target.classList.toggle('ebs-btn-active');
    const _rect = e.target.getBoundingClientRect();
    const _left = Math.round((_window - _rect.left) - 340);
    const _wHeight = window.innerHeight;
    const _position = _wHeight - (_rect.top + 168);
    if (_left <= 0) {
      e.target.classList.add('ebs-position-left');
    } else {
      e.target.classList.remove('ebs-position-left');
    }
    if (_position <= 0 ) {
      e.target.classList.add('ebs-position-top');
    } else {
      e.target.classList.remove('ebs-position-top'); 
    }
  }
  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.value;
    if (query === '') {
      setSource(data);
    } else {
      const searchList = data.slice().filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
      if (searchList) {
        setSource(searchList);
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
            <div className="row d-flex align-items-center">
              <div className="col-4">
                <h4>All forms</h4>
              </div>
              <div className="col-8 d-flex justify-content-end">
                <div className="ebs-panel">
                  <div className="ebs-more-option-panel ebs-option-panel-medium">
                    <button onClick={()=> { 
                      if(!listView){
                        setSource(data);
                      }
                      setListView(!listView)
                     }} className="ebs-btn tooltip-small">
                      <img style={{pointerEvents: 'none'}} src={require('img/ico-list.svg')} alt="" />
                    </button>
                    {/* <div className="ebs-app-tooltip">
                      <div className="ebs-tooltip-item ebs-active"><i className="material-icons ebs-icon">check</i>Sort by name</div>
                      <div className="ebs-tooltip-item">Sort by date</div>
                      <div className="ebs-tooltip-item">Sort by name</div>
                    </div> */}
                  </div>
                  {!listView && <label className="ebs-btn">
                    <img src={require('img/ico-search.svg')} alt="" />
                    <input placeholder=' ' type="text" onChange={handleSearch} />
                  </label>}
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className="ebs-form-list">
            <div className="container">
              <div className={`row d-flex align-items center ${listView ? 'list-view' : ''}`}>
                {!listView ? <FormGridView source={source}  handleClick={handleClick} setCurrentForm={setCurrentForm} registration_form_id={props.registration_form_id} event_id={props.event_id} />
                 : <FormListView source={source} setSource={setSource}  handleClick={handleClick} setCurrentForm={setCurrentForm} registration_form_id={props.registration_form_id} event_id={props.event_id} />}
                </div>
            </div>
          </div>
        </div>}
     </React.Fragment>
    )
}

export default HomeFormsList
