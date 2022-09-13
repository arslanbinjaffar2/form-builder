import React, { useContext, useState, useEffect } from 'react';
import { FormDataContext } from "app/contexts/FormDataContext";
import { CreateQuestionContext } from "app/contexts/CreateQuestionContext";
import FormMultipleChoice from './views/FormMultipleChoice';
import FormCheckboxes from './views/FormCheckboxes';
import FormDropDown from './views/FormDropDown';
import FormLinearScale from './views/FormLinearScale';
import FormShortAnswer from './views/FormShortAnswer';
import FormLongAnswer from './views/FormLongAnswer';
import FormRadioGrid from './views/FormRadioGrid';
import FormTickGrid from './views/FormTickGrid';
import FormTimebox from './views/FormTimebox';
import FormDatebox from './views/FormDatebox';
import FormTextBlock from './views/FormTextBlock';


function viewForm(props) {
  const { data, handleTooltip,sortSection, handleReorder, handleChange, handleChangeSectionSelect, loading, getFormData, cancelAllRequests, updating } = useContext(CreateQuestionContext);
  const [sections, setSection] = useState([]);
  const [active, setactive] = useState(0);
  useEffect(() => {
    if(data.length <= 0 && data.id !== props.match.params.id){
      getFormData(parseInt(props.match.params.id));
    }
    return () => {
      if(loading){
        cancelAllRequests();
      }
    }
  }, [])
  

  useEffect(() => {
    if(data && data.sections){
      setSection([...data.sections]);
    }
    return () => {
    }
  }, [data]);

  return (
    <div className="ebs-form-preview">
        <div className="ebs-form-preview-wrapper">
          {data && (
            <div className="ebs-form-title">
              {data.title && <div className="ebs-title">{data.title}</div>}
              {data.description && (
                <div className="ebs-description">{data.description}</div>
              )}
            </div>
          )}
          
           {sections.length > 0 && sections[active] &&
              <div className="ebs-form-wrapper">
                  <div className="ebs-sub-section">
                    {sections[active].title && (
                      <div className="ebs-title">{sections[active].title}</div>
                    )}
                    {sections[active].description && (
                      <div className="ebs-description">{sections[active].description}</div>
                    )}
                  </div>
                
                {sections[active].questions.map((item) => {

                       if(item.type === "multiple_choice"){
                         return <FormMultipleChoice data={item} />
                       }
                       
                        
                       else if(item.type === "checkboxes") {
                        return  <FormCheckboxes data={item} />
                        }

                        else if(item.type === "drop_down"){
                          
                          return <FormDropDown data={item} />
                        }

                        else if(item.type === "linear_scale"){
                          return <FormLinearScale data={item} />
                        }

                        else if(item.type === "short_answer"){
                          return <FormShortAnswer data={item} />
                        }
                        else if(item.type === "paragraph"){
                          return <FormLongAnswer data={item} />
                        }
                        else if(item.type === "multiple_choice_grid"){
                          return <FormRadioGrid data={item} />
                        }
                        else if(item.type === "tick_box_grid"){
                          return <FormTickGrid data={item} />
                        }
                        else if(item.type === "time"){
                          return <FormTimebox data={item} />
                        }
                        else if(item.type === "date"){
                          return <FormDatebox data={item} />
                        }
                        else if(item.type === "TEXT_BLOCK"){
                          <FormTextBlock data={item} />
                          return 
                        }

                })}
                
              </div>
          }
          {/* {sections && sections.length === 1 && (
            <div className="ebs-footer-form">
              <button className="btn btn-default btn-submit">Submit</button>
            </div>
          )}
          {sections && sections.length > 1 && active !== sections.length - 1 && (
            <div className="ebs-footer-form">
              {active > 0 && (
                <button
                  className="btn btn-default"
                  onClick={() => this.setState({ active: active - 1 })}
                >
                  Back
                </button>
              )}
              <button
                className="btn btn-default"
                onClick={() => this.setState({ active: active + 1 })}
              >
                Next
              </button>
            </div>
          )}
          {sections && sections.length > 1 && active === sections.length - 1 && (
            <div className="ebs-footer-form">
              <button
                className="btn btn-default"
                onClick={() => this.setState({ active: active - 1 })}
              >
                Back
              </button>
              <button className="btn btn-default btn-submit">Submit</button>
            </div>
          )} */}
        </div>
      </div>
  )
}

export default viewForm



// {element.type === "multiple_choice" && (
//   <FormMultipleChoice data={element} />
// )}
// {element.type === "checkboxes" && (
//   <FormCheckboxes data={element} />
// )}
// {element.type === "drop_down" && (
//   <FormDropDown data={element} />
// )}
// {element.type === "linear_scale" && (
//   <FormLinearScale data={element} />
// )}
// {element.type === "short_answer" && (
//   <FormShortAnswer data={element} />
// )}
// {element.type === "paragraph" && (
//   <FormLongAnswer data={element} />
// )}
// {element.type === "multiple_choice_grid" && (
//   <FormRadioGrid data={element} />
// )}
// {element.type === "tick_box_grid" && (
//   <FormTickGrid data={element} />
// )}
// {element.type === "time" && (
//   <FormTimebox data={element} />
// )}
// {element.type === "date" && (
//   <FormDatebox data={element} />
// )}
// {element.type === "TEXT_BLOCK" && (
//   <FormTextBlock data={element} />
// )}