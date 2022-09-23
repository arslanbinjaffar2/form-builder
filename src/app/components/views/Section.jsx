import React, {useState} from 'react'
import FormMultipleChoice from './FormMultipleChoice';
import FormCheckboxes from './FormCheckboxes';
import FormDropDown from './FormDropDown';
import FormLinearScale from './FormLinearScale';
import FormShortAnswer from './FormShortAnswer';
import FormLongAnswer from './FormLongAnswer';
import FormRadioGrid from './FormRadioGrid';
import FormTickGrid from './FormTickGrid';
import FormTimebox from './FormTimebox';
import FormDatebox from './FormDatebox';
import FormTextBlock from './FormTextBlock';
import { validateShortAnswer } from '../../../helpers/validation';

const Section = ({section, sections, active, setactive, formData, setFormData}) => {
    const [validated, setValidated] = useState(true);
    const ValidateSection = async (e, type) => {
        e.preventDefault();
       let notValidatedFor = [];
       let formData2 = formData;
    //    console.log(validated);

            await section.questions.forEach(question => {
                     if(question.required === 1){
                        if(formData2[section.id][question.id]['answer'] === "" || formData2[section.id][question.id]['answer'].length <= 0){
                            formData2 = {...formData2, [question.form_builder_section_id]:{...formData2[section.id], [question.id]: { ...formData2[section.id][question.id], ['requiredError']:true}}}
                            notValidatedFor.push(question.id);
                        }
                        if(question.validation.type !== undefined){
                            if(!validateShortAnswer(question.validation, formData2[section.id][question.id]['answer'])){
                                formData2 = {...formData2, [question.form_builder_section_id]:{...formData2[section.id], [question.id]: { ...formData2[section.id][question.id], ['validationError']:true}}}
                                setValidated(false);
                                notValidatedFor.push(question.id);
                            }
                        }
                    }
            });
            setFormData(formData2);
            // console.log(notValidatedFor);
            // console.log(validated);
            if (notValidatedFor.length <= 0 &&  validated === true){
                if(type === 'next'){
                    setactive(active + 1);
                }  
                else if(type === 'back'){
                    setactive(active - 1);
                }
            }
      };
  return (
    <React.Fragment>
        {sections && section &&
            <div className="ebs-form-wrapper">
                <div className="ebs-sub-section">
                {section.title && (
                    <div className="ebs-title">{section.title}</div>
                )}
                {section.description && (
                    <div className="ebs-description">{section.description}</div>
                )}
                </div>
            
            {section.questions.map((item, itemIndex) => {

                    if(item.type === "multiple_choice"){
                    return <FormMultipleChoice key={itemIndex}  data={item} setFormData={setFormData} formData={formData} setValidated={setValidated} />
                    }
                    else if(item.type === "checkboxes") {
                    return  <FormCheckboxes key={itemIndex}  data={item} setFormData={setFormData} formData={formData} setValidated={setValidated} />
                    }
                    else if(item.type === "drop_down"){
                        
                        return <FormDropDown key={itemIndex}  data={item} setFormData={setFormData} formData={formData} setValidated={setValidated} />
                    }
                    else if(item.type === "linear_scale"){
                        return <FormLinearScale key={itemIndex}  data={item} setFormData={setFormData} formData={formData} setValidated={setValidated} />
                    }
                    else if(item.type === "short_answer"){
                        return <FormShortAnswer key={itemIndex}  data={item} setFormData={setFormData} formData={formData} setValidated={setValidated} />
                    }
                    else if(item.type === "paragraph"){
                        return <FormLongAnswer key={itemIndex}  data={item} setFormData={setFormData} formData={formData} setValidated={setValidated} />
                    }
                    else if(item.type === "multiple_choice_grid"){
                        return <FormRadioGrid key={itemIndex}  data={item} setFormData={setFormData} formData={formData} setValidated={setValidated} />
                    }
                    else if(item.type === "tick_box_grid"){
                        return <FormTickGrid key={itemIndex}  data={item} setFormData={setFormData} formData={formData} setValidated={setValidated} />
                    }
                    else if(item.type === "time"){
                        return <FormTimebox key={itemIndex}  data={item} setFormData={setFormData} formData={formData} setValidated={setValidated} />
                    }
                    else if(item.type === "date"){
                        return <FormDatebox key={itemIndex}  data={item} setFormData={setFormData} formData={formData} setValidated={setValidated} />
                    }
                    else if(item.type === "TEXT_BLOCK"){
                            <FormTextBlock key={itemIndex}  data={item} setFormData={setFormData} formData={formData} setValidated={setValidated} />
                        return 
                    }

            })}
            
            </div>
        }
        {sections && sections.length === 1 && (
        <div className="ebs-footer-form">
            <button className="btn btn-default btn-submit">Submit</button>
        </div>
        )}
        {sections && sections.length > 1 && active !== sections.length - 1 && (
        <div className="ebs-footer-form">
            {active > 0 && (
            <button
                className="btn btn-default"
                onClick={() => setactive(active - 1)}
            >
                Back
            </button>
            )}
            <button
            className="btn btn-default"
            onClick={(e) => ValidateSection(e, 'next')}
            >
            Next
            </button>
        </div>
        )}
        {sections && sections.length > 1 && active === sections.length - 1 && (
        <div className="ebs-footer-form">
            <button
            className="btn btn-default"
            onClick={(e) => ValidateSection(e, 'back')}
            >
            Back
            </button>
            <button className="btn btn-default btn-submit" onClick={(e)=>{ console.log(formData);  }} >Submit</button>
        </div>
        )}
    </React.Fragment>
  )
}

export default Section