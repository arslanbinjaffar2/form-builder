import React, { Component } from "react";
import Select, { components } from "react-select";
import MultipleChoice from "@/questions/MultipleChoice";
import AnswerBox from "./AnswerBox";
import LinearScale from "./LinearScale";
import MutipleChoiceGrid from "./MutipleChoiceGrid";
import DateTimeModule from "./DateTimeModule";
import { CreateQuestionContext } from "app/contexts/CreateQuestionContext";
import SaveBtn from "../ui/SaveBtn";
const { Option, SingleValue } = components;
const customStyles = {
  control: (base) => ({
    ...base,
    height: 60,
    minHeight: 60,
    borderRadius: 8,
    padding: 0,
    boxShadow: null,
  }),
};
const IconOption = (props) => (
  <Option className="ebs-super-select-wrapp" {...props}>
    <div className="ebs-super-select">
      <span className="ebs-img">
        <img src={require(`img/${props.data.icon}`)} alt={props.data.label} />
      </span>
      <span className="ebs-title">{props.data.label}</span>
    </div>
  </Option>
);
const ValueOption = (props) => (
  <SingleValue {...props}>
    <div className="ebs-single-select">
      <span className="ebs-img">
        <img src={require(`img/${props.data.icon}`)} alt={props.data.label} />
      </span>
      <span className="ebs-title">{props.data.label}</span>
    </div>
  </SingleValue>
);
const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator className="custom-separator" {...props}>
      <img src={require("img/ico-caret.svg")} alt="caret" />
    </components.DropdownIndicator>
  );
};
const qustionTypeOptions = [
  { value: "short_answer", label: "Short Answer", icon: "ico-short.svg" },
  { value: "paragraph", label: "Paragraph", icon: "ico-paragraph.svg" },
  { value: "multiple_choice", label: "Multiple choice", icon: "ico-radio.svg" },
  { value: "checkboxes", label: "Checkboxes", icon: "ico-checkbox.svg" },
  { value: "drop_down", label: "Drop down", icon: "ico-dropdown.svg" },
  { value: "file_upload", label: "File upload", icon: "ico-cloud.svg" },
  { value: "linear_scale", label: "Linear scale", icon: "ico-linear.svg" },
  {
    value: "multiple_choice_grid",
    label: "Multiple-choice grid",
    icon: "ico-grid-radio.svg",
  },
  {
    value: "tick_box_grid",
    label: "Tick box grid",
    icon: "ico-grid-check.svg",
  },
  { value: "date", label: "Date", icon: "ico-date.svg" },
  { value: "time", label: "time", icon: "ico-time.svg" },
];

export default class Question extends Component {
  static contextType = CreateQuestionContext;
  constructor(props) {
    super(props);
    this.textRef = React.createRef();
    this.textDescRef = React.createRef();
  }
  componentDidMount() {
    var _textarea = this.textRef.current;
    var _height = _textarea.scrollHeight;
    _textarea.style.height = _height + "px";

    var _textarea2 = this.textDescRef.current;
    if (_textarea2) {
      var _height2 = _textarea2.scrollHeight;
      _textarea2.style.height = _height2 + "px";
    }
  }
  componentDidUpdate(prevProps, prevState) {
    var _text = document.querySelectorAll(".ebs-title-textarea");
    var _textdesc = document.querySelectorAll(".ebs-title-description");
    _text.forEach((element) => {
      element.style.height = "42px";
      element.style.height = element.scrollHeight + "px";
    });
    _textdesc.forEach((element) => {
      element.style.height = "35px";
      element.style.height = element.scrollHeight + "px";
    });
  }
  render() {
    const { title, description, options, active, type, required, index } =
      this.props.data;
    return (
      <div
        onClick={(e) => {
          !active &&
            this.context.handleQuestionChange(
              this.props.sectionIndex,
              this.props.questionIndex
            );
        }}
        className={`${
          active ? "ebs-active-section" : ""
        } ebs-question-wrapper ${
          this.props.isDragging ? "ebs-isdragging" : ""
        }`}
      >
        <div className="ebs-question-top d-flex">
          <div className="ebs-drag-handle" {...this.props.dragHandle}>
            <span className="material-icons">drag_indicator</span>
          </div>
          <div className="ebs-question-box d-flex">
            {!active && required && (
              <span className="ebs-icon-required">*</span>
            )}
            <textarea
              onChange={(e) =>
                this.context.handleChangeValue(
                  this.props.sectionIndex,
                  this.props.questionIndex,
                  e.target,
                  "title"
                )
              }
              placeholder="Question"
              ref={this.textRef}
              className="ebs-title-textarea"
              value={title}
            />
          </div>
          {active && (
            <div className="ebs-question-select">
              <Select
                menuColor="red"
                maxMenuHeight="1"
                menuPlacement="auto"
                isSearchable={false}
                styles={customStyles}
                value={
                  qustionTypeOptions[
                    qustionTypeOptions.findIndex((x) => x.value === type)
                  ]
                }
                onChange={(e) =>
                  this.context.changeQuestionType(
                    this.props.sectionIndex,
                    this.props.questionIndex,
                    e.value
                  )
                }
                components={{
                  IndicatorSeparator: () => null,
                  Option: IconOption,
                  SingleValue: ValueOption,
                  DropdownIndicator,
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: "#F4F4F4",
                    primary: "#E39840",
                  },
                })}
                options={qustionTypeOptions}
              />
            </div>
          )}
        </div>
        {options.description_visible && (
          <div className="ebs-description-wrapper">
            <textarea
              onChange={(e) =>
                this.context.handleChangeValue(
                  this.props.sectionIndex,
                  this.props.questionIndex,
                  e.target,
                  "description"
                )
              }
              value={description}
              ref={this.textDescRef}
              className="ebs-title-description"
              placeholder="Description"
            />
          </div>
        )}
        {(type === "multiple_choice" ||
          type === "checkboxes" ||
          type === "drop_down") && (
          <MultipleChoice
            handleChangeValueOption={this.context.handleChangeValueOption}
            data={this.props}
            sectionIndex={this.props.sectionIndex}
            questionIndex={this.props.questionIndex}
          />
        )}
        {(type === "short_answer" || type === "paragraph") && (
          <AnswerBox
            handleChangeValueOption={this.context.handleChangeValueOption}
            data={this.props}
            sectionIndex={this.props.sectionIndex}
            questionIndex={this.props.questionIndex}
          />
        )}
        {type === "linear_scale" && (
          <LinearScale
            data={this.props}
            sectionIndex={this.props.sectionIndex}
            questionIndex={this.props.questionIndex}
          />
        )}
        {(type === "multiple_choice_grid" || type === "tick_box_grid") && (
          <MutipleChoiceGrid
            data={this.props}
            sectionIndex={this.props.sectionIndex}
            questionIndex={this.props.questionIndex}
          />
        )}
        {(type === "date" || type === "time") && (
          <DateTimeModule
            data={this.props}
            sectionIndex={this.props.sectionIndex}
            questionIndex={this.props.questionIndex}
          />
        )}
        <SaveBtn
          onClick={() => {
            this.context.addQuestion({
              ...this.props.data,
              form_builder_form_id: this.props.formId,
              form_builder_section_id: this.props.sectionId,
            });
          }}
        >
          Save Question
        </SaveBtn>
      </div>
    );
  }
}
