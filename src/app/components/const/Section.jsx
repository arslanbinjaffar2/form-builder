import React, { useState, useEffect, useContext } from 'react';
import { CreateQuestionContext } from "app/contexts/CreateQuestionContext";
function handleClick() {
  const items = document.querySelectorAll('.ebs-textarea-title');
  const desc = document.querySelectorAll('.ebs-textarea-desc');
  items.forEach(element => {
    element.style.height = '52px';
    let _height = element.scrollHeight;
    element.style.height = _height + 'px';
  });
  desc.forEach(element => {
    element.style.height = '28px';
    let _height = element.scrollHeight;
    element.style.height = _height + 'px';
  });
}
const Section = ({ onClick, value, data, index }) => {
  const [section, setSection] = useState(0);
  const {handleSectionArea} = useContext(CreateQuestionContext);
  handleClick()
  useEffect(() => {
    setSection(data.findIndex(x => x.index === index))
  }, []);
  return (
    <React.Fragment>
      <div onClick={(e) => { !value.active && onClick(index) }} className={`ebs-section-wrapper ${data.length > 1 ? 'ebs-multi-section' : ''} ${value.active ? 'ebs-active-section' : ''}`}>
        {data.length > 1 && <div className="ebs-section-counter">
          Section {section + 1} of {data.length}
        </div>}
        <div className="ebs-section-box">
          <textarea onChange={(e) => handleSectionArea(e.target,'title',index)} placeholder="Untitled form" className="ebs-textarea-title" value={value.title}></textarea>
          <textarea onChange={(e) => handleSectionArea(e.target,'desc',index)} placeholder="Form Description" className="ebs-textarea-desc" value={value.desc}></textarea>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Section;