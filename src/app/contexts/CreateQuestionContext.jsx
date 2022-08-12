import React, { createContext, Component } from 'react';
import axios from 'axios'
const _answerboxshortOption = {
  response_validation: false,
};
const _answerboxshortValidation = {
  customError: '',
  type: 'NUMBER',
  rule: 'GREATER_THAN',
  value: '',
};
const _answerboxparaOption = {
  response_validation: false,
};
const _answerboxparaValidation = {
  custom_error: '',
  type: 'LENGTH',
  rule: 'MAX_CHAR_COUNT',
  value: '',
};

const _checkboxOption = {
  response_validation: false,
};

const _checkboxvalidation = {
  type: 'AT_LEAST',
  value: '',
};

const _linearscaleOption = {
  min: '1',
  max: '5',
  min_label: '',
  max_label: '',
}

const _mulitplechoiceOptions = {
  add_other: false,
  section_based: false,
  
};
const _mulitplechoiceAnswers = [
    {
      label: 'Option 1',
      next_section: 'CONTINUE'
    }
  ];
const _mulitplechoicegridOptions = {
  limit: false,
  shuffle: false,
};

const _mulitplechoicegridRows= [
  {
    label: 'Row 1',
  },
  {
    label: 'Row 2',
  },
  ];
const _mulitplechoicegridColumns=[
  {
    label: 'Column 1',
  },
  {
    label: 'Column 2',
  },
];



const _datemoduleOptions = {
  date: true,
  year: false,
  time: false,
};
const _timemoduleOptions = {
  time_type: 'TIME'
};
const _newquestion = {
  title: 'Question',
  type: 'multiple_choice',
  required: false,
  description: '',
  active: false,
  sort_order:0,
  options: {
    description_visible: true,
    add_other: false,
    section_based: false,
  },
  answers: [
    {
      label: 'Option 1',
      next_section: 'CONTINUE'
    }
  ]
};
const _newsection = {
  title: 'Untitled Section',
  description: 'Form Description',
  next_section: 'CONTINUE',
  form_builder_form_id:0,
  active: false,
  sort_order: 0,
};
const _newtextarea = {
  index: '',
  type: 'TEXT_BLOCK',
  title: 'Untitled Title',
  desc: 'Form Description',
  descVisible: true,
  active: false,

};
// const _data = [
//   {
//     index: 0,
//     type: 'SECTION',
//     title: 'Form Title',
//     desc: 'Form Description',
//     nextSection: 'CONTINUE',
//     active: true,

//   }, {
//     index: 1,
//     title: 'Question',
//     type: 'multiple_choice',
//     required: false,
//     description: '',
//     descVisible: true,
//     active: false,
//     options: {
//       addOther: false,
//       section_based: false,
//       response: null,
//       answers: [
//         {
//           label: 'Option 1',
//           nextSection: 'CONTINUE'
//         }
//       ]
//     }
//   }
// ]

export const CreateQuestionContext = createContext();
export default class CreateQuestionContextProvider extends Component {
  state = {
    data: [],
    loading:false,
    loadingError:null,
    updating:false,
    updatingError:null,
    sortSection: false,
  }
  render() {
    const CancelToken = axios.CancelToken;
    const signal = CancelToken.source();

    const getFormData = async (form_id) => {
      console.log(form_id);
      this.setState({
        loading:true,
        loadingError:null,
      })
      try {
        const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/getForm/11`, {form_id:form_id}, {cancelToken: signal.token});
        console.log(response.data.data);
        if(response.data.status === 1){
            this.setState({
              loading:false,
              data:{...response.data.data, sections:response.data.data.sections.map((item, i)=>({...item, active: i === 0 ? true : false}))},
            })
        }
        else{
          this.setState({
            loading:false,
            loadingError:response.data.message
          })
        }
       
      } catch (error) {
        console.error(error);
        this.setState({
          loading:false,
          loadingError:error.message
        })
      }
    }
    
    const saveSection = async (data) => {
      console.log(data);
      this.setState({
        updating:true,
        updatingError:null,
      })
      try {
        const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/saveSection/11`, data, {cancelToken: signal.token});
        console.log(response.data.data);
        if(response.data.status === 1){
          if(data.id === undefined){
            this.setState({
              updating:false,
              data:{...this.state.data, sections:this.state.data.sections.map((item)=> item.sort_order === data.sort_order ? { ...item, id:response.data.data.section_id} : item)},
            })
            saveSectionSortBackend(this.state.data.sections.reduce((ack, item)=>({...ack,[item.id]:item.sort_order}), {}));
          }else{
            this.setState({
              updating:false,
            })
          }
        }
        else{
          this.setState({
            updating:false,
            updatingError:response.data.message
          })
        }
       
      } catch (error) {
        console.error(error);
        this.setState({
          updating:false,
          updatingError:error.message
        })
      }
    }
    const saveSectionSortBackend = async (data) => {
      this.setState({
        updating:true,
        updatingError:null,
      })
      try {
        const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/saveSectionSort/11`, data, {cancelToken: signal.token});
        console.log(response.data.data);
        if(response.data.status === 1){
          this.setState({
            updating:false,
          })
        }
        else{
          this.setState({
            updating:false,
            updatingError:response.data.message
          })
        }
        
      } catch (error) {
        console.error(error);
        this.setState({
          updating:false,
          updatingError:error.message
        })
      }
    } 
    
    const addQuestion = async (data, sectionIndex, questionIndex) => {
      console.log(data);
      this.setState({
        updating:true,
        updatingError:null,
      })
      try {
        const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/addQuestion/11`, data, {cancelToken: signal.token});
        console.log(response.data.data);
        if(response.data.status === 1){
          if(data.id === undefined){
            const _sections = [...this.state.data.sections];
            _sections[sectionIndex].questions[questionIndex] = response.data.data;
            console.log(_sections);
            this.setState({
              updating:false,
              data:{...this.state.data, sections:_sections},
            })
            // saveSectionSortBackend(this.state.data.sections.reduce((ack, item)=>({...ack,[item.id]:item.sort_order}), {}));
          }else{
            this.setState({
              updating:false,
            })
          }
        }
        else{
          this.setState({
            updating:false,
            updatingError:response.data.message
          })
        }
       
      } catch (error) {
        console.error(error);
        this.setState({
          updating:false,
          updatingError:error.message
        })
      }
    }

    const saveQuestion = async (data) => {
      console.log(data);
      // this.setState({
      //   loading:true,
      //   loadingError:null,
      // })
      // try {
      //   const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/saveSection/11`, data, {cancelToken: signal.token});
      //   console.log(response.data.data);
      //   if(response.data.status === 1){
      //       this.setState({
      //         loading:false,
      //         data:response.data.data,
      //       })
      //   }
      //   else{
      //     this.setState({
      //       loading:false,
      //       loadingError:response.data.message
      //     })
      //   }
       
      // } catch (error) {
      //   console.error(error);
      //   this.setState({
      //     loading:false,
      //     loadingError:error.message
      //   })
      // }
    }

    const saveSectionSort = async (data) => {
      console.log(data);
      // this.setState({
      //   loading:true,
      //   loadingError:null,
      // })
      // try {
      //   const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/saveSection/11`, data, {cancelToken: signal.token});
      //   console.log(response.data.data);
      //   if(response.data.status === 1){
      //       this.setState({
      //         loading:false,
      //         data:response.data.data,
      //       })
      //   }
      //   else{
      //     this.setState({
      //       loading:false,
      //       loadingError:response.data.message
      //     })
      //   }
       
      // } catch (error) {
      //   console.error(error);
      //   this.setState({
      //     loading:false,
      //     loadingError:error.message
      //   })
      // }
    }

    const saveQuestionSort = async (data) => {
      console.log(data);
      // this.setState({
      //   loading:true,
      //   loadingError:null,
      // })
      // try {
      //   const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/saveSection/11`, data, {cancelToken: signal.token});
      //   console.log(response.data.data);
      //   if(response.data.status === 1){
      //       this.setState({
      //         loading:false,
      //         data:response.data.data,
      //       })
      //   }
      //   else{
      //     this.setState({
      //       loading:false,
      //       loadingError:response.data.message
      //     })
      //   }
       
      // } catch (error) {
      //   console.error(error);
      //   this.setState({
      //     loading:false,
      //     loadingError:error.message
      //   })
      // }
    }



    const cancelAllRequests = () => {
      signal.cancel();
      this.setState({
        data: [],
        loading:false,
        loadingError:null,
        updating:false,
        updatingError:null,
        sortSection: false,
      })
    }

    const handleChange = (sectionIndex) => {
      var _sections = [...this.state.data.sections];
        _sections.forEach((element, k) => {
          element.active = false;
          if(element.questions){
            element.questions.forEach((q)=>{
              q.active = false;
            });
          }
      });
      _sections[sectionIndex].active = true;
      this.setState({
        data:{...this.state.data, sections:_sections}
      })
    }
    
    const handleQuestionChange = (sectionIndex, questionIndex) => {
      var _sections = [...this.state.data.sections];
      _sections.forEach((element, k) => {
          element.active = false;
          if(element.questions){
            element.questions.forEach((q)=>{
              q.active = false;
            });
          }
      });
      _sections[sectionIndex].active = true;
      _sections[sectionIndex].questions[questionIndex].active = true;
      this.setState({
        data:{...this.state.data, sections:_sections}
      })
    }
    const handleSectionSortGrid = (section) => {
      let _section = [];
      var counter = 0;
      const _data = [...this.state.data];
      _data.forEach(element => {
        if (element.type === 'SECTION') {
          counter = element.index === 0 ? 0 : counter + 1;
          let items = {
            section: []
          }
          items.section.push(element);
          _section.push(items);
        } else {
          _section[counter].section.push(element); 
        }
      });
      const _sortdata = [];
      section.forEach(element => {
        const _index = element.index;
        _section.forEach((el,i) => {
          let _get = el.section.findIndex(x => x.index === _index);
          if (_get === 0) {
            _sortdata.push(..._section[i].section)
            return false;
          }
        });
      });
      
      _sortdata.forEach((item, k) => item.index = k);
      this.setState({
        data: _sortdata,
        sortSection: false
      })
    }
    const handleSectionSort = () => {
      this.setState({
        sortSection: !this.state.sortSection
      })
    }
    const handleTooltip = (type, form_id) => {
      let _data= [];
      let _itemIndex = 0;
      const _section = [...this.state.data.sections];
      let _sectionIndex = _section.findIndex(x => x.active === true) !== -1 ? _section.findIndex(x => x.active === true) : 0;
      if (type === 'ADD_QUESTION') {
          let _questionIndex = 0;
          let _clone = JSON.parse(JSON.stringify(_newquestion));

          if(_section[_sectionIndex].questions === undefined){
            _section[_sectionIndex].questions = [_clone];
            _section[_sectionIndex].questions[0].active = true;
          }else{
            _questionIndex = _section[_sectionIndex].questions.findIndex(x => x.active === true) !== -1 ? _section[_sectionIndex].questions.findIndex(x => x.active === true) : 0;
            _section[_sectionIndex].questions.splice(_questionIndex + 1, 0, _clone);
            _section[_sectionIndex].questions[_questionIndex].active = false;
            _section[_sectionIndex].questions[_questionIndex + 1].active = true;
            _section[_sectionIndex].questions.forEach((element, k) => {
              element.sort_order = k;
            });          
          }
      }
      if (type === 'ADD_SECTION') {
        let _clone = JSON.parse(JSON.stringify(_newsection));
        _section.splice(_sectionIndex + 1, 0, _clone);
        _section[_sectionIndex].active = false;
        _section[_sectionIndex + 1].active = true;
        _section[_sectionIndex + 1].form_builder_form_id = parseInt(form_id);
        _section.forEach((element, k) => {
          element.sort_order = k;
        });
        console.log(_section);
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
        data: {...this.state.data, sections:_section}
      })
    };
    const handleReorder = (source, destination) => {
      const _sections = [...this.state.data.sections];
      
      if (source.droppableId !== destination.droppableId) {
        const sourceSection = _sections[parseInt(source.droppableId)];
        const destSection = _sections[parseInt(destination.droppableId)];
        const sourceQuestions = [...sourceSection.questions];
        const destQuestion = destSection.questions ? [...destSection.questions] : [];
        const [removed] = sourceQuestions.splice(source.index, 1);
        destQuestion.splice(destination.index, 0, removed);
        _sections[parseInt(source.droppableId)].questions = sourceQuestions;
        _sections[parseInt(destination.droppableId)].questions = destQuestion;
        // save in backend
      }
      else{
        const section = _sections[source.droppableId];
        const copiedQuestions = [...section.questions];
        const [removed] = copiedQuestions.splice(source.index, 1);
        copiedQuestions.splice(destination.index, 0, removed);
        _sections[source.droppableId].questions = copiedQuestions;
        // save in backend
      }

      this.setState({
        data: {...this.state.data, sections:_sections}
      })
      handleQuestionChange(parseInt(destination.droppableId), destination.index);
    }
    const handleMultiChoiceReorder = (index, startIndex, endIndex) => {
      const result = [...this.state.data];
      const option = result[index].options.answers;
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
      const _sections = [...this.state.data.sections];
      _sections[index][name] = event.value;
      this.setState({
        data: {...this.state.data, sections:_sections}
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
    const handleChangeValue = (sectionIndex, questionIndex, event, name) => {
      event.style.height = name === 'description' ? '35px' : name === 'title' ? '42px' : '';
      var _height = event.scrollHeight;
      event.style.height = _height + 'px';
      const _sections = [...this.state.data.sections];
      _sections[sectionIndex].questions[questionIndex][name] = event.value;
      this.setState({
        data: {...this.state.data, sections:_sections}
      })

    }
    const handleChangeDateTime = (sectionIndex, questionIndex,  type) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];
      if (type === 'INCLUDE_TIME') {
        _query.options.time = !_query.options.time;
      }
      if (type === 'INCLUDE_YEAR') {
        _query.options.year = !_query.options.year;
      }
      if (type === 'TIME_DURATION') {
        _query.options.time_type = _query.options.time_type === 'TIME' ? 'DURATION' : 'TIME';
      }
      this.setState({
        data: {...this.state.data, sections:_sections}
      })
    }
    const handleSectionPanel = (value, type, id) => {
      let _sections = [...this.state.data.sections];
      let _section = [];
      const _id = id;
      for (let i = _id; i < _sections.length; i++) {
        const element = _sections[i];
        if (i !== _id && element.type === "SECTION") {
          break;
        } else {
          _section.push(element);
        }
      }
      if (type === "DELETE") {
        _sections = _sections.filter((el) => !_section.includes(el));
      }
      if (type === "DUPLICATE") {
        _sections.splice(_id, 0, ..._section);
        _sections = JSON.parse(JSON.stringify(_sections));
      }
      if (type === 'MERGE') {
        _sections.splice(_id, 1);
        _sections = JSON.parse(JSON.stringify(_sections));
      }
      _sections.forEach((el, k) => {
        el.index = k;
        el.active = false;
      });
      _sections[type === "DELETE" || type === 'MERGE' ? 0 : _id].active = true;

      this.setState({
        data: {...this.state.data, sections:_sections},
      });
    };
    const handleLinerChange = (sectionIndex, questionIndex, value, type) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

      if (type === 'LINEAR_MIN') {
        _query.options.min = value;
      }
      if (type === 'LINEAR_MAX') {
        _query.options.max = value;
      }
      if (type === 'MIN_LABEL') {
        _query.options.min_label = value;
      }
      if (type === 'MAX_LABEL') {
        _query.options.max_label = value;
      }

      this.setState({
        data: {...this.state.data, sections:_sections}
      })
    };
    const handleGridChoice = (sectionIndex, questionIndex, value, type, key) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];
      if (type === 'RESPONSE') {
        _query.options.limit = !_query.options.limit;
      }
      if (type === 'SHUFFLE') {
        _query.options.shuffle = !_query.options.shuffle;
      }
      if (type === 'INPUT_ROW') {
        _query.grid_questions[key].label = value;
      }
      if (type === 'INPUT_COLUMN') {
        _query.answers[key].label = value;
      }
      if (type === 'DELETE_ROW') {
        _query.grid_questions.splice(key, 1);
      };
      if (type === 'DELETE_COLUMN') {
        _query.answers.splice(key, 1);
      };
      if (type === 'ADD_ROW') {
        let _number = _query.grid_questions.length + 1;
        let _option = `Row ${_number}`;
        _query.grid_questions.push({label:_option});
      }
      if (type === 'ADD_COLUMN') {
        let _number = _query.answers.length + 1;
        let _option = `Column ${_number}`;
        _query.answers.push({label:_option});
      }

      this.setState({
        data: {...this.state.data, sections:_sections}
      })
    };
    const handleChangeSectionSelect = (event, index) => {
      const _sections = [...this.state.data.sections];
      _sections[index].nextSection = event;
      this.setState({
        data: {...this.state.data, sections:_sections}
      })
    }

    // const handleChangeValueOption = (a, b, c, key) => {
      // const _data = [...this.state.data];
      // const _query = _data[_data.findIndex((x) => x.index === c * 1)];
      // if (b === 'SECTION_BASED_SELECT') {
      //   _query.options.answers[key].nextSection = a;
      // }
      // if (b === 'CHANGE') {
      //   _query.options.answers[key].label = a;
      // }
      // if (b === 'BLUR') {
      //   if (a.replace(/\s/g, '') === '') {
      //     _query.options.answers[key].label = `Option ${key + 1}`;
      //   } else {
      //     return false;
      //   }
      // }
      // if (b === 'DELETE') {
      //   _query.options.answers.splice(key, 1)
      // }
      // if (b === 'ADD') {
      //   let _number = _query.options.answers.length + 1;
      //   const _option = {
      //     label: `Option ${_number}`,
      //     nextSection: 'CONTINUE'
      //   }
      //   _query.options.answers.push(_option);
      // }
      // if (b === 'REMOVEOTHER') {
      //   _query.options.addOther = false;
      // }
      // if (b === 'ADDOTHER') {
      //   _query.options.addOther = true;
      // }
      // if (b === 'CHECKBOX_VALIDATION') {
      //   _query.options.response_validation = !_query.options.response_validation;
      // }
      // if (b === 'DESCRIPTION') {
      //   _query.descVisible = !_query.descVisible;

      //   if (!_query.descVisible) {
      //     _query.description = '';
      //   }

      // }
      // if (b === 'TYPE') {
      //   const _prevType = _query.type;
      //   _query.type = a;
      //   if (a === 'time' && _prevType !== 'time') {
      //     _query.options = JSON.parse(JSON.stringify(_timemodule));
      //   }
      //   if (a === 'date' && _prevType !== 'date') {
      //     _query.options = JSON.parse(JSON.stringify(_datemodule));
      //   }
      //   if (a === 'linear_scale' && _prevType !== 'linear_scale') {
      //     _query.options = JSON.parse(JSON.stringify(_linearscale));
      //   }
      //   if (a === 'multiple_choice_grid' && _prevType !== 'multiple_choice_grid' && _prevType !== 'tick_box_grid') {
      //     _query.options = JSON.parse(JSON.stringify(_mulitplechoicegrid));
      //   }
      //   if (a === 'tick_box_grid' && _prevType !== 'tick_box_grid' && _prevType !== 'multiple_choice_grid') {
      //     _query.options = JSON.parse(JSON.stringify(_mulitplechoicegrid));
      //   }
      //   if (a === 'short_answer' && _prevType !== 'short_answer') {
      //     _query.options = JSON.parse(JSON.stringify(_answerboxshort));
      //   }
      //   if (a === 'paragraph' && _prevType !== 'paragraph') {
      //     _query.options = JSON.parse(JSON.stringify(_answerboxpara));
      //   }
      //   if ((a === 'multiple_choice' || a === 'checkboxes' || a === 'drop_down') && _prevType !== 'multiple_choice' && _prevType !== 'checkboxes' && _prevType !== 'drop_down') {
      //     _query.options = JSON.parse(JSON.stringify(_mulitplechoiceOptions));
      //   }
      //   if ((a === 'multiple_choice' || a === 'drop_down') && (_prevType !== 'multiple_choice' || _prevType !== 'drop_down')) {
      //     _query.options.section_based = false;
      //   }
      //   if ((a === 'multiple_choice' || a === 'drop_down') && _prevType === 'checkboxes') {
      //     _query.options.response = null;

      //   }
      //   if (a === 'checkboxes' && _prevType !== 'checkboxes') {
      //     _query.options.section_based = false;
      //     _query.options.response = JSON.parse(JSON.stringify(_checkboxvalidation));
      //     _query.options.answers.forEach(element => {
      //       element.nextSection = 'CONTINUE'
      //     });
      //   }
      // }
      // if (b === 'REQUIRED') {
      //   _query.required = a;
      // }
      // if (b === 'DELETEQUESTION') {
       
      //   let _ind = _data.findIndex(x => x.index === c * 1);
      //   _data.splice(_ind, 1);
      //   _data.forEach((item, k) => item.index = k);
      //   _data[Number(c) >= 1 ? Number(c) - 1 : 0].active = true;
      // }
      // if (b === 'RESPONSE_VALIDATION') {
      //   _query.options.response_validation = !_query.options.response_validation;
      // }
      // if (b === 'CLONEQUESTION') {
      //   let _itemIndex = _data.findIndex((x) => x.index === c * 1)
      //   const _clone = JSON.parse(JSON.stringify(_query));
      //   _data.splice(_itemIndex, 0, _clone);
      //   _data.forEach((element, k) => {
      //     element.index = k;
      //     element.active = false;
      //   });
      //   _data[_itemIndex + 1].active = true;

      // }
      // if (b === 'SECTION_BASE') {
      //   _query.options.section_based = !_query.options.section_based;
      // }
      // if (b === 'CHECKBOX_RESPONSE_VALUE') {
      //   _query.options.response.value = a;
      // }
      // if (b === 'CHECKBOX_RESPONSE_ERROR') {
      //   _query.options.response.error = a;
      // }
      // if (b === 'CHECKBOX_RESPONSE_VALIDATION_SELECT_TYPE') {
      //   _query.options.response.type = a;
      // }
      // if (b === 'RESPONSE_VALIDATION_SELECT_TYPE') {
      //   _query.options.type = a;
      //   if (a === 'NUMBER') {
      //     _query.options.rule = 'GREATER_THAN';
      //   }
      //   if (a === 'TEXT') {
      //     _query.options.rule = 'CONTAINS';
      //   }
      //   if (a === 'LENGTH') {
      //     _query.options.rule = 'MAX_CHAR_COUNT';
      //   }
      //   if (a === 'REGULAR_EXPRESSION') {
      //     _query.options.rule = 'CONTAINS';
      //   }
      //   _query.options.value = '';
      //   _query.options.error = '';
      // }
      // if (b === 'RESPONSE_VALIDATION_SELECT_RULE') {
      //   _query.options.rule = a;
      //   _query.options.value = '';
      //   _query.options.error = '';
      // }
      // if (b === 'VALIDATION_FORM_FIELDS') {
      //   _query.options.value = a;
      // }
      // if (b === 'VALIDATION_ERROR_FIELDS') {
      //   _query.options.error = a;
      // }
      // this.setState({
      //   data: _data
      // })
    // }

    const changeQuestionType = async (sectionIndex, questionIndex, type) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];
      const _prevType = _query.type;
        _query.type = type;
        if (type === 'time' && _prevType !== 'time') {
          _query.options = JSON.parse(JSON.stringify(_timemoduleOptions));
        }
        if (type === 'date' && _prevType !== 'date') {
          _query.options = JSON.parse(JSON.stringify(_datemoduleOptions));
        }
        if (type === 'linear_scale' && _prevType !== 'linear_scale') {
          _query.options = JSON.parse(JSON.stringify(_linearscaleOption));
        }
        if (type === 'multiple_choice_grid' && _prevType !== 'multiple_choice_grid' && _prevType !== 'tick_box_grid') {
          _query.options = JSON.parse(JSON.stringify(_mulitplechoicegridOptions));
          _query.grid_questions = JSON.parse(JSON.stringify(_mulitplechoicegridRows));
          _query.answers = JSON.parse(JSON.stringify(_mulitplechoicegridColumns));
        }
        if (type === 'tick_box_grid' && _prevType !== 'tick_box_grid' && _prevType !== 'multiple_choice_grid') {
          _query.grid_questions = JSON.parse(JSON.stringify(_mulitplechoicegridRows));
          _query.answers = JSON.parse(JSON.stringify(_mulitplechoicegridColumns));
          _query.options = JSON.parse(JSON.stringify(_mulitplechoicegridOptions));
        }
        if (type === 'short_answer' && _prevType !== 'short_answer') {
          _query.options = JSON.parse(JSON.stringify(_answerboxshortOption));
          _query.validation = JSON.parse(JSON.stringify(_answerboxshortValidation));
        }
        if (type === 'paragraph' && _prevType !== 'paragraph') {
          _query.options = JSON.parse(JSON.stringify(_answerboxparaOption));
          _query.validation = JSON.parse(JSON.stringify(_answerboxparaValidation));
        }
        if ((type === 'multiple_choice' || type === 'checkboxes' || type === 'drop_down') && _prevType !== 'multiple_choice' && _prevType !== 'checkboxes' && _prevType !== 'drop_down') {
          _query.options = JSON.parse(JSON.stringify(_mulitplechoiceOptions));
          _query.answers = JSON.parse(JSON.stringify(_mulitplechoiceAnswers));
        }
        if ((type === 'multiple_choice' || type === 'drop_down') && (_prevType !== 'multiple_choice' || _prevType !== 'drop_down')) {
          _query.options.section_based = false;
        }
        if ((type === 'multiple_choice' || type === 'drop_down') && _prevType === 'checkboxes') {
          _query.options.response = null;

        }
        if (type === 'checkboxes' && _prevType !== 'checkboxes') {
          _query.options.section_based = false;
          _query.validation = JSON.parse(JSON.stringify(_checkboxvalidation));
          _query.answers.forEach(element => {
            element.nextSection = 'CONTINUE'
          });
        }

        this.setState({
          data: {...this.state.data, sections:_sections}
        })
    
    }

    const changeQuestionRequiredStatus = async (sectionIndex, questionIndex, status) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];
        _query.required = status;
        this.setState({
          data: {...this.state.data, sections:_sections}
        })
    }
    
    const deleteQuestion = async (sectionIndex, questionIndex, status) => {
      const _sections = [...this.state.data.sections];

      _sections[sectionIndex].questions.splice(questionIndex, 1);
      _sections[sectionIndex].questions.forEach((item, k) => item.index = k);
      _sections[sectionIndex].questions[Number(questionIndex) >= 1 ? Number(questionIndex) - 1 : 0].active = true;

        this.setState({
          data: {...this.state.data, sections:_sections}
        })
    }
    
    const setQuestionResponseValidation = async (sectionIndex, questionIndex, status) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];
        _query.options.response_validation = !_query.options.response_validation;
        this.setState({
          data: {...this.state.data, sections:_sections}
        })
    }
    
    const cloneQuestion = async (sectionIndex, questionIndex, status) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

      const _clone = JSON.parse(JSON.stringify(_query));
      _sections[sectionIndex].questions.splice(questionIndex, 0, _clone);
      _sections[sectionIndex].questions.forEach((element, k) => {
        element.index = k;
        element.active = false;
      });
      
      _sections[sectionIndex].questions[questionIndex + 1].active = true;

        this.setState({
          data: {...this.state.data, sections:_sections}
        })
    }
    
    const setSectionBase = async (sectionIndex, questionIndex, status) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

        _query.options.section_based = !_query.options.section_based;

        this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    const setResponseValidationType = async (sectionIndex, questionIndex, type) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

      _query.options.type = type;
      if (type === 'NUMBER') {
        _query.options.rule = 'GREATER_THAN';
      }
      if (type === 'TEXT') {
        _query.options.rule = 'CONTAINS';
      }
      if (type === 'LENGTH') {
        _query.options.rule = 'MAX_CHAR_COUNT';
      }
      if (type === 'REGULAR_EXPRESSION') {
        _query.options.rule = 'CONTAINS';
      }
      _query.options.value = '';
      _query.options.error = '';

        this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }

    const setResponseValidationRule = async (sectionIndex, questionIndex, type) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

        _query.options.rule = type;
        _query.options.value = '';
        _query.options.error = '';
     
        this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    const setResponseValidationFeildValue = async (sectionIndex, questionIndex, type) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

        _query.validation.value = type;
     
        this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    const setResponseValidationFeildError = async (sectionIndex, questionIndex, type) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

        _query.validation.custom_error = type;
     
        this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    
    const setResponseValidationCheckBoxValue = async (sectionIndex, questionIndex, value) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

        _query.options.response.value = value;

        this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    const setResponseValidationCheckBoxError = async (sectionIndex, questionIndex, error) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

        _query.options.response.error = error;


        this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    
    const setResponseValidationCheckBoxType = async (sectionIndex, questionIndex, type) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

        _query.options.response.type = type;

        this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    const setNextSection = async (sectionIndex, questionIndex, type, key) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

            _query.options.answers[key].nextSection = type;

          this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    
    const setAnswersOnChange = async (sectionIndex, questionIndex, type, key) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

          _query.answers[key].label = type;

          this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    const setAnswersOnBlur = async (sectionIndex, questionIndex, type, key) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

            if (type.replace(/\s/g, '') === '') {
              _query.answers[key].label = `Option ${key + 1}`;
            } else {
              return false;
            }
          this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    const deleteAnswers = async (sectionIndex, questionIndex, type, key) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

      _query.answers.splice(key, 1)
          this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    const addAnswers = async (sectionIndex, questionIndex, type) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

      let _number = _query.answers.length + 1;
      const _option = {
        label: `Option ${_number}`,
        nextSection: 'CONTINUE'
      }
      _query.answers.push(_option);

          this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
   
    const removeOther = async (sectionIndex, questionIndex, type, key) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

      _query.options.add_other = false;


      _query.answers.splice(key, 1)
          this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    const addOther = async (sectionIndex, questionIndex, type, key) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

      _query.options.add_other = true;


      _query.answers.splice(key, 1)
          this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }

    const setResponseValidation = async (sectionIndex, questionIndex, type, key) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

      _query.options.response_validation = !_query.options.response_validation;
          this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    const setDescription = async (sectionIndex, questionIndex) => {
      console.log(sectionIndex);
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

      _query.options.description_visible = !_query.options.description_visible;

      if (!_query.options.description_visible) {
        _query.description = '';
      }

          this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    





    return (
      <CreateQuestionContext.Provider
        value={{
          ...this.state,
          handleChange,
          handleQuestionChange,
          handleChangeValue,
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
          handleSectionPanel,
          handleSectionSort,
          handleSectionSortGrid,
          changeQuestionType,
          changeQuestionRequiredStatus,
          deleteQuestion,
          setQuestionResponseValidation,
          cloneQuestion,
          setSectionBase,
          setResponseValidationType,
          setResponseValidationRule,
          setResponseValidationFeildValue,
          setResponseValidationFeildError,
          setResponseValidationCheckBoxValue,
          setResponseValidationCheckBoxError,
          setResponseValidationCheckBoxType,
          setNextSection,
          setAnswersOnChange,
          setAnswersOnBlur,
          deleteAnswers,
          addAnswers,
          removeOther,
          addOther,
          setResponseValidation,
          setDescription,
          getFormData,
          cancelAllRequests,
          saveSection,
          addQuestion,
        }}
      >
        {this.props.children}
      </CreateQuestionContext.Provider>
    );
  }
}
