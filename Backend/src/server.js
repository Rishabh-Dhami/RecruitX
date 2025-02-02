import http from 'http';
import { app } from './app.js';
import { connectDB } from './database/db.js';



const server = http.createServer(app);


connectDB()
.then(() => {
    server.listen(process.env.PORT, () => {
        console.log("server is running");
    })
})


export { server}