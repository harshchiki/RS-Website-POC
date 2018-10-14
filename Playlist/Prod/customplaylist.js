var selectedAudio = [];

var currentIndex = -1;

// add to playlist
var addToPlaylist = function(path) {
	if(!selectedAudio.includes(path)){
		selectedAudio.push(path);

		var notificationMessage = "\"" + path.substring(path.lastIndexOf("/")+1, path.length) +"\" added!";
		notify(notificationMessage, 'info');

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

	if(!selectedAudio || !selectedAudio[currentIndex] || selectedAudio[currentIndex].length === 0){
		return;
	} 

	var lastIndexOfSlash = selectedAudio[currentIndex].lastIndexOf("/");
	var audio = selectedAudio[currentIndex].substring(lastIndexOfSlash+1, selectedAudio[currentIndex].length);
	addMarquee(audio);

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

 	if(indexToBeDeleted >= 0 && selectedAudio && selectedAudio[indexToBeDeleted]) {
 		var notificationMessage = "\"" + path.substring(path.lastIndexOf("/")+1, path.length) +"\" removed!";
		notify(notificationMessage, 'warning'); 
 	}
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
			 
			 if($("a[targetdiv='Playlist'").parent().hasClass("active")){
				$("#divEmptyPlaylist").show();
			 }
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



var selectionFromPlaylistOfMediaPlayer = function(index, audiourl){
	if(index === currentIndex){
		// do nothing
		return;
	}

	currentIndex = index;
	play();
	plotPlaylistList();
}

var removeFromPlaylistFromClose = function(event) {
	var pathToRemove = $(event.target).parent().attr("audio-path");
	removeFromPlaylist(pathToRemove);
	return false;
}

var plotPlaylistList = function() {
	var innerHtml = "";

	$(selectedAudio).each(function(index, element){
		// <span class="glyphicons glyphicons-remove-sign" style="float:right"></span>

		var closeImgHTML = "<img class=\"playlist-item-close\" style=\"float:right;margin-right:10px;cursor:pointer;\" src=\"Images/close.png\" alt=\"Remove\" height=\"25\" width=\"25\"></img>";

		if(index == currentIndex) {
			innerHtml += "<li style=\"cursor:pointer;\" class=\"list-group-item active playlist\" audioIndex=\"" + index + "\" audio-path=\"" + element + "\">";
		
			var lastIndexOfSlash = element.lastIndexOf("/");

			innerHtml += element.substring(lastIndexOfSlash+1, element.length) + closeImgHTML + "</li>";
		} else {
			innerHtml += "<li style=\"cursor:pointer;\" class=\"list-group-item playlist\" audioIndex=\"" + index + "\" audio-path=\"" + element + "\">";
		
			var lastIndexOfSlash = element.lastIndexOf("/");

			innerHtml += element.substring(lastIndexOfSlash+1, element.length) + closeImgHTML + "</li>";
		}

	});

	$("#lstPlaylist").html(innerHtml);
	showPlaylistHandler(false);
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
	// clear
	$("div.addToPlaylist").unbind("click");
	// attach
	$("div.addToPlaylist").click(function(event){
		var path = $(event.target).attr("audiourl");
		addToPlaylist(path);
	});
};


var attachRemoveFromPlaylistHandlers = function(){
	// clear
	$("div.removeFromPlaylist").unbind("click");
	// attach
	$("div.removeFromPlaylist").click(function(event){
		var path = $(event.target).attr("audiourl");
		removeFromPlaylist(path);
	});
};

var attachNextHandler = function(){
	// clear
	$("#nextAnchor").unbind("click");
	// attach
	$("#nextAnchor").click(function(event){
		nextHandler();
		event.preventDefault();
	});
};


var attachPreviousHandler = function(){
	// clear
	$("#prevAnchor").unbind("click");
	// attach
	$("#prevAnchor").click(function(event) {
		prevHandler();
		event.preventDefault();
	})
};

var reset = function(){
	selectedAudio = [];
	currentIndex = 0;
	$("#audioMediaPlayer")[0].pause();
	$("#divMediaPlayer").hide();
	$("#mediaPlayerSpan").html("");

}

var addMarquee = function(path) {
	var audioControlWidth = $("#audioMediaPlayer").width();
	var marqueeHtml = "<marquee class=\"playlistMarquee\" style=\"font-size:13px;max-width:" + audioControlWidth + "px;\">Playing: " + path + "</marquee>"
	$("#mediaPlayerSpan").html(marqueeHtml);
}

var attachHandlersForPlaylistItems = function() {
	// clear
	$(document).unbind("dblclick", "li.playlist");
	//attach
	$(document).on("dblclick", "li.playlist", function(event) {
		var index = $(event.target).attr("audioIndex");
		var audiourl = $(event.target).attr("audio-path");

		selectionFromPlaylistOfMediaPlayer(index,audiourl);
		
	});
}

var mediaPlayerOnEndHandler = function(){
	var playListLength = selectedAudio.length;

	
	currentIndex = (currentIndex+1)%(playListLength);
	
	play();
	plotPlaylistList();
		
}

var attachOnEndHandlerOnMediaPlayer = function(){
	var mediaPlayer = document.getElementById("audioMediaPlayer");
	mediaPlayer.onended = mediaPlayerOnEndHandler;
}

var showPlaylistHandler = function(toggle){
	var currentState = $("#btnShowPlaylist").attr("state");

	if(toggle){
		switch(currentState){
			case "on":
				$("#lstPlaylist").hide();
				$("#btnShowPlaylist").attr("state","off");
				$("#btnShowPlaylist").html("Show playlist");
			break;


			case "off":
				$("#lstPlaylist").show();
				$("#btnShowPlaylist").attr("state","on");
				$("#btnShowPlaylist").html("Hide playlist");
				$("html, body").animate({ scrollTop: $(document).height() }, 1000);
			break;
		}
	} else {
		switch(currentState){
			case "off":
				$("#lstPlaylist").hide();
				$("#btnShowPlaylist").attr("state","off");
				$("#btnShowPlaylist").html("Show playlist");
			break;


			case "on":
				$("#lstPlaylist").show();
				$("#btnShowPlaylist").attr("state","on");
				$("#btnShowPlaylist").html("Hide playlist");
				$("html, body").animate({ scrollTop: $(document).height() }, 1000);
			break;
		}
	}
	//$("html, body").animate({ scrollTop: $(document).height() }, 1000);
}

var attachShowPlaylistButtonHandler = function(){
	// clear
	$("#btnShowPlaylist").unbind("click");
	// attach
	$("#btnShowPlaylist").click(function(event){
		showPlaylistHandler(true);
		event.preventDefault();
	});
}



$(document).on("click", ".playlist-item-close", function(event){
		removeFromPlaylistFromClose(event);
	});	

$(document).on("content-loaded", function(event){
	attachAddPlaylistHandlers();
	attachRemoveFromPlaylistHandlers();
	attachNextHandler();
	attachPreviousHandler();
	attachHandlersForPlaylistItems();
	attachOnEndHandlerOnMediaPlayer();
	attachShowPlaylistButtonHandler();

	$("a[targetdiv='Playlist'").click(function(){
		if(!selectedAudio ||  selectedAudio.length === 0){
			$("#divEmptyPlaylist").show();
		} else {
			$("#divEmptyPlaylist").hide();
		}
	});
});

var attachStopAllAudioAndPlayThis = function(){
	$("audio").each(function(index, audioElement){
		var audioPlayer = audioElement;
		
		audioPlayer.onplay = function(){
			audioPlayer.pause();
			$("audio").each(function(i,e){
				$(e)[0].pause();
				$(e)[0].currenTime = 0;
			});
			$(audioPlayer)[0].play();
		};
	});
}

var notify = function(message, type) {
	$.notify({
		// options
		message: message 
	},{
		// settings
		type: type
	});
}

$(document).ready(function(){
	var contentLoadedEvent = new Event("content-loaded");
	document.dispatchEvent(contentLoadedEvent);
});