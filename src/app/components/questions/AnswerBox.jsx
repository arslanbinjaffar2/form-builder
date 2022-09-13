/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import Select  from "react-select";
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
  })
};

const _options = [
  { value: 'NUMBER', label:  'Number'},
  { value: 'TEXT', label: 'Text'},
  { value: 'LENGTH', label: 'Length'},
  { value: 'REGULAR_EXPRESSION', label: 'Regular expression'}
]
const _options_para = [
  { value: 'LENGTH', label: 'Length'},
  { value: 'REGULAR_EXPRESSION', label: 'Regular expression'}
]
const _IS_NUMBER = [
  { value: 'GREATER_THAN', label:  'Greater Than'},
  { value: 'GREATER_THAN_EQUAL_TO', label: 'Greater than or equal to'},
  { value: 'LESS_THAN', label: 'Less than'},
  { value: 'LESS_THAN_EQUAL_TO', label: 'Less than or equal to'},
  { value: 'EQUAL_TO', label: 'Equal to'},
  { value: 'NOT_EQUAL_TO', label: 'Not equal to'},
  { value: 'BETWEEN', label: 'Between'},
  { value: 'NOT_BETWEEN', label: 'Not between'},
  { value: 'IS_NUMBER', label: 'Is number'},
  { value: 'WHOLE_NUMBER', label: 'Whole number'},
]
const _IS_TEXT = [
  { value: 'CONTAINS', label:  'Contains'},
  { value: 'NOT_CONTAINS', label: `Doesn't contain`},
  { value: 'EMAIL', label: 'Email'},
  { value: 'URL', label: 'URL'}
]
const _IS_LENGTH = [
  { value: 'MAX_CHAR_COUNT', label:  'Maximum character count'},
  { value: 'MIN_CHAR_COUNT', label: `Minimum character count`}
]

const _IS_REGULAR_EXPRESSION = [
  { value: 'CONTAINS', label:  'Contains'},
  { value: 'NOT_CONTAINS', label: `Doesn't contain`},
  { value: 'MATCHES', label:  'Matches'},
  { value: 'NOT_MATCHES', label: `Doesn't match`},
]
const CustomSelect = ({options,onChange,value}) => {
  return (
    <Select
      menuColor='red'
      maxMenuHeight="1"
      menuPlacement="auto"
      isSearchable={false}
      styles={customStyles}
      value={value}
      onChange={onChange}
      components={{IndicatorSeparator: () => null }}
      theme={theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: '#F4F4F4',
          primary: '#E39840',
        },
      })}
      options={options} />
  )
}
export default class AnswerBox extends Component {
  static contextType = CreateQuestionContext;

  state = {
    dropdown_one: [], 
    dropdown_two: [], 
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
    let _data = this.props.data;
    // eslint-disable-next-line no-eval
   
      const _evaldropdown = (_data.validation && _data.validation.type) ? eval(`_IS_${_data.validation.type}`) : false;
 
        this.setState({
          dropdown_one: _data.type === 'short_answer' ? _options : _options_para,
          dropdown_two: _evaldropdown ? _evaldropdown : _IS_NUMBER
        })
    window.addEventListener('click',this.onBodyClick.bind(this), false)
  }

  onBodyClick = (e) => {
  var _tooltip = document.querySelector('.ebs-more-option-panel .ebs-btn');
  if (_tooltip) {
    _tooltip.classList.remove('ebs-btn-active');
  }
  }

  componentWillReceiveProps(nextProps) {
      let _data = this.props.data;
      // eslint-disable-next-line no-eval
        const _evaldropdown = (_data.validation && _data.validation.type) ? eval(`_IS_${_data.validation.type}`) : false;
          this.setState({
            dropdown_one: _data.type === 'short_answer' ? _options : _options_para,
            dropdown_two: _evaldropdown ? _evaldropdown : _IS_NUMBER
          })
    
   }
  componentWillUnmount () {
    window.removeEventListener('click',this.onBodyClick.bind(this), false)
  }
  render() {
    const {
      cloneQuestion, 
      deleteQuestion, 
      deleteQuestionFront,
      setResponseValidationType, 
      setResponseValidationRule,
      setResponseValidationFeildValue,
      setResponseValidationFeildError,
      setQuestionResponseValidation,
      changeQuestionRequiredStatus,
      setDescription,
      setResponseValidation
    } = this.context;
    const {active,  options, required, type, validation , id} = this.props.data;
    return (
      <React.Fragment>
      <div className="ebs-answer-box">
        <div className="ebs-answer-box-wrapper">
          <div className="ebs-answer-ui">
            <div className={`ebs-answer-ui-inner ${type === 'short_answer' ? 'size-md' : ''}`}>
              {type === 'short_answer' ? 'Short answer text' : 'Long answer text'}
            </div>
          </div>
          {options.response_validation && <div className="ebs-validation-rule">
            <div className="row d-flex">
              <div className="col-3">
              <CustomSelect
                value={this.state.dropdown_one[this.state.dropdown_one.findIndex(x => x.value === validation.type)]} 
                onChange={(e) => setResponseValidationType(this.props.sectionIndex, this.props.questionIndex, e.value)}
                options={this.state.dropdown_one} />
              </div>
              <div className="col-3">
              <CustomSelect
                value={this.state.dropdown_two[this.state.dropdown_two.findIndex(x => x.value === validation.rule)]} 
                onChange={(e) => setResponseValidationRule(this.props.sectionIndex, this.props.questionIndex, e.value)}
                options={this.state.dropdown_two} />
              </div>
              <div className={validation.type === 'NUMBER' || validation.type === 'LENGTH' ? 'col-2' : 'col-3'}>
                {(validation.type === 'NUMBER' || validation.type === 'LENGTH') &&
                 <input 
                  onChange={(e) => setResponseValidationFeildValue(this.props.sectionIndex, this.props.questionIndex, e.target.value)}
                  value={validation.value ? validation.value: ''} placeholder="Number" className="" type="text" />}
                {validation.type === 'TEXT' && <input
                onChange={(e) => setResponseValidationFeildValue(this.props.sectionIndex, this.props.questionIndex, e.target.value)}
                 value={validation.value ? validation.value: ''} placeholder="Text" className="" type="text" />}
                {validation.type === 'REGULAR_EXPRESSION' && 
                <input
                 onChange={(e) => setResponseValidationFeildValue(this.props.sectionIndex, this.props.questionIndex, e.target.value)}
                 value={validation.value ? validation.value: ''} placeholder="Pattern" className="" type="text" />}
              </div>
              <div className={validation.type === 'NUMBER' || validation.type === 'LENGTH' ? 'col-4' : 'col-3'}>
                <input
                 onChange={(e) => setResponseValidationFeildError(this.props.sectionIndex, this.props.questionIndex, e.target.value)}
                 value={validation.custom_error ? validation.custom_error : '' } placeholder="Custom error text" type="text" />
              </div>
            </div>
            <div onClick ={(e) => setQuestionResponseValidation(this.props.sectionIndex, this.props.questionIndex, e.target)} className="ebs-close-validation"><i className="material-icons">close</i></div>
          </div>}
        </div>
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
            <span onClick ={(e) => {e.stopPropagation();cloneQuestion({question_id:id}, this.props.sectionIndex, this.props.questionIndex)}}  className="ebs-btn">
              <i className="material-icons">content_copy</i>
            </span>
            <span onClick ={(e) => {e.stopPropagation(); id !== undefined ? 
                      deleteQuestion({question_id:id}, this.props.sectionIndex)
                      : deleteQuestionFront(this.props.sectionIndex, this.props.questionIndex, e.target)}}  className="ebs-btn">
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
                <button  onClick={this.handleClick.bind(this)} className="ebs-btn tooltip-medium"><span style={{pointerEvents: 'none'}} className="material-icons">more_vert</span></button>
                <div  className="ebs-app-tooltip">
                  <div className="ebs-title-tooltip">Show</div>
                  <div
                    onClick ={(e) => {setDescription(this.props.sectionIndex, this.props.questionIndex)}} 
                  className={`ebs-tooltip-item ${options.description_visible ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><div className="ebs-title">Description</div></div>
                  <div 
                   onClick ={(e) => setResponseValidation(this.props.sectionIndex, this.props.questionIndex, e.target)} 
                  className={`ebs-tooltip-item ${options.response_validation ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><span className="ebs-title">Response Valdiation</span></div>
                </div>
            </div>
         </div>
        </div>}
     
      </React.Fragment>
    )
  }
}
