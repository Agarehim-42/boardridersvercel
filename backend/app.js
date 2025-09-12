// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./config/dbConnect.js";
import productsRouter from "./routes/product.js";
import userRouter from "./routes/auth.js";
import errorsMiddleware from "./middleware/errors.js";
import cartRouter from "./routes/product.js";
import blogRoutes from "./routes/blog.js";


// ChatMessage modelini import ediyoruz (dosya yolunu proje yapınıza göre ayarlayın)
import ChatMessage from "./model/Socket.js";

dotenv.config({ path: "config/config.env" });

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

connectDatabase();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", productsRouter);
app.use("/crud/v1", userRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1/", blogRoutes);


app.use(errorsMiddleware);

// HTTP server ve Socket.IO entegrasyonu
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", async (socket) => {
  console.log("Yeni client bağlandı:", socket.id);

  // Client bağlanır bağlanmaz veritabanındaki chat geçmişini çekip gönderiyoruz
  try {
    const chatHistory = await ChatMessage.find({}).sort({ createdAt: 1 });
    socket.emit("chatHistory", chatHistory);
  } catch (error) {
    console.error("Chat geçmişi alınırken hata:", error);
  }

  // Client'tan gelen mesajları dinleyip veritabanına kaydediyoruz
  socket.on("chatMessage", async (data) => {
    // data örneğin { sender: "user", userName: "Ali", text: "Merhaba" } şeklinde olmalı
    try {
      const newMessage = new ChatMessage({
        sender: data.sender,       // "admin" veya "user"
        userName: data.userName,   // Backend'de saklanacak kullanıcı adı
        text: data.text,
      });

      await newMessage.save();

      // Kaydedilen mesajı tüm clientlara yayınlıyoruz
      io.emit("chatMessage", newMessage);
    } catch (error) {
      console.error("Mesaj kaydedilirken hata:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client ayrıldı:", socket.id);
  });
});

server.listen(process.env.PORT, () => {
  console.log("Server " + process.env.PORT + " portunda çalışıyor");
});