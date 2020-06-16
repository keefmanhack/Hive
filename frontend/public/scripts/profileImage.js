// $('#user-info i').on('click', function(){
// 		$('.page-container').addClass('hide');
// 		$('#photo-new-or-edit').addClass('show');
// 	})

// 	$('.photo-selector i').on('click', function(){
// 		showMainPage();
// 	});

// 	$('#new-photo').on('click', function(){
// 		var input = $(document.getElementById("profile_pic"));
//         input.trigger("click"); // opening dialog
//         return false;
// 	});

// 	function showMainPage(){
// 		$('.page-container').removeClass('hide');
// 		$('.photo-selector').removeClass('show');
// 		$('#photo-editor').removeClass('show');
// 	}

// 	//create event listeners for drag event
// 	dragElement(document.getElementById("photo"),document.getElementById("profile_img"));


// 	function changeVals(){
// 		var reader = new FileReader();
// 		var image = new Image();
// 		image = document.getElementById('profile_img');
//   		var canvas = document.createElement('canvas');
//   		var profile_pic = document.getElementById('profile_pic').files[0];
 		
//        	canvas.height = 250;
//     	canvas.width = 250;

//     	cropImage(canvas, image);

// 		reader.readAsDataURL(profile_pic);

// 		reader.onload = function (e) {
// 			var data = {
// 				'orient[dimension]': $('#profile_img').attr('height'),
// 				'orient[top]': image.style.top,
// 				'orient[left]': image.style.left,
// 				'cropped_profile_image': canvas.toDataURL('image/png'),
// 				'profile_image': e.target.result
// 			}
// 			sendImage(data);

// 	    };
// 		showMainPage();
// 	}

// 	function cropImage(canvas, image){
// 		var ctx = canvas.getContext('2d');
// 		var imageProp = image.style;

// 		var widthFactor = image.naturalWidth / image.width;
//     	var heightFactor = image.naturalHeight / image.height;
//     	var topMove = parseInt(imageProp.top.substring(0, imageProp.top.length-2));
//     	var leftMove = parseInt(imageProp.left.substring(0, imageProp.left.length-2));

// 		ctx.drawImage(image, (150 * widthFactor) - (leftMove * widthFactor), (37 * heightFactor) - (topMove * heightFactor), 250 * widthFactor, 250 * heightFactor,0,0,image.width * (250/image.height), 250);
// 	}

// 	function sendImage(data) {
// 	  let urlEncodedData = "",
//       urlEncodedDataPairs = [],
//       name;

//       for( name in data ) {
//     		urlEncodedDataPairs.push( encodeURIComponent( name ) + '=' + encodeURIComponent( data[name] ) );
//   	  }
//    	  urlEncodedData = urlEncodedDataPairs.join( '&' ).replace( /%20/g, '+' );

// 	  var xmlHttpReq = false;

// 	  if (window.XMLHttpRequest) {
// 	    ajax = new XMLHttpRequest();
// 	  }
// 	  else if (window.ActiveXObject) {
// 	    ajax = new ActiveXObject("Microsoft.XMLHTTP");
// 	  }

// 	  ajax.open("POST", "/user/" + currentUserId + "/edit/");
// 	  ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

// 	  ajax.send(urlEncodedData);
// 	}



// 	function readURL(input) {
// 	  if (input.files && input.files[0]) {
// 	  	$('#photo-editor').toggleClass('show');
// 	  	$('#photo-editor img').attr('height', '50%');

// 		document.getElementById("profile_img").style.left = '0px';
// 		document.getElementById("profile_img").style.top = '0px';
// 	    var reader = new FileReader();
// 	    reader.onload = function (e) {
// 	      $('#profile_img')
// 	        .attr('src', e.target.result);
// 	    };

// 	    reader.readAsDataURL(input.files[0]);
// 	  }
// 	}

// 	//set slider to minimum
// 	$('.slidecontainer input').on('input', function(){
// 		$('#photo-editor img').attr('height', this.value + '%');
// 		$('#photo-editor img').attr('width', this.value + '%');
// 	});

	

// function dragElement(cover, elmnt) {
//   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//   if (document.getElementById(elmnt.id + "header")) {
//     // if present, the header is where you move the DIV from:
//     document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
//   } else {
//     // otherwise, move the DIV from anywhere inside the DIV:
//     cover.onmousedown = dragMouseDown;
//   }

//   function dragMouseDown(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//   }

//   function elementDrag(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // calculate the new cursor position:
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     // set the element's new position:
//     elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//     elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//   }

//   function closeDragElement() {
//     // stop moving when mouse button is released:
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }
// }