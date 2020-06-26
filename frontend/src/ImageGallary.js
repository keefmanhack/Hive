import React from "react";
import {FadeInOut} from './CustomTransitions'

class ImageGallary extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.state = {
      selectedIndex: 0,
      showEdit: false
    }
  }

  handleClick(i){
    this.setState({
      selectedIndex: i,
    });
  }

  handleMouseEnter(){
    this.setState({
      showEdit: true
    })
  }

  handleMouseLeave(){
    this.setState({
      showEdit: false
    })
  }

  render() {
    const selectedIndex = this.state.selectedIndex;
    return (
      <div className='image-gallary'>
        <LargeImage
          src={this.props.images[selectedIndex]} 
          handleMouseEnter={() => this.handleMouseEnter()}
          handleMouseLeave={() => this.handleMouseLeave()}
          showEdit={this.state.showEdit}
          handleClick={() => this.props.handleImageEditClick()}
        />
        <ImageBanner 
          imageClicked={(i) => this.handleClick(i)}
          selectedIndex={this.state.selectedIndex}
          images={this.props.images}
        />
      </div>
    );
  }
}

class LargeImage extends React.Component{
  render(){
    let overlay = null;
    if(this.props.showEdit){
      overlay = <Overlay handleClick={() => this.props.handleClick()} text={'Update'}/>
    }
    
    return(
      <div 
        onMouseEnter={() => this.props.handleMouseEnter()}
        onMouseLeave={() => this.props.handleMouseLeave()} 
        className="large-image row"
      >
          {overlay}
        <FadeInOut changeVal={this.props.src}>
          <img className="main-image col-lg-12" src={this.props.src} alt={'unable to display'}/>
        </FadeInOut>
      </div>
    );


  }
}

class Overlay extends React.Component{
  render(){
    return(
      <div style={this.props.style} className='overlay'>
        <button onClick={() => this.props.handleClick()}>
          {this.props.text}
        </button>
      </div>
    );
  }
}

class ImageBanner extends React.Component{

  render(){
    const style_Selected = {opacity: 1}
    const images = this.props.images.map((image, index) =>
      <div key={index} className='col-lg-2'>
        <Image 
          key={index} 
          src={image} 
          onClick={() => this.props.imageClicked(index)}
          style={index===this.props.selectedIndex ? style_Selected: null}
        />
      </div>
      
      
    );


    return( 
        <div className="row">
          <div className='col-lg-12'>
            <div className='row' style={{marginTop: 27}}>
              {images}
            </div>
          </div>
        </div>

    );
  }
}

class Image extends React.Component{
  render(){
    return(
      <div className="small-image">
        <img style={this.props.style} onClick={this.props.onClick} src={this.props.src} alt={'Unable to display_images'}/>
      </div>
    );
  }
}

export {Image, Overlay,};
export default ImageGallary;




