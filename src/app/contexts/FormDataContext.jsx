import React, { createContext, Component }  from 'react';
import { withRouter } from 'react-router-dom';
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
    data: data,
  }
  render() {
    const handleSave = (content,type) => {
      const data = [...this.state.data];
      const _question  = {
        id: this.state.data.length,
        title: content[0].title,
        description: content[0].desc,
        lastModified: new Date(),
        screenShot: '',
        published: true,
        form: content,
      }
      data.push(JSON.parse(JSON.stringify(_question)));
      this.setState({
        data: data
      },() => {
        if (type === 'SAVE') {
          this.props.history.push('/')
        } else {
          localStorage.setItem('id',this.state.data.length)
          this.props.history.push('/form/view');
        }
      })
    } 
    return (
     <FormDataContext.Provider value={{...this.state,handleSave}}>
        {this.props.children}
     </FormDataContext.Provider>
    )
  }
}
export default withRouter(FormDataContextProvider)
