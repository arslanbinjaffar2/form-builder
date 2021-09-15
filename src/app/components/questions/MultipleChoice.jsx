import React, { Component } from 'react';
import Select from "react-select";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CreateQuestionContext } from "app/contexts/CreateQuestionContext";

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
    this.context.handleMultiChoiceReorder(this.props.data.data.index, result.source.index, result.destination.index);
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
    var _arraysection = [];
    this.context.data.forEach(element => {
      if (element.type === 'SECTION') {
        _arraysection.push(element);
      }
    });
    _arraysection.forEach((element, key) => {
      const _new = {
        value: `SECTION_${key}`,
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
    const { handleChangeValueOption } = this.props;
    const { active, options, descVisible, type, required, index } = this.props.data.data;
    return (
      <React.Fragment>

        <div className="ebs-multiple-choice-wrapper">
          <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
            <Droppable droppableId="multiplechoice">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {options.choices && options.choices.map((element, k) =>
                    <Draggable
                      isDragDisabled={!active}
                      key={k}
                      draggableId={`element-${k}`}
                      index={k}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}>
                          <div className={`ebs-list-box d-flex ${options.choices.length === 1 ? 'non-draggable' : ''}`} key={k}>
                            <div className={`ebs-list-box-wrapper d-flex align-items-center ${options.sectionBased && active ? 'list-box-columns' : ''}`}>
                              <div className="ebs-list-drag"{...provided.dragHandleProps}><span className="material-icons">drag_indicator</span></div>
                              <div className="ebs-icon">
                                {type !== 'drop_down' && <i className="material-icons">{type === 'multiple_choice' ? 'radio_button_unchecked' : type === 'checkboxes' ? 'check_box_outline_blank' : 'check'}</i>}
                                {type === 'drop_down' && <span className="ebs-counter-number">{k + 1}.</span>}
                              </div>
                              <div className="ebs-input-area">
                                <input
                                  onChange={(e) => handleChangeValueOption(e.target.value, 'CHANGE', index, k)}
                                  onBlur={(e) => handleChangeValueOption(e.target.value, 'BLUR', index, k)}
                                  type="text" value={element.label} />
                              </div>
                              {options.choices.length > 1 && active && <div className="ebs-remove-icon">
                                <span
                                  onClick={(e) => handleChangeValueOption(e.target, 'DELETE', index)}
                                  className="material-icons">close</span></div>}
                            </div>
                            {type !== 'checkboxes' && options.sectionBased && active && this.state.sectionTo && <div className="ebs-section-based">
                              <Select
                                menuColor='red'
                                maxMenuHeight="1"
                                menuPlacement="auto"
                                isSearchable={false}
                                styles={customStyles}
                                value={this.state.sectionTo[this.state.sectionTo.findIndex(x => x.value === element.nextSection)]}
                                onChange={(e) => handleChangeValueOption(e.value, 'SECTION_BASED_SELECT', index, k)}
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
          {options.addOther && type !== 'drop_down' &&
            <div className="ebs-list-box d-flex">
              <div className="ebs-icon">
                {type !== 'drop_down' && <i className="material-icons">{type === 'multiple_choice' ? 'radio_button_unchecked' : type === 'checkboxes' ? 'check_box_outline_blank' : 'check'}</i>}
              </div>
              <div className="ebs-input-area"><div className="ebs-othertext">Other...</div></div>
              {active && <div className="ebs-remove-icon"><span
                onClick={(e) => handleChangeValueOption(e.target, 'REMOVEOTHER', `${index}`)}
                className="material-icons">close</span></div>}
            </div>}

          {active && <div className="ebs-list-box d-flex">
            <div className="ebs-icon">
              {type !== 'drop_down' && <i className="material-icons">{type === 'multiple_choice' ? 'radio_button_unchecked' : type === 'checkboxes' ? 'check_box_outline_blank' : 'check'}</i>}
              {type === 'drop_down' && <span className="ebs-counter-number">{options.choices.length + 1}.</span>}
            </div>
            <div className="ebs-other-input ebs-btn-box">
              <span
                onClick={(e) => handleChangeValueOption(e.target, 'ADD', `${index}`)}
                className="ebs-addoption">Add Option </span>
              {!options.addOther && type !== 'drop_down' && <React.Fragment>or <strong
                onClick={(e) => handleChangeValueOption(e.target, 'ADDOTHER', `${index}`)}
                className="ebs-addother">add "Other"</strong></React.Fragment>} </div>
          </div>}
          {type === 'checkboxes' && active && options.response.responseValidation && <div style={{ padding: '25px 25px 0' }} className="">
            <div className="ebs-validation-rule">
              <div className="row d-flex">
                <div className="col-3">
                  <Select
                    menuColor='red'
                    maxMenuHeight="1"
                    menuPlacement="auto"
                    isSearchable={false}
                    styles={customStyles}
                    value={_options[_options.findIndex(x => x.value === options.response.type)]}
                    onChange={(e) => handleChangeValueOption(e.value, 'CHECKBOX_RESPONSE_VALIDATION_SELECT_TYPE', `${index}`)}
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
                  <input type="text" value={options.response.value}
                    onChange={(e) => handleChangeValueOption(e.target.value, 'CHECKBOX_RESPONSE_VALUE', `${index}`)} placeholder="Number" />
                </div>
                <div className="col-6">
                  <input type="text" value={options.response.error}
                    onChange={(e) => handleChangeValueOption(e.target.value, 'CHECKBOX_RESPONSE_ERROR', `${index}`)}
                    placeholder="Custom error validation" />
                </div>
              </div>
              <div onClick={(e) => handleChangeValueOption(e.target, 'CHECKBOX_VALIDATION', `${index}`)} className="ebs-close-validation"><i className="material-icons">close</i></div>
            </div>
          </div>}
        </div>

        {active && <div className="ebs-footer-wrapper">
          <div className="ebs-left-area d-flex">
            <span onClick={(e) => { e.stopPropagation(); handleChangeValueOption(e.target, 'CLONEQUESTION', `${index}`) }} className="ebs-btn">
              <i className="material-icons">content_copy</i>
            </span>
            <span onClick={(e) => { e.stopPropagation(); handleChangeValueOption(e.target, 'DELETEQUESTION', `${index}`) }} className="ebs-btn">
              <i className="material-icons">delete</i>
            </span>
          </div>
          <div className="ebs-right-area d-flex">
            <div className="ebs-isRequired">
              <label className="ebs-custom-radio d-flex">
                <span className="ebs-title-radio">Required</span>
                <div className="ebs-radio-box">
                  <input type="checkbox" onChange={(e) => handleChangeValueOption(e.target.checked, 'REQUIRED', `${index}`)} checked={required} />
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
                  onClick={(e) => handleChangeValueOption(e.target, 'DESCRIPTION', `${index}`)}
                  className={`ebs-tooltip-item ${descVisible ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><div className="ebs-title">Description</div></div>

                {type !== 'checkboxes' && <div
                  onClick={(e) => handleChangeValueOption(e.target, 'SECTION_BASE', `${index}`)}
                  className={`ebs-tooltip-item ${options.sectionBased ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><span className="ebs-title">Go to Section baseed on answer</span></div>}

                {type === 'checkboxes' && <div
                  onClick={(e) => handleChangeValueOption(e.target, 'CHECKBOX_VALIDATION', `${index}`)}
                  className={`ebs-tooltip-item ${options.response.responseValidation ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><span className="ebs-title">Response Validation</span></div>}
              </div>
            </div>
          </div>
        </div>}
      </React.Fragment>
    )
  }
}
