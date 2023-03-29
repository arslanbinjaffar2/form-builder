import React from 'react'
import moment from 'moment';
const lastModified = (date) => {
  return moment(date).format('DD MMM, YYYY');
}
const FormGridView = ({source,  handleClick, setCurrentForm, registration_form_id, event_id, changeStatus}) => {
  return (
    <React.Fragment>
      {source && source.map((item,k) => 
        <div key={k} className="col-lg-3 col-md-4">
          <div className="ebs-form-box">
            <div
              onClick={()=>{ setCurrentForm(parseInt(event_id), parseInt(registration_form_id), item.id) }} 
              className="ebs-box-image">
              <img src={item.screenShot ? item.screenShot : require('img/template.svg') } alt="" />
            </div>
            <div className="ebs-desc-box">
              <h3>{item.title ? item.title : 'Untitled form'}</h3>
              <div className="ebs-bottom-panel d-flex align-items-center">
                <div className="ebs-timedate d-flex align-items-center w-100">
                <span style={{color: 'rgba($black,0.1)'}} className="material-icons">description</span>
                Opened {lastModified(item.updated_at)}</div>
                <div className="ebs-more-option-panel ebs-option-panel-medium ico-visible">
                  <button onClick={handleClick} className="ebs-btn tooltip-small">
                    <span style={{pointerEvents: 'none'}} className="material-icons">more_vert</span>
                  </button>
                  <div className="ebs-app-tooltip">
                    <div className="ebs-tooltip-item"><i className="material-icons ebs-icon">text_fields</i>Rename</div>
                    <div className="ebs-tooltip-item"><i className="material-icons ebs-icon">content_copy</i>Copy</div>
                    <div className="ebs-tooltip-item"><i className="material-icons ebs-icon">delete_outline</i>Delete</div>
                    <div className="ebs-tooltip-item" onClick={() =>changeStatus({form_id:item.id, status:!item.active})}><i className="material-icons ebs-icon">{item.active == 0 ? 'toggle_off' : 'toggle_on'}</i>{item.active == 0 ? 'Inactive' : 'Active'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {source && source.length === 0 && <div className='col-md-12'><p>No record found.</p></div>}
    </React.Fragment>
  )
}

export default FormGridView