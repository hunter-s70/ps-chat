# ps-chat
node js &amp; socket.io chat

To run project locally:

1. Clone repo
```
git clone git@github.com:hunter-s70/ps-chat.git
```
or 

```
git clone https://github.com/hunter-s70/ps-chat.git
```

2. Go into project folder
```
cd ps-chat
```

3. Install dependensies
```
npm install
```

4. Download and run mondod server and open mongo https://www.mongodb.com/
```
cd ~/mongodb/bin
mongod
mongo
```

5. Run the project
```
npm run dev
```

5*. Set NODE_PATH for Windows (if need)
```
set NODE_PATH=.
```
and run 
```
supervisor bin/www
```

6. Open localhost:3000 in browser
