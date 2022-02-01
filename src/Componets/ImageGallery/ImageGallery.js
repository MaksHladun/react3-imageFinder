import React, { Component } from 'react';

import {  toast } from 'react-toastify';


import GetImagesApi from '../API/API';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

class ImageGallery extends Component{
    state={
        imgData: [],
        loading: false,
        page: 1,
        largeImageSrc:'',
        alt:''  
    }   

  componentDidUpdate(prevProps, pvevState){
      const prevValue = prevProps.valueImg;
      const nextValue = this.props.valueImg;
    
      if (prevValue !== nextValue) {
        this.setState({imgData: [], page: 1, loading: true }) 
        this.getData(nextValue);
  }

}
 
  getData = (nextValue, page) => {
  GetImagesApi(nextValue, page).then((response) => {
    if (response.status === 200) {
    this.setState({
        imgData: [...this.state.imgData, ...response.data.hits],
      })
     
      if (this.state.imgData.length === 0) {
        toast.error("По вашему запросу - НИЧЕГО НЕ НАЙДЕНО!");
        }};
        this.setState({ page: this.state.page + 1 });
  
    if (response.status === 404) {
      throw new Error(response.message || "pictures not exist");
      }
}).catch(function (error) {
    console.error("error", error); })
    .finally(() => {
        this.setState({ loading: false });
      })
    }

    pageIncrement = () => {
        this.getData(this.props.valueImg, this.state.page + 1);
        this.setState({ loading: true });
        return;
      };

      toggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
      };
    
      setCurrentPictureSrc = (e) => {
       
      this.setState({ largeImageSrc: e.target.dataset.largeimage });
      this.setState({ alt: e.target.alt });
      this.toggleModal();
      }

    render(){

        return(
           <>
           {this.state.loading && <div className="loader"></div>}
           {this.state.imgData.length !== 0 && <ul className="ImageGallery">
             {this.state.imgData.map(item => {
                return ( <ImageGalleryItem 
                 key={item.id}
                 id={item.id}
                 images={item.webformatURL}
                 tag={item.tags}
                 largeImage={item.largeImageURL}
                 onClick ={this.setCurrentPictureSrc}/>)
                 })}
            </ul>}
            
            {this.state.imgData.length > 0 && <Button onClick={this.pageIncrement}/>}
            {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <div>
              <img className='modalImg' src={this.state.largeImageSrc} alt={this.state.alt} />
            </div>
          </Modal>
        )}
            </>
        )
    }
}


export default ImageGallery