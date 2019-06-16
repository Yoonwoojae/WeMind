import {
  disableCanvas,
  hideControls,
  enableCanvas,
  showControls,
  resetCanvas
} from "./paint";
import { disableChat, enableChat } from "./chat";

const PLAY_TIME = 29;

const board = document.getElementById("jsPBoard");
const notifs = document.getElementById("jsNotifs");
let countTime = PLAY_TIME;
let interval = null;

const addPlayers = players => {
  board.innerHTML = "";
  players.forEach(player => {
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.nickname}: ${player.points}`;
    board.appendChild(playerElement);
  });
};

const setNotifs = text => {
  notifs.innerText = " ";
  notifs.innerText = text;
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);
export const handleGameStarted = () => {
  setNotifs("");
  disableCanvas();
  hideControls();
  enableChat();
};

export const handleLeaderNotif = ({ word }) => {
  enableCanvas();
  showControls();
  disableChat();
  let inputText = "";
  interval = setInterval(() => {
    inputText = `당신은 출제자 입니다. 제시어: ${word} / 남은시간 : ${countTime}`;
    notifs.innerText = inputText;
    countTime--;
  }, 1000);
};

export const handlePlayerNotif = () => {
  let inputText = "문제를 풀어주세요.";
  notifs.innerText = inputText;
};

export const handleGameEnded = () => {
  setNotifs("게임 오버.");
  disableCanvas();
  hideControls();
  resetCanvas();
  endInterval();
};

const endInterval = () => {
  countTime = PLAY_TIME;
  clearInterval(interval);
};

export const handleGameStarting = () => setNotifs("곧 게임이 시작됩니다.");
