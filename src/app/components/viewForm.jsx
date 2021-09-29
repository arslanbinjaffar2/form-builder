import React, { Component } from 'react';
import { FormDataContext } from "app/contexts/FormDataContext";
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

class viewForm extends Component {
  static contextType = FormDataContext;
  state = {
    data: null,
    sections: null,
    active: 0
  }
  componentDidMount() {
    const _id = Number(localStorage.getItem('id'));
    if (!_id) {
      // this.props.history.push('/');
    } else {
      const _data = this.context.data[_id - 1];
      const _section = [];
       
      if (_data) {
        var i = 0;
        _data.form.forEach(element => {
          if (element.type === 'SECTION') {
            let _item = {
              formsections: []
            }
            _item.formsections.push(element);
            _section.push(_item);
            i++;
          } else {
            _section[i-1].formsections.push(element)
          }
        });
        console.log(_section)
        this.setState({
          data: _data,
          sections: _section
        })
      } else {
        this.props.history.push('/form/create');
      }
    }
  }
  componentWillUnmount() {
    localStorage.setItem('id',''); 
  }
  render() {
    const { data, sections, active } = this.state;
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
          {sections &&
            sections[active].formsections.map((element, k) => (
              <div key={k} className="ebs-form-wrapper">
                {element.type === "SECTION" && element.index > 0 && (
                  <div className="ebs-sub-section">
                    {element.title && (
                      <div className="ebs-title">{element.title}</div>
                    )}
                    {element.desc && (
                      <div className="ebs-description">{element.desc}</div>
                    )}
                  </div>
                )}
                {element.type === "multiple_choice" && (
                  <FormMultipleChoice data={element} />
                )}
                {element.type === "checkboxes" && (
                  <FormCheckboxes data={element} />
                )}
                {element.type === "drop_down" && (
                  <FormDropDown data={element} />
                )}
                {element.type === "linear_scale" && (
                  <FormLinearScale data={element} />
                )}
                {element.type === "short_answer" && (
                  <FormShortAnswer data={element} />
                )}
                {element.type === "paragraph" && (
                  <FormLongAnswer data={element} />
                )}
                {element.type === "multiple_choice_grid" && (
                  <FormRadioGrid data={element} />
                )}
                {element.type === "tick_box_grid" && (
                  <FormTickGrid data={element} />
                )}
                {element.type === "time" && (
                  <FormTimebox data={element} />
                )}
                {element.type === "date" && (
                  <FormDatebox data={element} />
                )}
                {element.type === "TEXT_BLOCK" && (
                  <FormTextBlock data={element} />
                )}
              </div>
            ))}
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
          )}
        </div>
      </div>
    );
  }
}
export default viewForm; 