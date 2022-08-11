import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CreateQuestionContext } from 'app/contexts/CreateQuestionContext';


const ContentBox = ({data,active,onDrag,index,type,onChange,parentType}) => {
  console.log(data);
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
                      <input type="text" onChange ={(e) => onChange(e.target.value, type === 'rows' ? 'INPUT_ROW' : 'INPUT_COLUMN' ,index, k)}  value={items} />
                    </div>
                    {data.length > 1  && <div className="ebs-remove-icon">
                  <span
                    onClick ={(e) => onChange(e.target, type === 'rows' ? 'DELETE_ROW' : 'DELETE_COLUMN' ,index, k)}
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
    this.context.handleMultiChoiceGridReorder(this.props.data.data.index,result.source.index, result.destination.index,result.source.droppableId);
  }
  handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.toggle('ebs-btn-active');
    const _rect = e.target.getBoundingClientRect();
    const _wHeight = window.innerHeight;
    const _position = _wHeight - (_rect.top + 168);
    if (_position <= 0 ) {
      e.target.classList.add('ebs-position-top');
    } else {
      e.target.classList.remove('ebs-position-top'); 
    }
  }
  componentDidMount() {
    window.addEventListener('click',this.onBodyClick.bind(this), false)
  }

  onBodyClick = (e) => {
    var _tooltip = document.querySelector('.ebs-more-option-panel .ebs-btn');
    if (_tooltip) {
      _tooltip.classList.remove('ebs-btn-active');
    }
  }
  componentWillUnmount () {
    window.removeEventListener('click',this.onBodyClick.bind(this), false)
  }
  render() {
    const {active, options, required, type, rows, columns, sort_order } = this.props.data.data;
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
                onDrag={this.onDragEnd.bind(this)}
                onChange={this.context.handleGridChoice.bind(this)}
                data={rows} />
                <div className="ebs-list-box">
                  <div className="ebs-counter">{rows.length + 1}.</div>
                  <div className="ebs-add-options">
                    <span onClick ={(e) => this.context.handleGridChoice(e.target, 'ADD_ROW' ,`${sort_order}`)}>Add Row</span>
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
              index={sort_order}
              onDrag={this.onDragEnd.bind(this)}
              onChange={this.context.handleGridChoice.bind(this)}
              data={columns} />
              <div className="ebs-list-box">
                <div className="ebs-icon-box">
                <i className="material-icons">{type === 'multiple_choice_grid' ? 'radio_button_unchecked' : type === 'tick_box_grid' ? 'check_box_outline_blank' : 'check' }</i>
                </div>
                <div className="ebs-add-options">
                  <span onClick ={(e) => this.context.handleGridChoice(e.target, 'ADD_COLUMN' ,`${sort_order}`)}>Add Column</span>
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
              {columns && columns.map((list,k) => 
                <div key={k} className="ebs-question-grid-th">{list}</div>
              )}
            </div>
            {rows && rows.map((items,key) => 
              <div key={key} className="ebs-question-grid-header">
                <div className="ebs-question-grid-th ebs-grid-title">{items}</div>
                {columns && columns.map((list,k) => 
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
            <span onClick ={(e) => {e.stopPropagation();this.context.cloneQuestion(this.props.sectionIndex, this.props.questionIndex, e.target)}}  className="ebs-btn">
              <i className="material-icons">content_copy</i>
            </span>
            <span onClick ={(e) => {e.stopPropagation();this.context.deleteQuestion(this.props.sectionIndex, this.props.questionIndex, e.target)}}  className="ebs-btn">
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
                <button  onClick={this.handleClick.bind(this)} className="ebs-btn"><span style={{pointerEvents: 'none'}} className="material-icons">more_vert</span></button>
                <div  className="ebs-app-tooltip">
                  <div className="ebs-title-tooltip">Show</div>
                  <div
                  onClick ={(e) => this.context.setDescription(this.props.sectionIndex, this.props.questionIndex, e.target)} 
                  className={`ebs-tooltip-item ${options.description_visible ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><div className="ebs-title">Description</div></div>
                  <div
                   onClick ={(e) => this.context.handleGridChoice(e.target, 'RESPONSE' ,`${sort_order}`)} 
                   className={`ebs-tooltip-item ${options.limit ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><div className="ebs-title">Limit to one response per column</div></div>
                  <div
                   onClick ={(e) => this.context.handleGridChoice(e.target, 'SHUFFLE' ,`${sort_order}`)}
                   className={`ebs-tooltip-item ${options.shuffle ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><div className="ebs-title">Shuffle row order</div></div>
                </div>
            </div>
         </div>
        </div>}
      </React.Fragment>
    )
  }
}
