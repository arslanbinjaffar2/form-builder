import React, { createContext, Component }  from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const data = [
  { 
    id: 0,
    title: 'Event Registration',
    lastModified: '2021-08-17 11:00',
    screenShot: '',
    published: true,
    form:[]
  },{
    id: 1,
    title: 'Party Invite',
    lastModified: '2021-04-11 15:00',
    screenShot: '',
    published: true,
    form:[]
  }
];



export const FormDataContext = createContext();
class FormDataContextProvider extends Component {
  state = {
    data: [],
    processing:false,
    processError:null,
    currentForm:null
  }
  render() {
    const CancelToken = axios.CancelToken;
    const signal = CancelToken.source();

    const handleSave = (content,type) => {
      // const data = [...this.state.data];
      // const _question  = {
      //   id: this.state.data.length,
      //   title: content[0].title,
      //   description: content[0].desc,
      //   lastModified: new Date(),
      //   screenShot: '',
      //   published: true,
      //   form: content,
      // }
      // data.push(JSON.parse(JSON.stringify(_question)));
      // this.setState({
      //   data: data
      // },() => {
      //   if (type === 'SAVE') {
      //     this.props.history.push('/')
      //   } else {
      //     localStorage.setItem('id',this.state.data.length)
      //     this.props.history.push('/form/view');
      //   }
      // })
    }
    
    const createForm = async (content, callBack) => {
      console.log(content);
      const data = [...this.state.data];
      this.setState({
        processing:true,
        processError:null,
      })
      try {
        const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/createForm/11`, content, {cancelToken: signal.token});
        data.push(response.data.data);
        console.log(response.data.data);
        if(response.data.status === 1){
            this.setState({
              processing:false,
              data:data,
              currentForm:response.data.data
            }
            ,
            () => {
                callBack();
                this.props.history.push( `/form/update/${response.data.data.id}`);
              }
            )
        }
        else{
          this.setState({
            processing:false,
            processError:response.data.message
          })
        }
       
      } catch (error) {
        console.error(error);
        this.setState({
          processing:false,
          processError:error.message
        })
      }
    }

    const getForms = async () => {
      this.setState({
        processing:true,
        processError:null,
      })
      try {
        const response = await axios.get(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/getForms/11`, {cancelToken: signal.token});
        console.log(response.data.data);
        if(response.data.status === 1){
            this.setState({
              processing:false,
              data:response.data.data
            }
            )
        }
        else{
          this.setState({
            processing:false,
            processError:response.data.message
          })
        }
       
      } catch (error) {
        console.error(error);
        this.setState({
          processing:false,
          processError:error.message
        })
      }
    }
    const cancelAllRequests = () => {
      signal.cancel();
      this.setState({
        processing:false,
        processError:null,
        data:[]
      })
    }

    const setCurrentForm = (id) => {
      console.log(this.state.data.find((item)=>(item.id === id)))
      this.setState({
        currentForm:this.state.data.find((item)=>(item.id === id)).id
      }
      ,
      () => {
          this.props.history.push(`/form/update/${this.state.data.find((item)=>(item.id === id)).id}`);
        }
      )
    }

    return (
     <FormDataContext.Provider value={{...this.state,handleSave, createForm, cancelAllRequests, getForms, setCurrentForm}}>
        {this.props.children}
     </FormDataContext.Provider>
    )
  }
}
export default withRouter(FormDataContextProvider)
