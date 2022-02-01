import './App.css';

import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Form from './Componets/Searchbar/Searchbar';
import ImageGallery from './Componets/ImageGallery/ImageGallery';



class App extends Component{
state={
  value:'',
  showModal: false

}

formSubmitHandler=(value)=>{
  this.setState({ value });
}



  render(){
    
  return (
    <div className='App' >
      <header className="Searchbar">
      <Form onSubmit={this.formSubmitHandler}/>
      </header>
      <ImageGallery valueImg = {this.state.value}/>
       <div>
        <ToastContainer autoClose={3000}/>
      </div>
     
        
   </div>
  );
}}

export default App;
