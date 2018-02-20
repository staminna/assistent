var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
msg.voice = voices[10]; // Note: some voices don't support altering params
msg.voiceURI = 'native';
msg.volume = 1; // 0 to 1
msg.rate = 1; // 0.1 to 10
msg.pitch = 1; //0 to 2
msg.voiceURI = 'Google UK English Female';
msg.lang = 'en-US';

function speak(text){
//  annyang.pause();
  msg.text = text;
  speechSynthesis.speak(msg);
//  doWait();
}

function doWait() {
    if(speechSynthesis.speaking) {//we want it to match
        setTimeout(doWait, 500);//wait 50 millisecnds then recheck
        return;
    }
    //real action
doWait();
}


//annyang.start({ autoRestart: false, continuous: false });
