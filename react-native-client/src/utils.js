export function sendMessageToWebview(webView,object,funName){
    object["funName"]=funName;
    webView&&webView.postMessage(JSON.stringify(object));
}