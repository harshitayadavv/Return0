import React, { useState, useEffect, use } from "react";
import { View, Text, Image, TextInput, Button, FlatList } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SERVER_IP = "192.168.31.110"; // Replace with your server's local IP
const SERVER_URL = `ws://${SERVER_IP}:3000`;

const ChatRoomScreen = ({ userName }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [user, setUserName] = useState("Guest");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedData = await AsyncStorage.getItem("userName");
        if (storedData) {
          const { userName } = JSON.parse(storedData);
          setUserName(userName);
        }
      } catch (error) {
        console.error("Error fetching user name", error);
      }
    };
    fetchUserName();

    const connectToWebSocket = async () => {
      const state = await NetInfo.fetch();
      console.log(state.type);
      if (state.type === "wifi") {
        const ws = new WebSocket(SERVER_URL);

        ws.onopen = () => {
          console.log("Connected to WebSocket server");
        };

        ws.onmessage = (event) => {
          const oldMsg = JSON.parse(event.data);
          console.log(oldMsg);
          console.log(messages);
          setMessages((prev) => [...prev, oldMsg]);
        };
        ws.onerror = (error) => console.error("WebSocket Error:", error);
        ws.onclose = () => console.log("Disconnected from WebSocket");

        setSocket(ws);
      } else {
        console.log("Not connected to Wi-Fi, WebSocket unavailable");
      }
    };

    connectToWebSocket();
  }, []);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      let timestamp = Date.now();
      let userName = user;
      const message = {
        text: inputMessage,
        user: userName,
        id: timestamp,
        timestamp: timestamp,
      };
      socket.send(JSON.stringify(message));

      setMessages((prev) => [...prev, message]);
      setInputMessage("");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.timestamp.toString()} // Ensure keys are unique
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
              alignSelf:
                item.user === user
                  ? "flex-end"
                  : item.user === "SAARTHI"
                  ? "center"
                  : "flex-start",
            }}
          >
            {item.user !== user && item.user !== "SAARTHI" && (
              <Image
                source={item.profileImg}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginRight: 10,
                }}
              />
            )}
            <View
              style={{
                backgroundColor:
                  item.user === "SAARTHI"
                    ? "#FFF4D1"
                    : item.user === "CREW"
                    ? "#f29ec8"
                    : item.user === user
                    ? "#007AFF"
                    : "#E5E5EA",
                padding: 10,
                borderRadius: 15,
                maxWidth: "70%",
                borderColor:
                  item.user === "SAARTHI" ? "#FFD700" : "transparent",
                borderWidth: item.user === "SAARTHI" ? 1 : 0,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color:
                    item.user === "SAARTHI"
                      ? "#DAA520"
                      : item.user === "CREW"
                      ? "#8B0000" // Darker text for better contrast
                      : "#000",
                }}
              >
                {item.user}
              </Text>
              <Text>{item.text}</Text>
            </View>
          </View>
        )}
      />
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
        value={inputMessage}
        onChangeText={setInputMessage}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default ChatRoomScreen;
