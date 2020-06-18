import React from "react";
import {Image} from './ImageGallary';
import {Overlay} from './ImageGallary';



class ImageEditor extends React.Component{
	constructor(props){
		super(props);

		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.state = {
			edit: false,
		}
	}

  handleClick(){
  	alert('clicked');
  }

  handleMouseEnter(){
    this.setState({
      edit: true
    })
  }

  handleMouseLeave(){
    this.setState({
      edit: false
    })
  }

  render(){
	const images = this.props.images.map((image, index) =>
      <div key={index} className='col-lg-2' style={{height: '50%'}}>
        <Image 
          key={index} 
          src={image} 
          onClick={() => this.props.imageClicked(index)}
        />
      </div>
    );
	
	let overlay = null;
    if(this.state.edit){
      overlay = <Overlay text={'edit'} handleClick={() => this.handleClick()}/>
    }

    return(
      <div className='image-editor'>
      	<button
      		style={closeButtonStyle}
      		onMouseEnter={color: 'purple'}
      		onMouseLeave={color: 'white'}
      	>Close</button>
		<div className='row' style={{height: '60%'}}>
			<div 
				className='col-lg-8' 
				style={{height: '100%'}} 
				onMouseEnter={() => this.handleMouseEnter()}
				onMouseLeave={() => this.handleMouseLeave()}
			>
				<img 
					style={{height: 'inherit', width: 'inherit'}} 
					src={this.props.images[0]}
				/>
				{overlay}
			</div>
			<div className='col-lg-4'>

			</div>
		</div>
		<hr style={{color: 'white'}}/>
		<div className='row'>
			{images}
		</div>
      </div>
    );
  }
}

const closeButtonStyle = {
	border: 'none',
	background: 'none',
	fontSize: 20,
	color: 'white',
	cursor: 'pointer',
	position: 'relative'
}


export default ImageEditor;