import express from "express"
import path from "path"
import { createServer } from "http"
import { Server } from "socket.io"
import mongoose, { ConnectOptions} from "mongoose"

const app = express()

const server = createServer(app)

mongoose.connect("mongodb://localhost/rocket-socket", {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as ConnectOptions)

app.use(express.static(path.join(__dirname, "..", "public")))

const io = new Server(server)

io.on("connection", (socket) => {
  console.log("Socket", socket.id)
})

app.get("/", (request, response) => {
  return response.json({
    message: "Hello websocket"
  })
})

export { server, io }