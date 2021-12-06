# Origin
In week2 day3, I learned how to build a server and multiple clients, and make them talk to each other and the server can spread message received from one client to other clinets.

However, I felt not familiar with the net and readline modules, so I decided to rewrite this server/client project and even add more features.

## New Features
- [x] Both clients & server support readline
- [x] Client can talkt with each other by using talk
```js
//on clinet side
talk
        Server
        Who do you want to talk with?
        Allen Amy Brian
Allen
```
- [x] Server can choose to send messages to all clients or to a specific clinet
```js
//on server side
message //to all clinets
message->Allen //to a specific client whose username is Allen
```
- [x] Clinet will always receive messages and display them on the right side
- [x] Client can set up a username
![] (https://github.com/Allenzzp/client_Server_extensionW2D3/blob/main/resource/set_username.png)
- [x] Client can choose which online user to start chat

## What Next?