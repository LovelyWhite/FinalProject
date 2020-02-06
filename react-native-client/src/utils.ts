import { ReactInstance } from "react";

export function sendMessageToWebview(webView:ReactInstance,object:{},fun:string){
    object["fun"]=fun;
    webView&&webView.postMessage(JSON.stringify(object));
}