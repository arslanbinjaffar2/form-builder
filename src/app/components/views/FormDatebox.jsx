import React, { Component } from 'react';
import Select  from "react-select";
import moment from 'moment';


const customStyles = {
  control: base => ({
    ...base,
    height: 35,
    minHeight: 35,
    borderRadius: 0,
    border: 'none',
    padding: 0,
    color: '#444',
    boxShadow: null
  })
};

const _dropdown_min = [
  { value: 'AM', label:  'AM'},
  { value: 'PM', label: `PM`}
];
export default class FormDatebox extends Component {
  constructor(props) {
    super(props);
  this.state = {
    state: 0,
    hour: '',
    minutes: '',
    days: '',
    months: '',
    years: '',
    error: false
  }
  this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleCheckDate = () => {
    const date = `${this.props.data.options.year ? this.state.years : '2021'}-${this.state.months}-${this.state.days}`;
    console.log(new Date(date));
    const _valid = moment(new Date(date)).isValid();
    console.log(_valid);
      this.setState({
        error: !_valid
      })
  };
  handleInputChange = (e, type) => {
    e.preventDefault();
    const value = e.target.value;
    if (type === "HOUR") {
      if (Number(value) || value === "" || value === "0" || value === "00") {
        this.setState({
          hour: value
        },() => {
          this.handleCheckDate()
        })
      }
    }
    if (type === "MINUTE") {
      if (Number(value) || value === "" || value === "0" || value === "00") {
        this.setState({
          minutes: value
        },() => {
          this.handleCheckDate()
        })
      }
    }
    if (type === "DAYS") {
      if (Number(value) || value === "" || value === "0" || value === "00") {
        this.setState({
          days: value
        },() => {
          this.handleCheckDate()
        })
      }
    }
    if (type === "MONTHS") {
      if (Number(value) || value === "" || value === "0" || value === "00") {
        this.setState({
          months: value
        },() => {
          this.handleCheckDate()
        })
      }
    }
    if (type === "YEARS") {
      if (Number(value) || value === "" || value === "0" || value === "00" || value === "000" || value === "0000") {
        this.setState({
          years: value
        },() => {
          this.handleCheckDate()
        })
      }
    }
  }
  handleSelect = (e) => {
    this.setState({
      state: _dropdown_min.findIndex(x => x.label === e.value)
    })
  }
  render() {
    const {data} = this.props;
    const {days,months,years,minutes,hour,state,error} = this.state;
    console.log(days);
  return (
    <div className="ebs-formview-mulitple">
      <div className="form-view-title">
        {data.title && data.title} {data.required === 1 && <span className="required">*</span>}
      </div>
      {(data.options.description_visible && data.description) && <div className="form-view-description">{data.description}</div>}
      <div className="ebs-options-view">
        <div className="ebs-time-form-view">
          <div className="ebs-time-grid d-flex align-items-center ebs-duration-grid">
            <div className="ebs-box">
              <div className="ebs-title">DD</div>
              <input 
                 maxLength="2" 
                 onFocus={(e) => e.target.select()} 
                 onChange={(e) => this.handleInputChange(e, 'DAYS')} 
                 type="text" placeholder="00" 
                 value={days} />
            </div>
            <div className="ebs-box-sep">/</div>
            <div className="ebs-box">
              <div className="ebs-title">MM</div>
              <input minLength="2" maxLength="2" onFocus={(e) => e.target.select()} onChange={(e) => this.handleInputChange(e, 'MONTHS')} type="text" placeholder="00" value={months} />
            </div>
            {data.options.year && 
            <React.Fragment>
              <div className="ebs-box-sep">/</div>
              <div style={{width: 50,textAlign: 'center'}} className="ebs-box">
                <div className="ebs-title">YYYYY</div>
                <input minLength="2" maxLength="4" onFocus={(e) => e.target.select()} onChange={(e) => this.handleInputChange(e, 'YEARS')} type="text" placeholder="0000" value={years} />
              </div>
            </React.Fragment>
            }
          </div>
        </div>
      {data.options.time &&
        <div className="ebs-time-form-view">
          <h4>Time</h4>
          <div className="ebs-time-grid d-flex align-items-center">
            <div className="ebs-box">
              <input minLength="2" maxLength="2" onFocus={(e) => e.target.select()} onChange={(e) => this.handleInputChange(e,'HOUR')} type="text" placeholder="00" value={hour} />
            </div>
            <div className="ebs-box-sep">:</div>
            <div className="ebs-box">
              <input minLength="2" maxLength="2" onFocus={(e) => e.target.select()} onChange={(e) => this.handleInputChange(e,'MINUTE')} type="text" placeholder="00" value={minutes} />
            </div>
            <div className="ebs-select">
              <Select
                menuColor='red'
                maxMenuHeight="1"
                menuPlacement="auto"
                isSearchable={false}
                styles={customStyles}
                value={_dropdown_min[state]}
                onChange={this.handleSelect} 
                components={{IndicatorSeparator: () => null }}
                theme={theme => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: '#F4F4F4',
                    primary: '#E39840',
                  },
                })}
                options={_dropdown_min} />
            </div>
          </div>
        </div>}
        {error && 
        <div className="error">Invalid Date</div>
        }
    </div>
    </div>
  )
      }
}
