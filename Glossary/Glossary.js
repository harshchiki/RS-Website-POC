var glossary = 
{
	"w1":"meaning1",
	"w2":"meaning2"
};

var getMeaning = function(word) {
	var trimmedKey = word.toLowerCase().trim();
	if(glossary[trimmedKey] != undefined) {
		return glossary[trimmedKey];
	} else {
		return "";
	}
}

var showMeaning = function(event) {
	if(event == undefined || event.target == undefined) {
		return; 
	}

	var word = $(event.target).html();
	var meaning = getMeaning(word);
	
	if(meaning != undefined && meaning !== "") {
		$(event.target).attr("data-content",meaning);
		$(event.target).popover("show");
	}
}


$(document).ready(function(){
	
	
	$("a.word-meaning").hover(function(event){
		showMeaning(event);
	});
	
	$("a.word-meaning").mouseout(function(){
		$("div.popover[role='tooltip']").hide();
	});
});


