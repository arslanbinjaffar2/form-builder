import React, { useContext, useState } from 'react'
import moment from 'moment';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FormDataContext } from 'app/contexts/FormDataContext';

const lastModified = (date) => {
  return moment(date).format('DD MMM, YYYY');
}

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result.map((item,index)=>({...item, sort_order:index }));
};

const FormListView = ({source,  handleClick, setCurrentForm, registration_form_id, event_id, setSource, changeStatus}) => {
  const {  saveFormSortBackend, } = useContext(FormDataContext);

   const onDragStart = (result) => {
        document.activeElement.blur();
      }
    const  onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
        const items = reorder(
          source,
          result.source.index,
          result.destination.index
        );
        setSource(items);
        saveFormSortBackend(items);
      }

  return (
    <React.Fragment>
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd} >
            <Droppable style={{width:"100%"}} droppableId="droppablesection" >
                {(provided, snapshot) => (
                    <div 
                    ref={provided.innerRef}    
                    {...provided.droppableProps}
                    >
                    {source && source.map((item,k) => 
                        <Draggable
                            key={`draggable-question-${item.id}`}
                            draggableId={`draggable-question-${item.id}`}
                            index={k}>
                            {(provided, snapshot) => (
                                <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                >
                                         <FormItem 
                                          key={k}
                                          item={item}
                                          handleClick={handleClick}
                                          setCurrentForm={setCurrentForm}
                                          registration_form_id={registration_form_id}
                                          event_id={event_id}
                                          changeStatus={changeStatus}
                                        />
                                    {source && source.length === 0 && <div className='col-md-12'><p>No record found.</p></div>}
                                </div>)}
                        </Draggable>
                                    )}
                    
                    </div>
                )}
            </Droppable>
                          
    </DragDropContext>
    </React.Fragment>
  )
}

export default FormListView


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
    <div  className="w-100" style={{height:"120px"}}>
                                        <div className="ebs-form-box d-flex justify-content-between">
                                            <div
                                            onClick={()=>{ setCurrentForm(parseInt(event_id), parseInt(registration_form_id), item.id) }} 
                                            className="ebs-vert-box-image">
                                            <img src={item.screenShot ? item.screenShot : require('img/template.svg') } alt="" />
                                            </div>
                                            <div className="ebs-desc-box w-100">
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
                                                    <div className="ebs-tooltip-item" onClick={() =>setRename(!rename)}><i className="material-icons ebs-icon">text_fields</i>Rename</div>
                                                    <div className="ebs-tooltip-item" onClick={() =>onCopyForm()} ><i className="material-icons ebs-icon">content_copy</i>Copy</div>
                                                    <div className="ebs-tooltip-item" onClick={() =>onDeleteForm()} ><i className="material-icons ebs-icon">delete_outline</i>Delete</div>
                                                    <div className="ebs-tooltip-item" onClick={() =>changeStatus({form_id:item.id, status:!item.active})}><i className="material-icons ebs-icon">{item.active == 0 ? 'toggle_on' : 'toggle_off'}</i>{item.active == 0 ? 'Activate' : 'Deactivate'}</div>
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
  )
}

