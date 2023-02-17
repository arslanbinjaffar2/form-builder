import React, { useState, useContext } from 'react';
import { CreateQuestionContext } from "app/contexts/CreateQuestionContext";
import SaveBtn from '../ui/SaveBtn';
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
const Section = ({ onClick, value, data, index,  }) => {
  const [section ] = useState(index);
  const {handleSectionArea,handleSectionPanel,handleSectionSort, cloneSection, saveSection, deleteSection} = useContext(CreateQuestionContext);
  handleClick()
  const handlebtnClick = (e) => {
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
  return (
    <React.Fragment>
      <div 
        onClick={(e) => { !value.active && onClick(index) }} className={`ebs-section-wrapper ${data.length > 1 ? 'ebs-multi-section' : ''} ${value.active ? 'ebs-active-section' : ''}`}>
        {data.length > 1 && <div className="ebs-section-counter">
          Section {section + 1} of {data.length}
        </div>}
        <div className="ebs-section-box">
          <div className="row d-flex">
            <div className={data.length > 1 ? 'col-11 pr-0' : 'col-12'}>
              <textarea onChange={(e) => handleSectionArea(e.target,'title',index)} placeholder="Untitled form" className="ebs-textarea-title" value={value.title} />
            </div>
            {data.length > 1 && value.active && <div className="col-1">
              <div className="ebs-more-option-panel">
                <button onClick={(e) => handleClick(e)} className={`ebs-btn tooltip-medium`}><span style={{ pointerEvents: 'none' }} className="material-icons">more_vert</span></button>
                <div className="ebs-app-tooltip">
                  <div
                    onClick={(e) => cloneSection({section_id: value.id}, index)}
                    className="ebs-tooltip-item">
                      Duplicate Section
                    </div>
                    <div
                      onClick={handleSectionSort}
                      className="ebs-tooltip-item">
                        Move Section
                    </div>
                    <div
                    onClick={(e) =>
                      value.id !== undefined ? 
                      deleteSection({section_id:value.id})
                      : handleSectionPanel(e.target, 'DELETE', index)}
                    className="ebs-tooltip-item">
                      Delete Section
                    </div>
                    {/* {index > 0 &&  <div
                      onClick={(e) => handleSectionPanel(e.target, 'MERGE', index)}
                      className="ebs-tooltip-item">
                        Merge with above
                    </div>} */}
                  
                </div>
              </div>
            </div>}
          </div>
          <textarea onChange={(e) => handleSectionArea(e.target,'description',index)} placeholder="Form Description" className="ebs-textarea-desc" value={value.description} />
          <SaveBtn onClick={()=>{saveSection(value)}}>Save Section</SaveBtn>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Section;