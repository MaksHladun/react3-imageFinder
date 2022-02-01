import React, { Component } from 'react';
import {  toast } from 'react-toastify';
import Input from './Input';


class Form extends Component{
state={
    value:''
}

handleChange = e => {
    const { value } = e.currentTarget;
    this.setState({ value: value.toLowerCase() });
        };

 handleSubmit = evt => {
    evt.preventDefault();  
    if(this.state.value.trim() === ''){
        toast.error('Ведите запрос')
        return;
    }
     this.props.onSubmit(this.state.value);

     this.setState({ value: '' });
  };

render(){
    return(
        <form className="SearchForm" onSubmit={this.handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>
        <Input onChange={this.handleChange}
        value={this.state.value}/>
      </form>
    )}
}

export default Form;