function postJson(url,obj,callback){
	var sender = new XMLHttpRequest();
	sender.open("POST",url,true);
	sender.setRequestHeader("Content-type", "application/json");
	sender.send(JSON.stringify(obj));
	sender.onreadystatechange = function(){
		if(sender.readyState == 4 && sender.status == 200){
			var res = JSON.parse(sender.responseText);
			callback(res);
		}
	}
}