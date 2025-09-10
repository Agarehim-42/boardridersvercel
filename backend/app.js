import express from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"
import cookieParser from "cookie-parser"
import { connectDatabase } from "./backend/utils/database.js"
import productsRouter from "./backend/routes/productRoutes.js"
import userRouter from "./backend/routes/auth.js"
import errorsMiddleware from "./backend/middleware/errorMiddleware.js"
import blogRoutes from "./backend/routes/blog.js"
import ChatMessage from "./backend/model/Socket.js"

// dotenv.config({ path: "config/config.env" });

const app = express()

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
)

connectDatabase()

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1", productsRouter)
app.use("/crud/v1", userRouter)
app.use("/api/v1/", blogRoutes)

app.use(errorsMiddleware)

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
})

io.on("connection", async (socket) => {
  console.log("Yeni client bağlandı:", socket.id)

  try {
    const chatHistory = await ChatMessage.find({}).sort({ createdAt: 1 })
    socket.emit("chatHistory", chatHistory)
  } catch (error) {
    console.error("Chat geçmişi alınırken hata:", error)
  }

  socket.on("chatMessage", async (data) => {
    try {
      const newMessage = new ChatMessage({
        sender: data.sender,
        userName: data.userName,
        text: data.text,
      })

      await newMessage.save()
      io.emit("chatMessage", newMessage)
    } catch (error) {
      console.error("Mesaj kaydedilirken hata:", error)
    }
  })

  socket.on("disconnect", () => {
    console.log("Client ayrıldı:", socket.id)
  })
})

const PORT = process.env.PORT || 3010
server.listen(PORT, () => {
  console.log("Server " + PORT + " portunda çalışıyor")
})

export default app
