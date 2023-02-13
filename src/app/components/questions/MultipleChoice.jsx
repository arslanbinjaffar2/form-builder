import React, { Component } from 'react';
import Select from "react-select";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CreateQuestionContext } from "app/contexts/CreateQuestionContext";
import SaveBtn from "@/ui/SaveBtn";

const customStyles = {
  control: base => ({
    ...base,
    height: 35,
    minHeight: 35,
    borderRadius: 0,
    border: 'none',
    padding: 0,
    color: '#444',
    boxShadow: null
  }),
  option: (styles) =>( {
    ...styles,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'

  })
};



const _options = [
  { value: 'AT_LEAST', label: 'Select at least' },
  { value: 'AT_MOST', label: 'Select at most' },
  { value: 'EXACTLY', label: 'Select exactly' },
]

export default class MultipleChoice extends Component {
  static contextType = CreateQuestionContext;
  state = {
    sectionTo: null,
    section: null,
  }
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    this.context.handleMultiChoiceReorder(this.props.sectionIndex, this.props.questionIndex, this.props.data.index, result.source.index, result.destination.index);
  }
  handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.toggle('ebs-btn-active');
    const _rect = e.target.getBoundingClientRect();
    const _wHeight = window.innerHeight;
    const _position = _wHeight - (_rect.top + 168);
    if (_position <= 0) {
      e.target.classList.add('ebs-position-top');
    } else {
      e.target.classList.remove('ebs-position-top');
    }
  }
  componentDidMount() {
    this.generateSelect();
    window.addEventListener('click', this.onBodyClick.bind(this), false)
  }
  componentWillReceiveProps(nextProps) {
    this.generateSelect();
  }

  generateSelect = () => {
    var newArray = [{ value: 'CONTINUE', label: 'Continue to next section' },
    { value: 'SUBMIT', label: 'Submit form' }];
    var _arraysection = [...this.context.data.sections];
  
    _arraysection.forEach((element, key) => {
      const _new = {
        value: element.id,
        label: `Go to Section ${key + 1} (${element.title})`,
      }
      newArray.push(_new)
    });
    this.setState({
      sectionTo: newArray
    })
  }
  onBodyClick = (e) => {
    var _tooltip = document.querySelector('.ebs-more-option-panel .ebs-btn');
    if (_tooltip) {
      _tooltip.classList.remove('ebs-btn-active');
    }
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.onBodyClick.bind(this), false)
  }
  render() {
    const { 
       cloneQuestion, 
       deleteQuestion, 
       changeQuestionRequiredStatus, 
       setSectionBase, 
       setAnswersOnBlur, 
       setAnswersOnChange, 
       deleteAnswers, 
       setNextSection, 
       removeOther, 
       addOther, 
       setResponseValidation,
       setResponseValidationCheckBoxError,
       setResponseValidationCheckBoxType,
       setResponseValidationCheckBoxValue,
       addAnswers,
       setDescription,
       } = this.context;
    const { active, options, answers, type, required, validation, id } = this.props.data;
    return (
      <React.Fragment>
        <div className="ebs-multiple-choice-wrapper">
          <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
            <Droppable droppableId="multiplechoice">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {answers && answers.map((element, k) =>
                    <Draggable
                      isDragDisabled={!active}
                      key={k}
                      draggableId={`element-${k}`}
                      index={k}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps} key={k}>
                          <div className={`ebs-list-box d-flex ${answers.length === 1 ? 'non-draggable' : ''}`} >
                            <div className={`ebs-list-box-wrapper d-flex align-items-center ${options.section_based == 1 && active ? 'list-box-columns' : ''}`}>
                              <div className="ebs-list-drag"{...provided.dragHandleProps}><span className="material-icons">drag_indicator</span></div>
                              <div className="ebs-icon">
                                {type !== 'drop_down' && <i className="material-icons">{type === 'multiple_choice' ? 'radio_button_unchecked' : type === 'checkboxes' ? 'check_box_outline_blank' : 'check'}</i>}
                                {type === 'drop_down' && <span className="ebs-counter-number">{k + 1}.</span>}
                              </div>
                              <div className="ebs-input-area">
                                <input
                                  onChange={(e) => setAnswersOnChange(this.props.sectionIndex, this.props.questionIndex,e.target.value, k)}
                                  onBlur={(e) => setAnswersOnBlur(this.props.sectionIndex, this.props.questionIndex, e.target.value, k)}
                                  type="text" value={element.label} />
                              </div>
                              {answers.length > 1 && active && <div className="ebs-remove-icon">
                                <span
                                  onClick={(e) => deleteAnswers(this.props.sectionIndex, this.props.questionIndex, k)}
                                  className="material-icons">close</span></div>}
                            </div>
                            {(type !== 'checkboxes' && options.section_based == 1 && active && this.state.sectionTo) && <div className="ebs-section-based">
                              <Select
                                menuColor='red'
                                maxMenuHeight="1"
                                menuPlacement="auto"
                                isSearchable={false}
                                styles={customStyles}
                                value={this.state.sectionTo[this.state.sectionTo.findIndex(x => x.value == element.next_section)]}
                                onChange={(e) => setNextSection(this.props.sectionIndex, this.props.questionIndex, e.value, k)}
                                components={{ IndicatorSeparator: () => null }}
                                theme={theme => ({
                                  ...theme,
                                  borderRadius: 0,
                                  display: 'none',
                                  colors: {
                                    ...theme.colors,
                                    primary25: '#F4F4F4',
                                    primary: '#E39840',
                                  },
                                })}
                                options={this.state.sectionTo} />
                            </div>}
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
          {/* {options.add_other == 1 && type !== 'drop_down' &&
            <div className="ebs-list-box d-flex">
              <div className="ebs-icon">
                {type !== 'drop_down' && <i className="material-icons">{type === 'multiple_choice' ? 'radio_button_unchecked' : type === 'checkboxes' ? 'check_box_outline_blank' : 'check'}</i>}
              </div>
              <div className="ebs-input-area"><div className="ebs-othertext">Other...</div></div>
              {active && <div className="ebs-remove-icon"><span
                onClick={(e) => removeOther(this.props.sectionIndex, this.props.questionIndex, e.target)}
                className="material-icons">close</span></div>}
            </div>} */}

          {active && <div className="ebs-list-box d-flex">
            <div className="ebs-icon">
              {type !== 'drop_down' && <i className="material-icons">{type === 'multiple_choice' ? 'radio_button_unchecked' : type === 'checkboxes' ? 'check_box_outline_blank' : 'check'}</i>}
              {type === 'drop_down' && <span className="ebs-counter-number">{answers.length + 1}.</span>}
            </div>
            <div className="ebs-other-input ebs-btn-box">
              <span
                onClick={(e) => addAnswers(this.props.sectionIndex, this.props.questionIndex, e.target)}
                className="ebs-addoption">Add Option </span>
              {!options.add_other && type !== 'drop_down' && <React.Fragment>or <strong
                onClick={(e) => addOther(this.props.sectionIndex, this.props.questionIndex, e.target)}
                className="ebs-addother">add "Other"</strong></React.Fragment>} </div>
          </div>}
          {type === 'checkboxes' && active && options.response_validation == 1 && <div style={{ padding: '25px 25px 0' }} className="">
            <div className="ebs-validation-rule">
              <div className="row d-flex">
                <div className="col-3">
                  <Select
                    menuColor='red'
                    maxMenuHeight="1"
                    menuPlacement="auto"
                    isSearchable={false}
                    styles={customStyles}
                    value={_options[_options.findIndex(x => x.value === validation.type)]}
                    onChange={(e) => setResponseValidationCheckBoxType(this.props.sectionIndex, this.props.questionIndex, e.value)}
                    components={{ IndicatorSeparator: () => null }}
                    theme={theme => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        primary25: '#F4F4F4',
                        primary: '#E39840',
                      },
                    })}
                    options={_options} />
                </div>
                <div className="col-3">
                  <input type="text" value={validation.value}
                    onChange={(e) => setResponseValidationCheckBoxValue(this.props.sectionIndex, this.props.questionIndex, e.target.value)} placeholder="Number" />
                </div>
                <div className="col-6">
                  <input type="text" value={validation.custom_error}
                    onChange={(e) => setResponseValidationCheckBoxError(this.props.sectionIndex, this.props.questionIndex, e.target.value)}
                    placeholder="Custom error validation" />
                </div>
              </div>
              <div onClick={(e) => setResponseValidation(this.props.sectionIndex, this.props.questionIndex,  e.target)} className="ebs-close-validation"><i className="material-icons">close</i></div>
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
            >
              Save Question
            </SaveBtn>
          </div>
          <div className="ebs-left-area d-flex">
            <span onClick={(e) => { e.stopPropagation(); cloneQuestion({question_id:id}, this.props.sectionIndex, this.props.questionIndex) }} className="ebs-btn">
              <i className="material-icons">content_copy</i>
            </span>
            <span onClick={(e) => { e.stopPropagation(); id !== undefined ? 
                      this.context.deleteQuestion({question_id:id}, this.props.sectionIndex)
                      : this.context.deleteQuestionFront(this.props.sectionIndex, this.props.questionIndex, e.target) }} className="ebs-btn">
              <i className="material-icons">delete</i>
            </span>
          </div>
          <div className="ebs-right-area d-flex">
            <div className="ebs-isRequired">
              <label className="ebs-custom-radio d-flex">
                <span className="ebs-title-radio">Required</span>
                <div className="ebs-radio-box">
                  <input type="checkbox" onChange={(e) => changeQuestionRequiredStatus(this.props.sectionIndex, this.props.questionIndex, e.target.checked)} checked={required} />
                  <div className="ebs-radio-toggle">
                    <div className="ebs-handle"></div>
                  </div>
                </div>
              </label>
            </div>
            <div className="ebs-more-option-panel">
              <button onClick={this.handleClick.bind(this)} className={`ebs-btn ${type === 'checkboxes' ? 'tooltip-medium' : ''}`}><span style={{ pointerEvents: 'none' }} className="material-icons">more_vert</span></button>
              <div className="ebs-app-tooltip">
                <div className="ebs-title-tooltip">Show</div>
                <div
                  onClick={(e) => setDescription(this.props.sectionIndex, this.props.questionIndex, e.target)}
                  className={`ebs-tooltip-item ${options.description_visible == 1 ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><div className="ebs-title">Description</div></div>

                {type !== 'checkboxes' && <div
                  onClick={(e) => setSectionBase(this.props.sectionIndex, this.props.questionIndex, e.target)}
                  className={`ebs-tooltip-item ${options.section_based == 1? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><span className="ebs-title">Go to Section baseed on answer</span></div>}

                {type === 'checkboxes' && <div
                  onClick={(e) => setResponseValidation(this.props.sectionIndex, this.props.questionIndex,  e.target)}
                  className={`ebs-tooltip-item ${options.response_validation == 1 ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><span className="ebs-title">Response Validation</span></div>}
              </div>
            </div>
          </div>
        </div>}
      </React.Fragment>
    )
  }
}
