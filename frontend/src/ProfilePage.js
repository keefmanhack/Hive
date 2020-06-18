import React from "react";
import ImageGallary from './ImageGallary';
import ImageEditor from './ImageEditor';

class ProfilePage extends React.Component{
	constructor(props){
		super(props);

		// this.handleImageEditClick = this.handleImageEditClick.bind(this);

		this.state = {
			isEditMode: false,
			images: Array(0),
		}
	}

	componentDidMount() {    
	    let arr = ["https://images.pexels.com/photos/224924/pexels-photo-224924.jpeg", "https://images.pexels.com/photos/224924/pexels-photo-224924.jpeg", "https://images.pexels.com/photos/224924/pexels-photo-224924.jpeg", "https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg", "https://images.pexels.com/photos/3862135/pexels-photo-3862135.jpeg", "https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg", "https://images.pexels.com/photos/224924/pexels-photo-224924.jpeg", "https://images.pexels.com/photos/1078879/pexels-photo-1078879.jpeg"];
	  
	    this.setState({
	    	images: arr,
	    });

  	}

  	handleImageEditClick(){
      this.setState({
      		isEditMode: true,
      })
    }

    handleCloseClick(){
    	this.setState({
    		isEditMode: false,
    	})
    }

	render(){
		let imageEditor = null
		if(this.state.isEditMode){
			imageEditor = <ImageEditor handleCloseClick={() => this.handleCloseClick()} images={this.state.images}/>;
		}
		return(
			<div style={{height: 'inherit'}}>
				{imageEditor}
				<div className="row" style={{height: 'inherit'}}>
				<div className="col-lg-5">
					<h1 className="title">Contractor</h1>
					<h3 className="location">New York City, New York United States</h3>
					<div className="row stars-price-row">
						<div className="col" style={{paddingRight: 0}}>
							<h2 className="stars">
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
							</h2>
						</div>
						<div className="col">
							<h2 className='price'>$100.00</h2>
						</div>
					</div>
					<button className="more-info-button" id="reviews" >35 Reviews</button>
					<div className="row name-talent-row">
						<div className="col-lg-9">
							<a href=""><h2 className="name">Keefer Gregoire</h2></a>
						</div>
						<div className="col-lg-1">
							<i className="fas fa-hammer"></i>
						</div>
						<div className="col-lg-1">
							<i className="fas fa-brush" style={{opacity: .5}}></i>
						</div>
						<div className="col-lg-1">
							<i className="fas fa-ruler" style={{opacity: .5}}></i>
						</div>
					</div>
					<p className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
					proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

					<h1 className="availability">Availability</h1>
					<button className="more-info-button" id="see-full-calendar">See Full Calendar</button>
					<div className="three-day-calendar">
						<div className="item" style={{color: '#CCFBFE'}}>
							<h4 className="day">Fri.</h4>
							<h4 className="date">Jun. 12th</h4>
						</div>
						<div className="item" style={{background: 'rgba(104, 80, 68, 0.75)'}}>
							<h4 className="day">Sat.</h4>
							<h4 className="date">Jun. 13th</h4>
						</div>
						<div className="item" style={{background: 'rgba(104, 80, 68, 0.75)'}}>
							<h4 className="day">Sun.</h4>
							<h4 className="date">Jun. 14th</h4>
						</div>
					</div>
					<button className="request-hyver">Request Hyver</button>
					<button id="contact-me" className="more-info-button">Contact Me</button>
				</div>
				<div className="col-lg-7" id="image-gallary" style={{height: '97%'}}>
					<ImageGallary 
						images={this.state.images}
						handleImageEditClick={() => this.handleImageEditClick()}
					/>
				</div>
			</div>
		</div>
		)
	}
}

export default ProfilePage;