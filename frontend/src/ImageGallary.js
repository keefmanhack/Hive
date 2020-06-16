import React from "react";
import ReactDOM from 'react-dom';
import circularLinkedList from './CircularLinkedList';



class ImageGallary extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      images: new circularLinkedList(),
      display_images : Array(3).fill(null),
      relative_head : null,
    }

    
    
  }

  componentDidMount() {    
    let arr = ["https://images.pexels.com/photos/224924/pexels-photo-224924.jpeg", "https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg", "https://images.pexels.com/photos/3862135/pexels-photo-3862135.jpeg", "https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg", "https://images.pexels.com/photos/224924/pexels-photo-224924.jpeg", "https://images.pexels.com/photos/1078879/pexels-photo-1078879.jpeg"];
    let tempCLL = new circularLinkedList();

    for(let i =0; i< arr.length; i++){
      tempCLL.addNode(arr[i]);
    }

    let tempDisplayImages = [];
    let tempHead = tempCLL.getHead();


    for(let i =0; i < 5; i++){
      tempDisplayImages[i] = tempHead.content;
      tempHead = tempHead.nextNode;
    }
  
    this.setState({
      display_images: tempDisplayImages,
      images: tempCLL,
      relative_head: tempCLL.getHead(),
    });

  }

  handleClick(i){
    let imagesCopy = this.state.display_images.slice();
    let temp;

    temp = imagesCopy[0];
    imagesCopy[0] = imagesCopy[i];
    imagesCopy[i] = temp;


    this.setState({
      display_images: imagesCopy,
    });
  }

  up(){
    let tempDisplayImages = [];
    let tempHead = this.state.relative_head.nextNode;


    for(let i =0; i < 5; i++){
      tempDisplayImages[i] = tempHead.content;
      tempHead = tempHead.nextNode;
    }

    this.setState({
      display_images: tempDisplayImages,
      relative_head: this.state.relative_head.nextNode,
    })
  }

  down(){
    let tempDisplayImages = [];
    let tempHead = this.state.relative_head.prevNode;


    for(let i =0; i < 5; i++){
      tempDisplayImages[i] = tempHead.content;
      tempHead = tempHead.nextNode;
    }

    this.setState({
      display_images: tempDisplayImages,
      relative_head: this.state.relative_head.prevNode,
    })
  }

  render() {

    return (
      <div className='image-gallary'>
        <LargeImage src={this.state.display_images[0]} />
        <ImageBanner 
          imageClicked={(i) => this.handleClick(i)} 
          images={this.state.display_images}
          buttonUp={() => this.up()}
          buttonDown={() => this.down()}
        />
      </div>
    );
  }
}

class LargeImage extends React.Component{
  render(){
    return(
      <div className="large-image">
        <img className="main-image" src={this.props.src} alt={'unable to display'}/>
      </div>
    );
  }
}

class ImageBanner extends React.Component{

  render(){
    const images = this.props.images.map((image, index) =>
      <Image key={index} src={image} onClick={() => this.props.imageClicked(index)}/>
    );


    return( 
        <div className="image-gallary-col">
          <button onClick={() =>this.props.buttonUp()} className='gallary-move up'><i className="fas fa-angle-up"></i></button>
            {images}
          <button onClick={() => this.props.buttonDown()} className='gallary-move down'><i className="fas fa-angle-down"></i></button>            
        </div>

    );
  }
}

class Image extends React.Component{
  render(){
    return(
      <div style={this.props.style} className="small-image">
        <img onClick={this.props.onClick} src={this.props.src} alt={'Unable to display_images'}/>
      </div>
    );
  }
}

export default ImageGallary;



// class circularLinkedList{
//   constructor(){
//     this.head = null;
//     this.tail = null;
//   }

//   getHead(){
//     return this.head;
//   }

//   addNode(node){
//     if (this.head === null){
//       this.head = new ListNode(node);
//       this.tail = this.head;

//       this.head.nextNode = this.tail;
//       this.head.prevNode = this.tail;
//       this.tail.nextNode = this.head;
//       this.tail.prevNode = this.tail;
//     }else{
//       this.tail.nextNode = new ListNode(node);
//       this.tail.nextNode.prevNode = this.tail;
//       this.tail = this.tail.nextNode;
//       this.tail.nextNode= this.head;
//     }
//   }
// }

// class ListNode{
//   constructor(content){
//     this.nextNode =null;
//     this.prevNode = null;
//     this.content =  content;
//   }
// }






