import { join } from "path";
import express from "express";
import socketIO from "socket.io";
import logger from "morgan";

const PORT = 4001;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.static(join(__dirname, "static")));
app.get("/", (req, res) => res.render("home"));

const handleListening = () =>
  console.log(`Server running: http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);
const io = socketIO(server);

let sockets = [];

io.on("connection", socket => {
  sockets.push(socket.id);
});
