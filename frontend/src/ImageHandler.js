import React from "react";
import ImageGallary from './ImageGallary';
import ImageEditor from './ImageEditor';


class ImageHandler extends React.Component{
  constructor(props){

    this.state ={
      images: Array(0),
      isEditImagesMode: false
    }
  }

  componentDidMount() {    
    let arr = ["https://images.pexels.com/photos/224924/pexels-photo-224924.jpeg", "https://images.pexels.com/photos/224924/pexels-photo-224924.jpeg", "https://images.pexels.com/photos/224924/pexels-photo-224924.jpeg", "https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg", "https://images.pexels.com/photos/3862135/pexels-photo-3862135.jpeg", "https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg", "https://images.pexels.com/photos/224924/pexels-photo-224924.jpeg", "https://images.pexels.com/photos/1078879/pexels-photo-1078879.jpeg"];
  
    this.setState({
      images: arr
    });

  }

    handleImageEditClick(){
      alert('clicked');
      this.setState({
        isEditImagesMode: true
      })
    }

  render(){
    return(
      <div>
        <ImageGallary 
          images={this.state.images}
          handleImageEditClick={() => this.handleImageEditClick()}
        />
        <ImageEditor images={this.state.images}/>
      </div>
    );
  }
}


export default ImageHandler;