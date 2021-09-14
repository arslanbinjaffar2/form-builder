import React, { createContext, Component }  from 'react';
const data = [
  { 
    id: 1,
    title: 'Event Registration',
    lastModified: '2021-08-17 11:00',
    themeColor: '#03a9f4',
    bodyColor: '#d9f2fd',
    screenShot: '',
    published: true
  },{
    id: 2,
    title: 'Party Invite',
    lastModified: '2021-04-11 15:00',
    themeColor: '#673ab7',
    bodyColor: '#f0ebf8',
    screenShot: '',
    published: true
  }
];

export const FormDataContext = createContext();
export default class FormDataContextProvider extends Component {
  state = {
    data: data,
  }
  render() {
    return (
     <FormDataContext.Provider value={{...this.state}}>
        {this.props.children}
     </FormDataContext.Provider>
    )
  }
}
