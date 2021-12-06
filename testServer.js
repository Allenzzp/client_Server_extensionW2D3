const net = require("net");
const readline = require("readline");
let rl = readline.createInterface({
  input: process.stdin,
});
const connUsers = [];

const generateId = () => {
  let num = Math.floor(Math.random() * 100000) + "";
  while (num.length < 6) {
    num = "0" + num;
  }
  return num;
};

const startTalk = (username1, username2) => {
  let user1;
  let user2;

  for (let i = 0; i < connUsers.length; i++) {
    const currUser = connUsers[i];
    if (currUser.username === username1) {
      user1 = connUsers[i];
    } else if (currUser.username === username2) {
      user2 = connUsers[i];
    }
  }
  user1.chatWith = user2;
  user2.chatWith = user1;
};

const checkOnlineUsers = () => {
  let userList = "";
  for (let user of connUsers) {
    userList += user.username +" ";
  }
  return userList;
}

const server = net.createServer((socket) => {
  socket.setEncoding("utf8");
  socket.id = generateId();
  socket.username = "";
  connUsers.push(socket);
  console.log(`Client[${socket.id}] connected`);

  socket.write(`
  \t\t\tServer
  \t\t\tWelcome! Your User ID is ${socket.id} Please enter your chose Username:`);

  socket.on("end", () => {
    for (let i = 0; i < connUsers.length; i++) {
      if (connUsers[i].id === socket.id) {
        connUsers.splice(i, 1);
        break;
      }
    }
    console.log(`Client[${(socket.username !== "")? socket.username : socket.id}] left`);
    rl.close();
  });

  socket.on("data", (data) => {
    //set username
    if (socket.username === "") {
      socket.username = data;
      socket.write(`
      \t\t\tServer
      \t\t\tYou have set your username as ${socket.username}`);
    }

    //clinets talk
    if (data === "talk") {
      socket.write(`
      \t\t\tServer
      \t\t\tWho do you want to talk with?
      \t\t\t${checkOnlineUsers()}`);
      socket.openConn = true;
    }

    if (socket.openConn) {
      if (connUsers.map((conn) => {
        return conn.username;
      }).includes(data)) {
        startTalk(socket.username, data);
        return;
      }
    }
    
    if (socket.chatWith) {
      socket.chatWith.write(`
      \t\t\t${socket.username}
      \t\t\t${data}`);
    } 

    //print what clients sent
    console.log(`Client[${(socket.username !== "")? socket.username : socket.id}]: ${data}`);

  });
});

//server to client
//when there are two clients connected with server! rl.on will be called twice!
rl.on("line", (line) => {
  console.log("line read is:", line);

  const receivedArr = line.split("->");
  const message = receivedArr[0];
  const target = receivedArr[1];

  const res = `
  \t\t\tServer
  \t\t\t${message}`;

  if (target === undefined) {
    for (let conn of connUsers) {
      conn.write(res);
    }
  } else {
    for (let conn of connUsers) {
      if (conn.username === target) {
        conn.write(res);
        break;
      }
    }
  }
});

server.listen(3001, () => {
  console.log(`Server listens on port 3001`);
});