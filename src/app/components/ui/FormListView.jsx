import React from 'react'
import moment from 'moment';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const lastModified = (date) => {
  return moment(date).format('DD MMM, YYYY');
}
const FormListView = ({source,  handleClick, setCurrentForm, registration_form_id, event_id}) => {
    const onDragStart = (result) => {
        // console.log(document.activeElement);
        document.activeElement.blur();
      }
      const onDragEnd = (result) => {
        // dropped outside the list
        console.log(result);
        if (!result.destination) {
          return;
        }
        const { source, destination } = result;
        // console.log(source, 'source');
        // console.log(destination, 'destination');
        // handleReorder(source, destination);
      }
  return (
    <React.Fragment>
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Droppable style={{width:"100%"}}>
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
                                        <div key={k} className="w-100" style={{height:"120px"}}>
                                        <div className="ebs-form-box d-flex justify-content-between">
                                            <div
                                            onClick={()=>{ setCurrentForm(parseInt(event_id), parseInt(registration_form_id), item.id) }} 
                                            className="ebs-vert-box-image">
                                            <img src={item.screenShot ? item.screenShot : require('img/template.svg') } alt="" />
                                            </div>
                                            <div className="ebs-desc-box w-100">
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
                                                    <div className="ebs-tooltip-item"><i className="material-icons ebs-icon">toggle_on</i>Active</div>
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
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

