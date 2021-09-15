import React, { Component } from 'react';
import { CreateQuestionContext } from "app/contexts/CreateQuestionContext";
function handleClick() {
  const items = document.querySelectorAll('.ebs-textarea-alt-title');
  const desc = document.querySelectorAll('.ebs-textarea-alt-desc');
  items.forEach(element => {
    element.style.height = '36px';
    let _height = element.scrollHeight;
    element.style.height = _height + 'px';
  });
  desc.forEach(element => {
    element.style.height = '28px';
    let _height = element.scrollHeight;
    element.style.height = _height + 'px';
  });
}
export default class TextSection extends Component {
  static contextType = CreateQuestionContext;
  componentDidMount() {
    window.addEventListener('load',handleClick(),false)
  }
  componentDidUpdate(prevProps, prevState) {
    handleClick()
  }
  componentWillUnmount () {
    window.removeEventListener('load',handleClick(),false)
  }
  render() {
    const { onClick, value, data, index,dragHandle } = this.props;
    return (
      <React.Fragment>
        <div onClick={(e) => { !value.active && onClick(index) }} className={`ebs-section-wrapper ${data.length > 1 ? 'ebs-multi-section' : ''} ${value.active ? 'ebs-active-section' : ''}`}>
          <div className="ebs-section-box">
          <div className="ebs-drag-handle" {...dragHandle}>
            <span className="material-icons">drag_indicator</span>
          </div>
            <textarea onChange={(e) => this.context.handleTextArea(e.target,'title',index)} placeholder="Untitled form" className="ebs-textarea-alt-title" value={value.title}></textarea>
            <textarea onChange={(e) => this.context.handleTextArea(e.target,'desc',index)} placeholder="Form Description" className="ebs-textarea-alt-desc" value={value.desc}></textarea>
          </div>
        </div>
      </React.Fragment>
    )
  }
}