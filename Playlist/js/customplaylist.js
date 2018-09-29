var selectedAudio = [];

var currentIndex = 0;

// add to playlist
var addToPlaylist = function(path) {
	if(!selectedAudio.includes(path)){
		selectedAudio.push(path);

		// after inserting first element
		if(selectedAudio.length == 1){
			var mediaHtml = "<source src=\""+ selectedAudio[currentIndex] + "\" type = \"audio/mp3\"> Your browser does not support the audio element.";

			$("#audioMediaPlayer").html(mediaHtml);
			play();
		}
	}

	plotPlaylistList();
	$("#divMediaPlayer").show();
}

var play = function(){
	var audio = selectedAudio[currentIndex].split("/")[1];
	$("#mediaPlayerMarquee").html("Playing: " + audio);
	$("#audioMediaPlayer")[0].load();
	$("#audioMediaPlayer")[0].play();
};

// remove from playlist
var removeFromPlaylist = function(path) {

	var indexOfPath = -1;

	$(selectedAudio).each(function(index, element){
		if(element === path){
			indexOfPath = index;
		}
	});

	if(indexOfPath === -1){
		return;
	}

	if(indexOfPath === currentIndex){
		// one selected for deletion is playing currently
		// so a switch to logically next track
		// if last, then first, if n, then n+1
		// if only one element in playlist that 
		if(selectedAudio.length > 1){
			if(currentIndex < selectedAudio.length){
				currentIndex++;
			}

			if(currentIndex == selectedAudio.length) {
				currentIndex = 0;
			}
		} else {
			// redundant assignment for code readability
			currentIndex = 0;

			
			$("#divMediaPlayer").hide();
		}

		$("#audioMediaPlayer")[0].pause();

		var mediaHtml = "<source src=\""+ selectedAudio[currentIndex] + "\" type = \"audio/mp3\"> Your browser does not support the audio element.";

		play();
	}

	if(selectedAudio.includes(path)){
		var index = selectedAudio.indexOf(path);
		if (index !== -1) selectedAudio.splice(index, 1);

		plotPlaylistList();
	}

	if(selectedAudio.length == 0){
		$("#divMediaPlayer").hide();
	}
}

var plotPlaylistList = function() {
	var innerHtml = "";

	$(selectedAudio).each(function(index, element){

		if(index == currentIndex) {
			innerHtml += "<li class=\"list-group-item active\">" + element.split("/")[1] + "</li>";
		} else {
			innerHtml += "<li class=\"list-group-item\">" + element.split("/")[1] + "</li>";
		}
	});

	$("#lstPlaylist").html(innerHtml);
};

// next
var nextHandler = function(){
	if(currentIndex < selectedAudio.length) {
			currentIndex++;

			var mediaHtml = "<source src=\""+ selectedAudio[currentIndex] + "\" type = \"audio/mp3\"> Your browser does not support the audio element.";

			
			$("#audioMediaPlayer").html(mediaHtml);
			$("#audioMediaPlayer")[0].pause();
			play();
	} else {
		alert("No more audio files to play!");
	}

	plotPlaylistList();
};

// prev
var prevHandler = function() {
	if(currentIndex > 0) {
			currentIndex--;

			var mediaHtml = "<source src=\"" + selectedAudio[currentIndex] + "\" type = \"audio/mp3\"> Your browser does not support the audio element.";

			$("#audioMediaPlayer").html(mediaHtml);
			$("#audioMediaPlayer")[0].pause();
			play();
	} else {
		alert("You were already playing the first audio of the playlist!");
	}

	plotPlaylistList();
};


// handlers
var attachAddPlaylistHandlers = function() {
	$("button.addToPlaylist").click(function(event){
		var path = $(event.target).attr("audioPath");
		addToPlaylist(path);
	});
};


var attachRemoveFromPlaylistHandlers = function(){
	$("button.removeFromPlaylist").click(function(event){
		var path = $(event.target).attr("audioPath");
		removeFromPlaylist(path);
	});
};

var attachNextHandler = function(){
	$("#nextAnchor").click(function(event){
		nextHandler();
	});
};


var attachPreviousHandler = function(){
	$("#prevAnchor").click(function(event) {
		prevHandler();
	})
};

var reset = function(){
	selectedAudio = [];
	currentIndex = 0;
	$("#audioMediaPlayer")[0].pause();
	$("#divMediaPlayer").hide();
	$("#mediaPlayerMarquee").html("");

}

$(document).ready(function(){
	attachAddPlaylistHandlers();
	attachRemoveFromPlaylistHandlers();
	attachNextHandler();
	attachPreviousHandler();
});