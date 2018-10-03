var selectedAudio = [];

var currentIndex = -1;

// add to playlist
var addToPlaylist = function(path) {
	if(!selectedAudio.includes(path)){
		selectedAudio.push(path);

		// after inserting first element
		if(selectedAudio.length == 1){
			if(currentIndex == -1){
				currentIndex = 0;
			}
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

	var mediaHtml = "<source src=\""+ selectedAudio[currentIndex] + "\" type = \"audio/mp3\"> Your browser does not support the audio element.";

			
	$("#audioMediaPlayer").html(mediaHtml);
	$("#audioMediaPlayer")[0].pause();
	$("#audioMediaPlayer")[0].load();
	$("#audioMediaPlayer")[0].play();

	plotPlaylistList();
};

// remove from playlist
 var removeFromPlaylist = function(path){
 	var indexToBeDeleted = -1;

 	$(selectedAudio).each(function(i,e){
 		if(e === path){
 			indexToBeDeleted = i;
 		}
 	});

 	// case 1
 	if(indexToBeDeleted > currentIndex){
 		if(selectedAudio.includes(path)){
			var index = selectedAudio.indexOf(path);
			if (index !== -1) selectedAudio.splice(index, 1);
		}
		// play(); Play not required - let it continue
		plotPlaylistList();
		return;
 	}

 	// case 2
 	if(indexToBeDeleted < currentIndex){
 		currentIndex--;

 		if(selectedAudio.includes(path)){
			var index = selectedAudio.indexOf(path);
			if (index !== -1) selectedAudio.splice(index, 1);
		}
		play();
		plotPlaylistList();
		return;
 	}

 	// case 3
 	if(indexToBeDeleted === currentIndex){
 		if(selectedAudio.length === 1){
 			currentIndex = -1;

 			if(selectedAudio.includes(path)){
				var index = selectedAudio.indexOf(path);
				if (index !== -1) selectedAudio.splice(index, 1);
			}

 			$("#divMediaPlayer").hide();
 			$("#audioMediaPlayer")[0].pause();
 			$("#audioMediaPlayer").html("");
 			plotPlaylistList();
 		} else {
 			// case a
 			if(currentIndex < (selectedAudio.length-1)){
 				if(selectedAudio.includes(path)){
					var index = selectedAudio.indexOf(path);
					if (index !== -1) selectedAudio.splice(index, 1);
				}
				play();
				plotPlaylistList();
				return;
 			}

 			// case b
 			if(selectedAudio.length === 1){
 				currentIndex = -1;

 				if(selectedAudio.includes(path)){
					var index = selectedAudio.indexOf(path);
					if (index !== -1) selectedAudio.splice(index, 1);
				}
				play();
				plotPlaylistList();
				return;
 			}

 			// case c
 			if(currentIndex === (selectedAudio.length-1)){
 				currentIndex--;

 				if(selectedAudio.includes(path)){
					var index = selectedAudio.indexOf(path);
					if (index !== -1) selectedAudio.splice(index, 1);
				}
				play();
				plotPlaylistList();
				return;
 			}
 		}
 	}
 }



var selectionFromPlaylistOfMediaPlayer = function(index, audioPath){
	if(index === currentIndex){
		// do nothing
		return;
	}

	currentIndex = index;
	play();
	plotPlaylistList();
}

var plotPlaylistList = function() {
	var innerHtml = "";

	$(selectedAudio).each(function(index, element){
		if(index == currentIndex) {
			innerHtml += "<li style=\"cursor:pointer;\" class=\"list-group-item active playlist\" audioIndex=\"" + index + "\" audio-path=\"" + element + "\">";
		
			innerHtml += element.split("/")[1] + "</li>";
		} else {
			innerHtml += "<li style=\"cursor:pointer;\" class=\"list-group-item playlist\" audioIndex=\"" + index + "\" audio-path=\"" + element + "\">";
		
			innerHtml += element.split("/")[1] + "</li>";
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

var attachHandlersForPlaylistItems = function() {
	$(document).on("dblclick", "li.playlist", function(event) {
		var index = $(event.target).attr("audioIndex");
		var audioPath = $(event.target).attr("audio-path");

		selectionFromPlaylistOfMediaPlayer(index,audioPath);
		
	});
}

$(document).ready(function(){
	attachAddPlaylistHandlers();
	attachRemoveFromPlaylistHandlers();
	attachNextHandler();
	attachPreviousHandler();
	attachHandlersForPlaylistItems();

	
});