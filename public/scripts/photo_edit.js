$('#user-info i').on('click', function(){
	$('.page-container').addClass('hide');
	$('#photo-new-or-edit').addClass('show');
})

$('.photo-selector i').on('click', function(){
	showMainPage();
});

$('#new-photo').on('click', function(){
	var input = $(document.getElementById("profile_pic"));
    input.trigger("click"); // opening dialog
    return false;
});

$('.slidecontainer input').on('input', function(){
	$('#photo-editor img').attr('height', this.value + '%');
});

function editPhoto(imageData){
	editMode = true;
	$('#photo-editor').toggleClass('show');
  	$('#photo-editor img').attr('height', imageData.orient.dimension);
	document.getElementById("profile_img").style.left = imageData.orient.left;
	document.getElementById("profile_img").style.top = imageData.orient.top;
	$('.slidecontainer input').val(parseInt(imageData.orient.dimension.substring(0, imageData.orient.dimension.length-1)));

	// $("#profile_pic").val(imageData.profile_path);
	// document.getElementById('profile_pic').files[0] = imageData.profile_path;
	$('.loader').addClass('hide');
	$('#profile_img').attr('src', imageData.profile_path);

}

function changeVals(){
	var reader = new FileReader();
	var image = new Image();
	image = document.getElementById('profile_img');
		var canvas = document.createElement('canvas');
		var profile_pic = document.getElementById('profile_pic').files[0];
		
   	canvas.height = 250;
	canvas.width = 250;

	cropImage(canvas, image);

	if(editMode){
		var data = {
			'orient[dimension]': $('#profile_img').attr('height'),
			'orient[top]': image.style.top,
			'orient[left]': image.style.left,
			'cropped_profile_image': canvas.toDataURL('image/png')
		}
		sendImage(data);
	}else{
		reader.readAsDataURL(profile_pic);

		reader.onload = function (e) {
			var data = {
				'orient[dimension]': $('#profile_img').attr('height'),
				'orient[top]': image.style.top,
				'orient[left]': image.style.left,
				'cropped_profile_image': canvas.toDataURL('image/png'),
				'profile_image': e.target.result
			}
			sendImage(data);
	    };
	}
}

function cropImage(canvas, image){
	var ctx = canvas.getContext('2d');
	var imageProp = image.style;

	var widthFactor = image.naturalWidth / image.width;
	var heightFactor = image.naturalHeight / image.height;
	var topMove = parseInt(imageProp.top.substring(0, imageProp.top.length-2));
	var leftMove = parseInt(imageProp.left.substring(0, imageProp.left.length-2));

	ctx.drawImage(image, (100 * widthFactor) - (leftMove * widthFactor), (37 * heightFactor) - (topMove * heightFactor), image.naturalWidth * widthFactor * (250/image.naturalHeight), 250 * heightFactor,0,0,image.naturalWidth * (250/image.naturalHeight), 250);
}

function readURL(input) {
	editMode = false;
  if (input.files && input.files[0]) {
  	$('#photo-editor').toggleClass('show');
  	$('#photo-editor img').attr('height', '50%');

	document.getElementById("profile_img").style.left = '0px';
	document.getElementById("profile_img").style.top = '0px';

    var reader = new FileReader();
    reader.onload = function (e) {
      $('#profile_img')
        .attr('src', e.target.result);

      $('.loader').addClass('hide');
    };

    reader.readAsDataURL(input.files[0]);
  }
}

	function dragElement(cover, elmnt) {
		var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
		if (document.getElementById(elmnt.id + "header")) {
		// if present, the header is where you move the DIV from:
		document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
		} else {
		// otherwise, move the DIV from anywhere inside the DIV:
		cover.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
		}

		function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}

