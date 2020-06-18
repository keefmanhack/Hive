import React from "react";
import {Image} from './ImageGallary';
import {Overlay} from './ImageGallary';



class ImageEditor extends React.Component{
	constructor(props){
		super(props);

		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.imageClicked = this.imageClicked.bind(this);
		this.resizeImage = this.resizeImage.bind(this);
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);


		this.state = {
			edit: false,
			editMode: false,
			selectedIndex: 0,
			imageHeight: '100%',
			currentPosition_X: 0,
  			currentPosition_Y: 0,
  			previousPosition_X: 0,
  			previousPosition_Y: 0,
  			mouseDown: false,
		}

		
	}


  handleClick(){
  	this.setState({
  		editMode: true,
  	})
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

  imageClicked(i){
	this.setState({
		selectedIndex: i,
	})
  }

  resizeImage(val){
  	this.setState({
  		imageHeight: val + '%',
  	})
  }

  handleMouseDown(event){
  	this.setState({
  		mouseDown: true,
  		previousPosition_X: event.clientX,
  		previousPosition_Y: event.clientY,
  	})
  }

  handleMouseMove(event){
  	if(this.state.mouseDown){
	  	let previousPosition_X = this.state.previousPosition_X;
	  	let previousPosition_Y = this.state.previousPosition_Y;
	  	let currentPos_X = this.state.currentPosition_X;
	  	let currentPos_Y = this.state.currentPosition_Y;

	  	let newPos_X = currentPos_X-(previousPosition_X-event.clientX);
	  	let newPos_Y = currentPos_Y-(previousPosition_Y-event.clientY);
  		this.setState({
  			currentPosition_X: newPos_X,
  			currentPosition_Y: newPos_Y,
  			previousPosition_X: event.clientX,
  			previousPosition_Y: event.clientY,
  		})
  	}
  }

  handleMouseUp(event){
  	this.setState({
  		mouseDown: false,
  	})
  }

  editModeOff(){
  	this.setState({
  		editMode: false,
  	})
  }


  render(){
	const images = this.props.images.map((image, index) =>
      <div key={index} className='col-lg-2' style={{height: '50%'}}>
        <Image 
          key={index} 
          src={image} 
          onClick={(i) => this.imageClicked(index)}
        />
      </div>
    );
	
	let overlay, slider = null;
    if(this.state.edit && !this.state.editMode){
      overlay = <Overlay text={'edit'} style={{margin: 0}} handleClick={() => this.handleClick()}/>
    }

	let imageEditStyle, buttons;
    if(this.state.editMode){
    	slider = <Slider resizeImage={(val) => this.resizeImage(val)}/>
    	imageEditStyle={height: "inherit", position: 'relative', cursor: 'move'}
    	buttons={}
    }else{
    	imageEditStyle={height: "inherit", position: 'relative'}
    }

    return(
      <div className='image-editor'>
      	<button onClick={() => this.props.handleCloseClick()} className='close-button'>Close</button>
		<div 
			className='row' 
			style={{height: '60%'}}
		>
			<div 
				className='col-lg-8' 
				style={{height: '100%', overflow: 'hidden'}} 
				onMouseEnter={() => this.handleMouseEnter()}
				onMouseLeave={() => this.handleMouseLeave()}
			>	
				<div className='image-container' style={imageEditStyle}>
					<img 
						style={
							{
								top: this.state.currentPosition_Y,
								left: this.state.currentPosition_X,
								height: this.state.imageHeight, 
								position: 'absolute',
								objectFit: 'cover'
							}
						} 
						src={this.props.images[this.state.selectedIndex]}
					/>
					<div className='square-box' onMouseDown={this.state.editMode ? this.handleMouseDown : null}
				onMouseMove={this.state.editMode ? this.handleMouseMove : null}
				onMouseUp={this.state.editMode ? this.handleMouseUp : null}>
					</div>
					{slider}
					{overlay}
				</div>
			</div>
			<div className='col-lg-4'>
				<div className='button-container'>
					{this.state.editMode ? <button className='save'>Save</button> : <button className='upload'>Upload</button>}
					{this.state.editMode ? <button onClick={() => this.editModeOff()} className='cancel'>Cancel</button>: null}
				</div>
			</div>
		</div>
		<hr style={{borderTop: '1px solid rgb(255,255,255,.8)'}}/>
		<div className='row'>
			{images}
		</div>
			<FileInput />
      </div>
    );
  }
}

class FileInput extends React.Component{
	render(){
		return(
			<input type='file' style={{display: none}} />
		);
	}
}

class Slider extends React.Component{
	constructor(props){
		super(props);

		this.handleChange = this.handleChange.bind(this);

		this.state = {
			value: 100,
		}
	}

	handleChange(event){
		this.setState({
			value: event.target.value
		})

		this.props.resizeImage(this.state.value);
	}

	render(){
		return(
			<div className="slidecontainer">
  				<input onChange={this.handleChange} type="range" min="50" max="200" value={this.state.value} className="slider"/>
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