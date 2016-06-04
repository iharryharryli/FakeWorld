
postJson("login",{type:"aCar"},function(res){
		if(! res.success){
			window.location = "google";
		}
		else{
			StoryBegin(res.userID);
		}
});
