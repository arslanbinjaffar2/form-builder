import React, {useState, useContext} from 'react'
import moment from 'moment';
import { FormDataContext } from 'app/contexts/FormDataContext';

const lastModified = (date) => {
  return moment(date).format('DD MMM, YYYY');
}
const FormGridView = ({source,  handleClick, setCurrentForm, registration_form_id, event_id, changeStatus}) => {

  return (
    <React.Fragment>
      {source && source.map((item,k) => 
        <FormItem 
          key={k}
          item={item}
          handleClick={handleClick}
          setCurrentForm={setCurrentForm}
          registration_form_id={registration_form_id}
          event_id={event_id}
          changeStatus={changeStatus}
        />
      )}
      {source && source.length === 0 && <div className='col-md-12'><p>No record found.</p></div>}
    </React.Fragment>
  )
}

export default FormGridView


const FormItem = ({item, setCurrentForm, event_id, registration_form_id, changeStatus, handleClick}) => {
  const { saveFormTitle, copyForm, deleteForm } = useContext(FormDataContext);
  const [title, setTitle] = useState(item.title);
  const [rename, setRename] = useState(false);

  const onTitleChange = (event) =>{
    console.log(event);
    if(event.keyCode === 13){
        saveFormTitle({form_id:item.id, title:title}, () => (setRename(!rename)));
    }
  }

  const onCopyForm = () => {
    copyForm({form_id:item.id})
  }
  const onDeleteForm = () => {
    deleteForm({form_id:item.id})
  }

  return (
    <div className="col-lg-3 col-md-4">
          <div className="ebs-form-box">
            <div
              onClick={()=>{ setCurrentForm(parseInt(event_id), parseInt(registration_form_id), item.id) }} 
              className="ebs-box-image">
              <img src={item.screenShot ? item.screenShot : require('img/template.svg') } alt="" />
            </div>
            <div className="ebs-desc-box">
              {rename === false ? <h3>{item.title ? item.title : 'Untitled form'}</h3> :
              <input type="text" value={title}  onChange={(e)=> setTitle(e.target.value)}  onKeyDown={onTitleChange} />}
              <div className="ebs-bottom-panel d-flex align-items-center">
                <div className="ebs-timedate d-flex align-items-center w-100">
                <span style={{color: 'rgba($black,0.1)'}} className="material-icons">description</span>
                Opened {lastModified(item.updated_at)}</div>
                <div className="ebs-more-option-panel ebs-option-panel-medium ico-visible">
                  <button onClick={handleClick} className="ebs-btn tooltip-small">
                    <span style={{pointerEvents: 'none'}} className="material-icons">more_vert</span>
                  </button>
                  <div className="ebs-app-tooltip">
                    <div className="ebs-tooltip-item"  onClick={() =>setRename(!rename)}><i className="material-icons ebs-icon">text_fields</i>{rename ? 'Renaming' : 'Rename'}</div>
                    <div className="ebs-tooltip-item" onClick={() => onCopyForm() } ><i className="material-icons ebs-icon">content_copy</i>Copy</div>
                    <div className="ebs-tooltip-item" onClick={() => onDeleteForm() } ><i className="material-icons ebs-icon">delete_outline</i>Delete</div>
                    <div className="ebs-tooltip-item" onClick={() =>changeStatus({form_id:item.id, status:!item.active})}><i className="material-icons ebs-icon">{item.active == 0 ? 'toggle_on' : 'toggle_off'}</i>{item.active == 0 ? 'Activate' : 'Deactivate'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}