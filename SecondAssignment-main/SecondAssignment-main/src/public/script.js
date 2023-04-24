var socket = io();

const btn = document.getElementById("btnSend");
const msgInput = document.getElementById("msgInput");
const msgList = document.getElementById("msgList");

btn.onclick = function click() {
  socket.emit("msg_client", {
    msg: msgInput.value,
  });
};

socket.on("msg_rcvd", (data) => {
  const li = document.createElement("li");
  li.innerText = data.msg;
  msgList.appendChild(li);
});
