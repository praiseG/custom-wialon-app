// Fetch GET Parameters
function getHtmlVar(name) {
	if (!name)
		return null;
	var pairs = decodeURIComponent(document.location.search.substr(1)).split("&");
	for (var i = 0; i < pairs.length; i++) {
		var pair = pairs[i].split("=");
		if (pair[0] == name) {
			pair.splice(0, 1);
			return pair.join("=");
		}
	}
	return null;
}

function listUnits(){
  console.log("fetching Units");
  return;
}

function login(code){
  console.log("Code: " + code);
  if(code){
    alert("Login Error");
    return;
  }
  var username = wialon.core.Session.getInstance().getCurrentUser().getName();
  document.getElementById("username").innerHTML = username;

  listUnits();
}

function initSdk(){
  console.log("Initializing SDK");
  var url = getHtmlVar("baseUrl") || getHtmlVar("HostUrl");
  console.log("url: " + url);
  if (!url)
    return;
  var user = getHtmlVar("user") || "";
  var sid = getHtmlVar("sid");
  var authHash = getHtmlVar("authHash");

  wialon.core.Session.getInstance().initSession(url);
  if(authHash){
    console.log("logging in with authHash");
    wialon.core.Session.getInstance().loginAuthHash(authHash, login);
  }else{
    console.log("logging in with sid");
    wialon.core.Session.getInstance().duplicate(sid, user, true, login);
  }
}

function onLoad(){
  initSdk();
}

$(document).ready(onLoad);