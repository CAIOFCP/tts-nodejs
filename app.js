var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');
var os = require('os');
var exec = require('child_process').exec;

console.log("Este programa converte para audio "+
            " a mensagem de texto 'Olá Mundo' " +
            " ou uma mensagem informada como argumento utilizando " +
            " o serviço Watson Text to Speech, " +
            " salva o audio no arquivo output.wav e executa o audio");

//read config file with credentials
var config = require('./config');

if (config.username=="" || config.password==""){
  console.error("\nATENÇÃO !!! usuário ou senha em branco, atualize o arquivo config.js\n");
}

//check what OS is running
var isWin = (os.platform() === 'win32');
var isMac = (os.platform() === 'darwin');
var isLinux = (os.platform() === 'linux');


//read input args
if (process.argv.length > 2){
  var args = process.argv.slice(2);
  var sentenceToSpeak = args.join(" ");
}

var text_to_speech = new TextToSpeechV1({
  username: config.username,
  password: config.password
});

var params = {
  text: sentenceToSpeak || 'Olá Mundo',
  voice: config.voice || 'pt-BR_IsabelaVoice', // Optional voice
  accept: 'audio/wav'
};

// Pipe the synthesized text to a file
text_to_speech.synthesize(params).pipe(fs.createWriteStream('output.wav'))
              .on('close', function() {

  //prepare audio exec command depending on OS running
  if(isMac){
    var command = 'play output.wav';
  } else if (isWin){
    var command = 'sox -t waveaudio -d output.wav';
  } else if (isLinux){
    var command = 'aplay output.wav';
  }

  //Execute/Play audio file output.wav
  var create_audio = exec(command, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
});
