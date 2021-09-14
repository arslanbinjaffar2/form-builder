import React, {useState, useEffect} from 'react'

const Section = ({onClick,value,data,index}) => {
 const [section, setSection] = useState(0);
 useEffect(() => {
  setSection(data.findIndex(x => x.index === index))
 }, []);
  return (
    <React.Fragment>
      <div onClick={(e) => {!value.active && onClick(index)}} className={`ebs-section-wrapper ${data.length > 1 ? 'ebs-multi-section' : ''} ${value.active ? 'ebs-active-section' : ''}`}>
        {data.length > 1 &&  <div className="ebs-section-counter">
          Section {section+1} of {data.length}
        </div>}
        <div className="ebs-section-box">
          <textarea placeholder="Untitled form" className="ebs-textarea-title" defaultValue={value.title}></textarea>
          <textarea placeholder="Form Description" className="ebs-textarea-desc" defaultValue={value.desc}></textarea>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Section;