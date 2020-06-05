function showAddEditPhotoForm(){
	$('#talent-photo-form').addClass('show');
	$('.page-container').addClass('grey-out');
}

function closeTalentPhotoForm(){
	$('#talent-photo-form').removeClass('show');
	$('.page-container').removeClass('grey-out');
}

function openPhotoDialog(){
	var fileDialog = document.querySelector('.image-dialog');
	fileDialog.click();
	return false;
}

function readURLTalent(input) {
	console.log(input.files);

  if (input.files && input.files[0]) {
  	$('.display-image').addClass('show');

    var reader = new FileReader();
    reader.onload = function (e) {
      
      $('.main-image')
        .attr('src', e.target.result);
        $('.main-image').addClass('show');
        $('.loader').addClass('hide');
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function savePhoto(){
	var reader = new FileReader();
	var image = document.querySelector('.image-dialog').files[0]
	reader.onload = function(e){
		sendTalentImage(e.target.result);
	}

}