var xmlHttp;
export function srvTime() {
  try {
    //FF, Opera, Safari, Chrome
    xmlHttp = new XMLHttpRequest();
  } catch (err1) {
    //AJAX not supported, use CPU time.
    alert("AJAX not supported");
  }
  xmlHttp.open("HEAD", window.location.href.toString(), false);
  xmlHttp.setRequestHeader("Content-Type", "text/html");
  xmlHttp.send("");
  return xmlHttp.getResponseHeader("Date");
}
