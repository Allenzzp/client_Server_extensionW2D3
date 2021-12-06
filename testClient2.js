const net = require("net");
const rl = require("readline").createInterface({
  input: process.stdin,
});

const client = net.createConnection({
  ip: "localhost",
  port: 3001,
});

client.setEncoding("utf-8");

client.on("data", (data) => {
  console.log(`${data}`);
});

rl.on("line", (line) => {
  if (line === "bye") {
    rl.close();
    client.end();
    return;
  }
  client.write(line);
});