// src/components/ChatWidget.jsx
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";


const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  // Normal istifadəçi üçün: tək söhbət pəncərəsi
  const [userChat, setUserChat] = useState([]);

  // Admin üçün: bütün söhbətlər və seçilmiş söhbət
  const [conversations, setConversations] = useState({});
  const [selectedConversation, setSelectedConversation] = useState(null);

  const socketRef = useRef(null);

  // Redux-dan istifadəçi məlumatlarını alırıq
  const { user } = useSelector((state) => state.userSlice);
  // İstifadəçi admin-dirsə "admin", yoxsa "user"
  const role = user && user.user && user.user.role === "admin" ? "admin" : "user";

  useEffect(() => {
    socketRef.current = io("http://localhost:3010");
    // Rol məlumatına görə serverə qoşularkən qeydiyyat
    socketRef.current.emit("register", role);

    // Keçmiş mesajlar
    socketRef.current.on("chatHistory", (history) => {
      if (role === "admin") {
        // Admin üçün: mesajları userId-ə görə qrupla
        const grouped = {};
        history.forEach((msg) => {
          const uid = msg.userId;
          if (!grouped[uid]) grouped[uid] = [];
          grouped[uid].push(msg);
        });
        setConversations(grouped);
      } else {
        setUserChat(history);
      }
    });

    // Yeni mesajlar
    socketRef.current.on("chatMessage", (msg) => {
      if (role === "admin") {
        setConversations((prev) => {
          const conv = prev[msg.userId] ? [...prev[msg.userId]] : [];
          conv.push(msg);
          return { ...prev, [msg.userId]: conv };
        });
      } else {
        setUserChat((prev) => [...prev, msg]);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [role]);

  // 1 saat sonra chat tarixçisini sıfırlamaq üçün
  useEffect(() => {
    const timer = setTimeout(() => {
      if (role === "admin") {
        setConversations({});
        setSelectedConversation(null);
      } else {
        setUserChat([]);
      }
      console.log("1 saat sonra chat sıfırlandı.");
    }, 3600000);

    return () => clearTimeout(timer);
  }, [role]);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const sendMessage = () => {
    if (!message.trim()) return;
    if (role === "admin") {
      // Admin yalnız seçilmiş söhbətə mesaj göndərir
      if (selectedConversation) {
        socketRef.current.emit("chatMessage", {
          sender: "admin",
          userName: user?.user?.name || "Admin",
          text: message,
          userId: selectedConversation,
        });
      }
    } else {
      // Normal istifadəçi: öz söhbətinə mesaj göndərir
      socketRef.current.emit("chatMessage", {
        sender: "user",
        userName: user?.user?.name || "Guest",
        text: message,
        userId: user?.user?._id,
      });
    }
    setMessage("");
  };

  // Admin görünüşü
  const renderAdminView = () => {
    const conversationIds = Object.keys(conversations);

    return (
      <div className="adminContainer">
        {/* Söhbətlərin siyahısı */}
        <div className="conversationList">
          <h4 className="sectionTitle">Konuşmalar</h4>
          {conversationIds.length === 0 && (
            <p className="noMessage">Hələ mesaj yoxdur</p>
          )}
          {conversationIds.map((uid) => {
            const msgs = conversations[uid];
            const lastMsg = msgs[msgs.length - 1];
            return (
              <div
                key={uid}
                className={`conversationItem ${
                  selectedConversation === uid ? "active" : ""
                }`}
                onClick={() => setSelectedConversation(uid)}
              >
                <div className="conversationItemHeader">
                  <strong>{msgs[0].userName}</strong>
                </div>
                <p className="conversationPreview">{lastMsg ? lastMsg.text : ""}</p>
              </div>
            );
          })}
        </div>

        {/* Seçilmiş söhbət detalları */}
        <div className="conversationDetail">
          {selectedConversation ? (
            <>
              <div className="adminChatHeader">
                <h4>
                  {`Konuşma: ${conversations[selectedConversation][0].userName}`}
                </h4>
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="closeConvButton"
                >
                  ✕
                </button>
              </div>
              <div className="chatBody">
                {conversations[selectedConversation].map((msg, index) => {
                  const bubbleClass =
                    msg.sender === "user" ? "bubbleUser" : "bubbleAdmin";
                  return (
                    <div key={index} className="messageItem">
                      <div className={`messageBubble ${bubbleClass}`}>
                        <strong>{msg.userName}</strong>
                        <p className="messageText">{msg.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="chatFooter">
                <input
                  type="text"
                  placeholder="Mesaj yaz..."
                  className="chatInput"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage} className="chatSendButton">
                  Gönder
                </button>
              </div>
            </>
          ) : (
            <div className="noConversation">
              <p className="noMessage">Söhbət seçin</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // İstifadəçi görünüşü
  const renderUserView = () => {
    return (
      <div className="chatWindow">
        <div className="chatHeader">
          <h4>Destek</h4>
          <button onClick={toggleChat} className="closeButton">
            ✕
          </button>
        </div>
        <div className="chatBody">
          {userChat.map((msg, index) => {
            const bubbleClass =
              msg.sender === "admin" ? "bubbleAdmin" : "bubbleUser";
            return (
              <div key={index} className="messageItem">
                <div className={`messageBubble ${bubbleClass}`}>
                  <strong>{msg.userName}</strong>
                  <p className="messageText">{msg.text}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="chatFooter">
          <input
            type="text"
            placeholder="Mesaj yaz..."
            className="chatInput"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage} className="chatSendButton">
            Gönder
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {isOpen && (
        <div className="widgetContainer">
          {role === "admin" ? renderAdminView() : renderUserView()}
        </div>
      )}
      <button onClick={toggleChat} className="chatToggle">
        💬
      </button>
    </>
  );
};

export default ChatWidget;
