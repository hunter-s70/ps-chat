# ps-chat

Node js &amp; socket.io chat
Using technologies: Node.js, socket.io, mongoDB, mongoose.js, express.js

Demo on: https://ps-chat-app.herokuapp.com

# To run project locally:
You need to have Node.js, npm, MongoDB installed

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

5. Run the project (cross-platform)
```
npm run dev
```

5'. Or set NODE_PATH for Windows (if need)
```
set NODE_PATH=.
```
run for development
```
supervisor bin/www
```

6. Open localhost:3000 in browser
