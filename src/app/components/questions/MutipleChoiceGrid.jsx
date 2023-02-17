import React, { Component, useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CreateQuestionContext } from 'app/contexts/CreateQuestionContext';
import SaveBtn from "@/ui/SaveBtn";

const ContentBox = ({data,active,onDrag,index,type,onChange,parentType,sectionIndex, questionIndex}) => {
  return (
   <DragDropContext onDragEnd={onDrag}>
    <Droppable droppableId={type === 'rows' ? 'rows_items' : 'columns_items'}>
    {(provided, snapshot) => (
      <div {...provided.droppableProps} ref={provided.innerRef}>
        {data && data.map((items,k) =>
        <Draggable
          isDragDisabled={!active}
          key={k}
          draggableId={`element-list-${k}`}
            index={k}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps}> 
                  <div className={`ebs-list-box d-flex ${data.length === 1 ? 'non-draggable' : ''}`}>
                  <div className="ebs-list-drag"{...provided.dragHandleProps}><span className="material-icons">drag_indicator</span></div>
                    
                    {type === 'rows' && <div className="ebs-counter">{k+1}.</div>}
                    {type === 'columns' && <div className="ebs-icon-box">
                      <i className="material-icons">{parentType === 'multiple_choice_grid' ? 'radio_button_unchecked' : parentType === 'tick_box_grid' ? 'check_box_outline_blank' : 'check' }</i>
                      </div>}
                    <div className="ebs-input">
                      <input type="text" onChange ={(e) => onChange(sectionIndex, questionIndex, e.target.value, type === 'rows' ? 'INPUT_ROW' : 'INPUT_COLUMN' , k)}  value={items.label} />
                    </div>
                    {data.length > 1  && <div className="ebs-remove-icon">
                  <span
                    onClick ={(e) => onChange(sectionIndex, questionIndex, e.target, type === 'rows' ? 'DELETE_ROW' : 'DELETE_COLUMN' , k)}
                    className="material-icons">close</span></div>}
                  </div>
                </div>
              )}
            </Draggable>
        )}
        {provided.placeholder}
      </div>
    )}
    </Droppable>
  </DragDropContext>
  )
}

export default class MutipleChoiceGrid extends Component {
  static contextType = CreateQuestionContext;
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    this.context.handleMultiChoiceGridReorder(this.props.sectionIndex, this.props.questionIndex, result.source.index, result.destination.index, result.source.droppableId);
  }
  render() {
    const {active, options, required, type, answers, grid_questions, columns, sort_order, id } = this.props.data;
    return (
      <React.Fragment>
      <div className="ebs-question-grid">
        {active && <div className="ebs-question-grid-wrapper">
         <div className="row d-flex">
           <div className="col-6">
             <h4 className="ebs-title">Rows</h4>
             <div className="ebs-row-wrapper">
              <ContentBox
                type="rows"
                active={active}
                index={sort_order}
                sectionIndex={this.props.sectionIndex}
                questionIndex={this.props.questionIndex}
                onDrag={this.onDragEnd.bind(this)}
                onChange={this.context.handleGridChoice.bind(this)}
                data={grid_questions} />
                <div className="ebs-list-box">
                  <div className="ebs-counter">{answers.length + 1}.</div>
                  <div className="ebs-add-options">
                    <span onClick ={(e) => this.context.handleGridChoice(this.props.sectionIndex, this.props.questionIndex, e.target, 'ADD_ROW' , sort_order)}>Add Row</span>
                  </div>
                </div>
             </div>
           </div>
           <div className="col-6">
           <h4 className="ebs-title">Columns</h4>
           <div className="ebs-row-wrapper">
           <ContentBox
              type="columns"
              active={active}
              parentType={type}
              sectionIndex={this.props.sectionIndex}
              questionIndex={this.props.questionIndex}
              index={sort_order}
              onDrag={this.onDragEnd.bind(this)}
              onChange={this.context.handleGridChoice.bind(this)}
              data={answers} />
              <div className="ebs-list-box">
                <div className="ebs-icon-box">
                <i className="material-icons">{type === 'multiple_choice_grid' ? 'radio_button_unchecked' : type === 'tick_box_grid' ? 'check_box_outline_blank' : 'check' }</i>
                </div>
                <div className="ebs-add-options">
                  <span onClick ={(e) => this.context.handleGridChoice(this.props.sectionIndex, this.props.questionIndex, e.target, 'ADD_COLUMN' ,sort_order)}>Add Column</span>
                </div>
              </div>
             </div>
           </div>
         </div>
        </div>}
        {!active && <div className="ebs-question-grid-view">
          <div className="ebs-question-grid-wrapp">
            <div className="ebs-question-grid-header">
              <div className="ebs-question-grid-th ebs-grid-title"></div>
              {answers && answers.map((list,k) => 
                <div key={k} className="ebs-question-grid-th">{list.label}</div>
              )}
            </div>
            {grid_questions && grid_questions.map((items,key) => 
              <div key={key} className="ebs-question-grid-header">
                <div className="ebs-question-grid-th ebs-grid-title">{items.label}</div>
                {answers && answers.map((list,k) => 
                  <div key={k} className="ebs-question-grid-th ebs-grid-checkbox">
                    <i className="material-icons">{type === 'multiple_choice_grid' ? 'radio_button_unchecked' : type === 'tick_box_grid' ? 'check_box_outline_blank' : 'check' }</i>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>}
        </div>
        {active && <div className="ebs-footer-wrapper">
        <div className="ebs-left-area d-flex">
              <SaveBtn
              onClick={() => {
                this.props.data.id !== undefined ?
                this.context.updateQuestion({
                  ...this.props.data,
                  form_builder_form_id: this.props.formId,
                  form_builder_section_id: this.props.sectionId,
                }, this.props.sectionIndex, this.props.questionIndex)
                :
                this.context.addQuestion({
                  ...this.props.data,
                  form_builder_form_id: this.props.formId,
                  form_builder_section_id: this.props.sectionId,
                }, this.props.sectionIndex, this.props.questionIndex);
              }}
             />
          </div>
          <div className="ebs-left-area d-flex">
            <span onClick ={(e) => {e.stopPropagation();this.context.cloneQuestion({question_id:id}, this.props.sectionIndex, this.props.questionIndex)}}  className="ebs-btn">
              <i className="material-icons">content_copy</i>
            </span>
            <span onClick ={(e) => {e.stopPropagation(); id !== undefined ? 
                      this.context.deleteQuestion({question_id:id}, this.props.sectionIndex)
                      : this.context.deleteQuestionFront(this.props.sectionIndex, this.props.questionIndex, e.target) }}  className="ebs-btn">
              <i className="material-icons">delete</i>
            </span>
          </div>
         <div className="ebs-right-area d-flex">
          <div className="ebs-isRequired">
              <label className="ebs-custom-radio d-flex">
                <span className="ebs-title-radio">Required</span>
                <div className="ebs-radio-box">
                  <input type="checkbox" onChange={(e) => this.context.changeQuestionRequiredStatus(this.props.sectionIndex, this.props.questionIndex, e.target.checked)} checked={required} />
                  <div className="ebs-radio-toggle">
                    <div className="ebs-handle"></div>
                  </div>
                </div>
              </label>
            </div>
            <div className="ebs-more-option-panel">
                <button  onClick={(e) => this.context.handleClick(e)} className="ebs-btn"><span style={{pointerEvents: 'none'}} className="material-icons">more_vert</span></button>
                <div  className="ebs-app-tooltip">
                  <div className="ebs-title-tooltip">Show now</div>
                  <div
                  onClick ={(e) => this.context.setDescription(this.props.sectionIndex, this.props.questionIndex, e.target)} 
                  className={`ebs-tooltip-item ${options.description_visible ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><div className="ebs-title">Description</div></div>
                  <div
                   onClick ={(e) => this.context.handleGridChoice(this.props.sectionIndex, this.props.questionIndex, e.target, 'RESPONSE' ,`${sort_order}`)} 
                   className={`ebs-tooltip-item ${options.limit ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><div className="ebs-title">Limit to one response per column</div></div>
                  <div
                   onClick ={(e) => this.context.handleGridChoice(this.props.sectionIndex, this.props.questionIndex, e.target, 'SHUFFLE' ,`${sort_order}`)}
                   className={`ebs-tooltip-item ${options.shuffle ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><div className="ebs-title">Shuffle row order</div></div>
                </div>
            </div>
         </div>
        </div>}
      </React.Fragment>
    )
  }
}
