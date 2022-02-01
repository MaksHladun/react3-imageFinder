const ImageGalleryItem = ({ images, id, tag, largeImage, onClick }) => {
    return (
        <>
         <li className="ImageGalleryItem" onClick={onClick}>
             <img className="ImageGalleryItem-image" 
                 id={id}
                 src={images} 
                 alt={tag}
                data-largeimage={largeImage} 
             />
  
         </li>
        </>
    )
}
export default ImageGalleryItem;