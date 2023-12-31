import * as fs from 'fs'
import * as AccountManager from './openlive-account-manager.js'

export function anti_xss_replace(message){
    message = message.replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/&/gi, "&amp;").replace(/"/gi, "&quot;").replace(/'/gi, "&#x27;").replace(/\//gi, "&#x2F;")
    return message
}

export function write_connected_notify(uid){
    fs.appendFileSync("chat_area_div_content.html","<div style=\"color: rgb(138, 138, 138)\">用户 " + AccountManager.GetAccountObjectByUid(uid).DISPLAY_NAME + " 进入直播间</div>\n")
}

export function write_message(message,uid){
    message = anti_xss_replace(message)
    fs.appendFileSync("chat_area_div_content.html","<div>" + AccountManager.GetAccountObjectByUid(uid).DISPLAY_NAME + ": " + message + "</div>\n")
}

export function init_chat(){
    if(!fs.existsSync("chat_area_div_content.html")){
        fs.writeFileSync("chat_area_div_content.html","")
    }
}