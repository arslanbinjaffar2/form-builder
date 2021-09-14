import React, { Component } from "react";
import AppNavbar from "@/AppNavbar";
import Section from "@/const/Section";
import Question from "./questions/Question";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CreateQuestionContext } from "app/contexts/CreateQuestionContext";

export default class createForm extends Component {
  static contextType = CreateQuestionContext;
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    this.context.handleReorder(result.source.index, result.destination.index);
  }
  render() {
    var _newArray = [];
    this.context.data.forEach((element) => {
      if (element.type === "SECTION") {
        _newArray.push(element);
      }
    });
    return (
      <React.Fragment>
        <AppNavbar showpanel />
        <main className="ebs-main" role="main">
          <div className="container-form">
            <div className="ebs-newform-wrapper">
              <div className="ebs-tooltip-wrapper">
                <ul>
                  <li
                    onClick={(e) => this.context.handleTooltip("ADD_QUESTION")}
                  >
                    <span className="material-icons">add_circle_outline</span>
                  </li>
                  <li
                    onClick={(e) =>
                      this.context.handleTooltip("ADD_TITLE_DESCRIPTION")
                    }
                  >
                    <span className="material-icons">text_fields</span>
                  </li>
                  <li onClick={(e) => this.context.handleTooltip("ADD_PHOTO")}>
                    <span className="material-icons">photo</span>
                  </li>
                  <li onClick={(e) => this.context.handleTooltip("ADD_VIDEO")}>
                    <span className="material-icons">slideshow</span>
                  </li>
                  <li
                    onClick={(e) => this.context.handleTooltip("ADD_SECTION")}
                  >
                    <span className="material-icons">storage</span>
                  </li>
                </ul>
              </div>
              <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {this.context.data &&
                        this.context.data.map((item, k) => (
                          <React.Fragment key={k}>
                            {item.type === "SECTION" && item.index === 0 && (
                              <Section
                                data={_newArray}
                                onClick={this.context.handleChange}
                                index={item.index}
                                value={item}
                              />
                            )}
                            {item.type === "SECTION" && item.index > 0 && (
                              <Draggable
                                isDragDisabled={true}
                                key={item.index}
                                draggableId={`item-${item.index}`}
                                index={k}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <Section
                                      data={_newArray}
                                      onClick={this.context.handleChange}
                                      index={item.index}
                                      value={item}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            )}

                            {(item.type === "multiple_choice" ||
                              item.type === "checkboxes" ||
                              item.type === "drop_down" ||
                              item.type === "short_answer" ||
                              item.type === "paragraph" ||
                              item.type === "linear_scale" ||
                              item.type === "multiple_choice_grid" ||
                              item.type === "tick_box_grid" ||
                              item.type === "date" ||
                              item.type === "time") && (
                              <Draggable
                                key={item.index}
                                isDragDisabled={this.context.data.length > 2 ? false : true}
                                draggableId={`item-${item.index}`}
                                index={k}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                  >
                                    <Question
                                      isDragging={snapshot.isDragging}
                                      dragHandle={provided.dragHandleProps}
                                      data={item}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            )}
                          </React.Fragment>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}
