var currentTalentId = undefined;

function showAddEditPhotoForm(talentID){
	$('#talent-photo-form').addClass('show');
	$('.page-container').addClass('grey-out');
	currentTalentId = talentID;

	updatePhotoGallery();
}

function closeTalentPhotoForm(){
	$('#talent-photo-form').removeClass('show');
	$('.page-container').removeClass('grey-out');
	currentTalentId = undefined;
}

function openPhotoDialog(){
	var fileDialog = document.querySelector('.image-dialog');
	fileDialog.click();
	return false;
}

function addDisplayItems(){
	$('#talent-photo-form .photo-options .edit-option').addClass('show');
	$('#talent-photo-form .slidecontainer').addClass('show');
	$('#talent-photo-form .photo-options .upload').addClass('hide');
	$('#talent-photo-form .main-image-overlay').addClass('hide');
}

function removeDisplayItems(){
	$('#talent-photo-form .photo-options .edit-option').removeClass('show');
	$('#talent-photo-form .slidecontainer').removeClass('show');
	$('#talent-photo-form .photo-options .upload').removeClass('hide');
	$('#talent-photo-form .main-image-overlay').removeClass('hide');
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
        $('#talent-photo-form .loader').addClass('hide');
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