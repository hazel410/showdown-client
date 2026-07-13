const webSocket = require('ws');
const readLine = require('readline');
const TEXT_LINE = '########################\n'

function getformattedResponse(command) {
  // all these consts require updates for gen 10
  const VALID_DT_ALIASES = ['details', 'dt', 'dt1', 'dt2', 'dt3', 'dt4', 'dt5', 'dt6', 'dt7', 'dt8', 'dt9']
  const VALID_DS_ALIASES = ['dexsearch', 'ds', 'nds', 'ds1', 'ds2', 'ds3', 'ds4', 'ds5', 'ds6', 'ds7', 'ds8', 'ds9']
  const VALID_MS_ALIASES = []
}

function main() {
  // consts
  const socket = new webSocket('ws://sim3.psim.us:8000/showdown/websocket');
  const readInterface = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  // prompt the user forever!!!!
  function recursivePrompt() {
  readInterface.question(TEXT_LINE, (command) => {
    if ((command.toLowerCase() === 'exit') | (command.toLowerCase() === '/exit')) {
      socket.close();
      readInterface.close();
      return;
    } else {
      socket.send(`|${command}`);
      recursivePrompt();
    }});
  } 

  // listen
  socket.on('open', () => {
    console.log('status: connected!');
    recursivePrompt(socket, readInterface);
  });

  socket.on('message', (message) => {
    console.log('message')
    let messageStr = `${message}`; // I dont know why this works, but it formats it
    const isDoMessageLog = messageStr[0] == '|';
    if (isDoMessageLog) {
      messageStr = messageStr.substring(1);
    }
    const parsedMessage = messageStr.split('|');
    const messageType = parsedMessage[0];
    if (messageType !== 'updateuser') {
      console.log(parsedMessage);
    }
  });

  socket.on('error', (error) => {
    console.error('error: ', error);
  });

  socket.on('close', () => {
    console.log('status: disconnected!');
    process.exit(0);
  });
}

main();