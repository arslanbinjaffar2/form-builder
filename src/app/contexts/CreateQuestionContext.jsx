import React, { createContext, Component } from 'react';

const _answerboxshort = {
  responseValidation: false,
  customError: '',
  type: 'NUMBER',
  rule: 'GREATER_THAN',
  value: '',
  error: '',
};
const _answerboxpara = {
  responseValidation: false,
  customError: '',
  type: 'LENGTH',
  rule: 'MAX_CHAR_COUNT',
  value: '',
  error: '',
};

const _checkboxvalidation = {
  responseValidation: false,
  type: 'AT_LEAST',
  value: '',
  error: '',
};

const _linearscale = {
  min: '1',
  max: '5',
  minLabel: '',
  maxLabel: '',
}
const _mulitplechoiceOptions = {
  addOther: false,
  sectionBased: false,
  response: null,
  choices: [
    {
      label: 'Option 1',
      nextSection: 'CONTINUE'
    }
  ]
};
const _mulitplechoicegrid = {
  limit: false,
  shuffle: false,
  rows: [
    "Row 1",
    "Row 2"
  ],
  columns: [
    "Column 1",
    "Column 2"
  ],
};
const _datemodule = {
  date: true,
  year: false,
  time: false,
};
const _timemodule = {
  type: 'TIME'
};
const _newquestion = {
  index: '',
  title: 'Question',
  type: 'multiple_choice',
  required: false,
  description: '',
  descVisible: true,
  active: false,
  options: {
    addOther: false,
    sectionBased: false,
    response: null,
    choices: [
      {
        label: 'Option 1',
        nextSection: 'CONTINUE'
      }
    ]
  }
};
const _newsection = {
  index: '',
  type: 'SECTION',
  title: 'Untitled Section',
  desc: 'Form Description',
  nextSection: 'CONTINUE',
  active: false,

};
const _newtextarea = {
  index: '',
  type: 'TEXT_BLOCK',
  title: 'Untitled Title',
  desc: 'Form Description',
  descVisible: true,
  active: false,

};
const _data = [
  {
    index: 0,
    type: 'SECTION',
    title: 'Form Title',
    desc: 'Form Description',
    nextSection: 'CONTINUE',
    active: true,

  }, {
    index: 1,
    title: 'Question',
    type: 'multiple_choice',
    required: false,
    description: '',
    descVisible: true,
    active: false,
    options: {
      addOther: false,
      sectionBased: false,
      response: null,
      choices: [
        {
          label: 'Option 1',
          nextSection: 'CONTINUE'
        }
      ]
    }
  }
]

export const CreateQuestionContext = createContext();
export default class CreateQuestionContextProvider extends Component {
  state = {
    data: _data,
  }
  render() {
    const handleChange = (id) => {
      var _data = [...this.state.data];
      _data.forEach(element => {
        if (element.index === id) {
          element.active = true;
        } else {
          element.active = false;
        }
      });
      this.setState({
        data: _data
      })
    }

    const handleTooltip = (type) => {
      const _data = [...this.state.data];
      let _itemIndex = _data[_data.findIndex(x => x.active === true)].index;
      if (type === 'ADD_QUESTION') {
        let _clone = JSON.parse(JSON.stringify(_newquestion));
        _data.splice(_itemIndex + 1, 0, _clone);
        _data.forEach((element, k) => {
          element.index = k;
          element.active = false;
        });
        _data[_itemIndex + 1].active = true;
      }
      if (type === 'ADD_SECTION') {
        let _clone = JSON.parse(JSON.stringify(_newsection));
        _data.splice(_itemIndex + 1, 0, _clone);
        _data.forEach((element, k) => {
          element.index = k;
          element.active = false;
        });
        _data[_itemIndex + 1].active = true;
      }
      if (type === 'ADD_TITLE_DESCRIPTION') {
        let _clone = JSON.parse(JSON.stringify(_newtextarea));
        _data.splice(_itemIndex + 1, 0, _clone);
        _data.forEach((element, k) => {
          element.index = k;
          element.active = false;
        });
        _data[_itemIndex + 1].active = true;
      }
      this.setState({
        data: _data
      })
    };
    const handleReorder = (startIndex, endIndex) => {
      const result = [...this.state.data];
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      result.forEach((item, k) => item.index = k)
      this.setState({
        data: result
      })
    }
    const handleMultiChoiceReorder = (index, startIndex, endIndex) => {
      const result = [...this.state.data];
      const option = result[index].options.choices;
      const [removed] = option.splice(startIndex, 1);
      option.splice(endIndex, 0, removed);
      result.forEach((item, k) => item.index = k);
      this.setState({
        data: result
      })
    }
    const handleMultiChoiceGridReorder = (index, startIndex, endIndex, type) => {
      const result = [...this.state.data];
      var option;
      if (type === 'rows_items') {
        option = result[index].options.rows;
      } else {
        option = result[index].options.columns;
      }
      const [removed] = option.splice(startIndex, 1);
      option.splice(endIndex, 0, removed);
      result.forEach((item, k) => item.index = k);
      this.setState({
        data: result
      })
    }
    const handleSectionArea = (event, name, index) => {
      event.style.height = name === 'desc' ? '28px' : name === 'title' ? '52px' : '';
      var _height = event.scrollHeight;
      event.style.height = _height + 'px';
      const _data = [...this.state.data];
      _data[_data.findIndex(x => x.index === index)][name] = event.value;
      this.setState({
        data: _data
      })
    }
    const handleTextArea = (event, name, index) => {
      event.style.height = name === 'desc' ? '36px' : name === 'title' ? '26px' : '';
      var _height = event.scrollHeight;
      event.style.height = _height + 'px';
      const _data = [...this.state.data];
      _data[_data.findIndex(x => x.index === index)][name] = event.value;
      this.setState({
        data: _data
      })
    }
    const handleChangeValue = (event, id, name) => {
      event.style.height = name === 'description' ? '35px' : name === 'title' ? '42px' : '';
      var _height = event.scrollHeight;
      event.style.height = _height + 'px';
      const _data = [...this.state.data];
      _data[_data.findIndex(x => x.index === id)][name] = event.value;
      this.setState({
        data: _data
      })

    }
    const handleChangeDateTime = (value, type, id) => {
      const _data = [...this.state.data];
      const _query = _data[_data.findIndex((x) => x.index === id * 1)];
      if (type === 'INCLUDE_TIME') {
        _query.options.time = !_query.options.time;
      }
      if (type === 'INCLUDE_YEAR') {
        _query.options.year = !_query.options.year;
      }
      if (type === 'TIME_DURATION') {
        _query.options.type = _query.options.type === 'TIME' ? 'DURATION' : 'TIME';
      }
      this.setState({
        data: _data
      })
    }
    const handleSectionPanel = (value, type, id) => {
      let _data = [...this.state.data];
      let _section = [];
      const _id = id;
      for (let i = _id; i < _data.length; i++) {
        const element = _data[i];
        if (i !== _id && element.type === "SECTION") {
          break;
        } else {
          _section.push(element);
        }
      }
      if (type === "DELETE") {
        _data = _data.filter((el) => !_section.includes(el));
      }
      if (type === "DUPLICATE") {
        _data.splice(_id, 0, ..._section);
        _data = JSON.parse(JSON.stringify(_data));
      }
      if (type === 'MERGE') {
        _data.splice(_id, 1);
        _data = JSON.parse(JSON.stringify(_data));
      }
      _data.forEach((el, k) => {
        el.index = k;
        el.active = false;
      });
      _data[type === "DELETE" || type === 'MERGE' ? 0 : _id].active = true;

      this.setState({
        data: _data,
      });
    };
    const handleLinerChange = (value, type, id) => {
      const _data = [...this.state.data];
      const _query = _data[_data.findIndex((x) => x.index === id * 1)];

      if (type === 'LINEAR_MIN') {
        _query.options.min = value;
      }
      if (type === 'LINEAR_MAX') {
        _query.options.max = value;
      }
      if (type === 'MIN_LABEL') {
        _query.options.minLabel = value;
      }
      if (type === 'MAX_LABEL') {
        _query.options.maxLabel = value;
      }

      this.setState({
        data: _data
      })
    };
    const handleGridChoice = (value, type, id, key) => {
      const _data = [...this.state.data];
      const _query = _data[_data.findIndex((x) => x.index === id * 1)];
      if (type === 'RESPONSE') {
        _query.options.limit = !_query.options.limit;
      }
      if (type === 'SHUFFLE') {
        _query.options.shuffle = !_query.options.shuffle;
      }
      if (type === 'INPUT_ROW') {
        _query.options.rows[key] = value;
      }
      if (type === 'INPUT_COLUMN') {
        _query.options.columns[key] = value;
      }
      if (type === 'DELETE_ROW') {
        _query.options.rows.splice(key, 1);
      };
      if (type === 'DELETE_COLUMN') {
        _query.options.columns.splice(key, 1);
      };
      if (type === 'ADD_ROW') {
        let _number = _query.options.rows.length + 1;
        let _option = `Row ${_number}`;
        _query.options.rows.push(_option);
      }
      if (type === 'ADD_COLUMN') {
        let _number = _query.options.columns.length + 1;
        let _option = `Column ${_number}`;
        _query.options.columns.push(_option);
      }

      this.setState({
        data: _data
      })
    };
    const handleChangeSectionSelect = (event,index) => {
      const _data = [...this.state.data];
      _data[_data.findIndex(x => x.index === index)].nextSection = event;
      this.setState({
        data: _data
      })
    }
    const handleChangeValueOption = (a, b, c, key) => {
      const _data = [...this.state.data];
      const _query = _data[_data.findIndex((x) => x.index === c * 1)];
      if (b === 'SECTION_BASED_SELECT') {
        _query.options.choices[key].nextSection = a;
      }
      if (b === 'CHANGE') {
        _query.options.choices[key].label = a;
      }
      if (b === 'BLUR') {
        if (a.replace(/\s/g, '') === '') {
          _query.options.choices[key].label = `Option ${key + 1}`;
        } else {
          return false;
        }
      }
      if (b === 'DELETE') {
        _query.options.choices.splice(key, 1)
      }
      if (b === 'ADD') {
        let _number = _query.options.choices.length + 1;
        const _option = {
          label: `Option ${_number}`,
          nextSection: 'CONTINUE'
        }
        _query.options.choices.push(_option);
      }
      if (b === 'REMOVEOTHER') {
        _query.options.addOther = false;
      }
      if (b === 'ADDOTHER') {
        _query.options.addOther = true;
      }
      if (b === 'CHECKBOX_VALIDATION') {
        _query.options.response.responseValidation = !_query.options.response.responseValidation;
      }
      if (b === 'DESCRIPTION') {
        _query.descVisible = !_query.descVisible;

        if (!_query.descVisible) {
          _query.description = '';
        }

      }
      if (b === 'TYPE') {
        const _prevType = _query.type;
        _query.type = a;
        if (a === 'time' && _prevType !== 'time') {
          _query.options = JSON.parse(JSON.stringify(_timemodule));
        }
        if (a === 'date' && _prevType !== 'date') {
          _query.options = JSON.parse(JSON.stringify(_datemodule));
        }
        if (a === 'linear_scale' && _prevType !== 'linear_scale') {
          _query.options = JSON.parse(JSON.stringify(_linearscale));
        }
        if (a === 'multiple_choice_grid' && _prevType !== 'multiple_choice_grid' && _prevType !== 'tick_box_grid') {
          _query.options = JSON.parse(JSON.stringify(_mulitplechoicegrid));
        }
        if (a === 'tick_box_grid' && _prevType !== 'tick_box_grid' && _prevType !== 'multiple_choice_grid') {
          _query.options = JSON.parse(JSON.stringify(_mulitplechoicegrid));
        }
        if (a === 'short_answer' && _prevType !== 'short_answer') {
          _query.options = JSON.parse(JSON.stringify(_answerboxshort));
        }
        if (a === 'paragraph' && _prevType !== 'paragraph') {
          _query.options = JSON.parse(JSON.stringify(_answerboxpara));
        }
        if ((a === 'multiple_choice' || a === 'checkboxes' || a === 'drop_down') && _prevType !== 'multiple_choice' && _prevType !== 'checkboxes' && _prevType !== 'drop_down') {
          _query.options = JSON.parse(JSON.stringify(_mulitplechoiceOptions));
        }
        if ((a === 'multiple_choice' || a === 'drop_down') && (_prevType !== 'multiple_choice' || _prevType !== 'drop_down')) {
          _query.options.sectionBased = false;
        }
        if ((a === 'multiple_choice' || a === 'drop_down') && _prevType === 'checkboxes') {
          _query.options.response = null;

        }
        if (a === 'checkboxes' && _prevType !== 'checkboxes') {
          _query.options.sectionBased = false;
          _query.options.response = JSON.parse(JSON.stringify(_checkboxvalidation));
          _query.options.choices.forEach(element => {
            element.nextSection = 'CONTINUE'
          });
        }
      }
      if (b === 'REQUIRED') {
        _query.required = a;
      }
      if (b === 'DELETEQUESTION') {
       
        let _ind = _data.findIndex(x => x.index === c * 1);
        _data.splice(_ind, 1);
        _data.forEach((item, k) => item.index = k);
        _data[Number(c) >= 1 ? Number(c) - 1 : 0].active = true;
      }
      if (b === 'RESPONSE_VALIDATION') {
        _query.options.responseValidation = !_query.options.responseValidation;
      }
      if (b === 'CLONEQUESTION') {
        let _itemIndex = _data.findIndex((x) => x.index === c * 1)
        const _clone = JSON.parse(JSON.stringify(_query));
        _data.splice(_itemIndex, 0, _clone);
        _data.forEach((element, k) => {
          element.index = k;
          element.active = false;
        });
        _data[_itemIndex + 1].active = true;

      }
      if (b === 'SECTION_BASE') {
        _query.options.sectionBased = !_query.options.sectionBased;
      }
      if (b === 'CHECKBOX_RESPONSE_VALUE') {
        _query.options.response.value = a;
      }
      if (b === 'CHECKBOX_RESPONSE_ERROR') {
        _query.options.response.error = a;
      }
      if (b === 'CHECKBOX_RESPONSE_VALIDATION_SELECT_TYPE') {
        _query.options.response.type = a;
      }
      if (b === 'RESPONSE_VALIDATION_SELECT_TYPE') {
        _query.options.type = a;
        if (a === 'NUMBER') {
          _query.options.rule = 'GREATER_THAN';
        }
        if (a === 'TEXT') {
          _query.options.rule = 'CONTAINS';
        }
        if (a === 'LENGTH') {
          _query.options.rule = 'MAX_CHAR_COUNT';
        }
        if (a === 'REGULAR_EXPRESSION') {
          _query.options.rule = 'CONTAINS';
        }
        _query.options.value = '';
        _query.options.error = '';
      }
      if (b === 'RESPONSE_VALIDATION_SELECT_RULE') {
        _query.options.rule = a;
        _query.options.value = '';
        _query.options.error = '';
      }
      if (b === 'VALIDATION_FORM_FIELDS') {
        _query.options.value = a;
      }
      if (b === 'VALIDATION_ERROR_FIELDS') {
        _query.options.error = a;
      }
      this.setState({
        data: _data
      })
    }
    return (
      <CreateQuestionContext.Provider
        value={{
          ...this.state,
          handleChange,
          handleChangeValue,
          handleChangeValueOption,
          handleLinerChange,
          handleGridChoice,
          handleChangeDateTime,
          handleTooltip,
          handleReorder,
          handleMultiChoiceReorder,
          handleMultiChoiceGridReorder,
          handleSectionArea,
          handleChangeSectionSelect,
          handleTextArea,
          handleSectionPanel
        }}
      >
        {this.props.children}
      </CreateQuestionContext.Provider>
    );
  }
}
