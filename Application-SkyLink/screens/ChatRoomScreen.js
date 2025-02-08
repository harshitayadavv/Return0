import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons"; // Import Ionicons for the send button icon

const SERVER_IP = "192.168.31.110"; // Replace with your server's local IP
const SERVER_URL = `ws://${SERVER_IP}:3000`;

//offensive chat detector
const offensiveWords = [
  "saale",
  "fuckers",
  "motherfuckers",
  "fucker",
  "motherfucker",
  "bc",
  "bhenchod",
  "chut",
  "pussy",
  "behenchod",
  "bahanchod",
  "Raand",
  "Randi",
  "Randwa",
  "lawde",
  "lode",
  "lund",
  "madarchod",
  "fuck",
  "chudja",
  "chud",
  "bhosdi",
  "bhosdiwale",
  "bsdk",
  "chudale",
  "chod",
  "pel",
  "aand",
  "chutiya",
  "shit",
  "asshole",
  "bastard",
  "bitch",
  "bloody",
  "useless",
  "bhen",
  "kutta",
  "kutti",
  "gaandu",
  "vagina",
  "penis",
  "suck",
  "maar",
  "bullshit",
  "cock",
  "trap",
  "curse",
  "damn",
  "destroy",
  "disgusting",
  "dumb",
  "evil",
  "fool",
  "fraud",
  "hate",
  "hell",
  "idiot",
  "stupid",
  "jerk",
  "kill",
  "loser",
  "moron",
  "murder",
  "nasty",
  "pathetic",
  "pervert",
  "pig",
  "piss",
  "plague",
  "poison",
  "racist",
  "rude",
  "scam",
  "scum",
  "shame",
  "slut",
  "stink",
  "thief",
  "thug",
  "toxic",
  "trash",
  "ugly",
  "vicious",
  "violent",
  "vomit",
  "vulgar",
  "waste",
  "weak",
  "worthless",
  "wreck",
  "yuck",
  "immoral",
  "indecent",
  "infected",
  "inhuman",
  "insensitive",
  "jealous",
  "liar",
  "menace",
  "merciless",
  "miserable",
  "moody",
  "narcissist",
  "neglect",
  "nightmare",
  "numb",
  "oppressive",
  "plunder",
  "predator",
  "prideful",
  "quarrelsome",
  "rebellious",
  "reckless",
  "repulsive",
  "ruthless",
  "sadist",
  "savage",
  "snob",
  "spiteful",
  "spoiled",
  "stray",
  "suspicious",
  "taunt",
  "temper",
  "troll",
  "underhanded",
  "unethical",
  "unfriendly",
  "unkind",
  "untrustworthy",
  "vain",
  "wickedness",
  "wretched",
  "xenophobe",
  "abhor",
  "abomination",
  "accursed",
  "agitate",
  "airhead",
  "anarchist",
  "angry",
  "antagonist",
  "apocalypse",
  "appalling",
  "atrocious",
  "backstabber",
  "badmouth",
  "banish",
  "barbaric",
  "blackmail",
  "blasphemy",
  "blight",
  "boastful",
  "boil",
  "brainless",
  "breakdown",
  "brutal",
  "brute",
  "burden",
  "chaos",
  "cheater",
  "clueless",
  "cockroach",
  "cold-hearted",
  "collusion",
  "compulsive",
  "con",
  "condescend",
  "conflict",
  "contempt",
  "contradict",
  "corrode",
  "cowardly",
  "crafty",
  "cranky",
  "cripple",
  "cross",
  "cunning",
  "curseword",
  "cutthroat",
  "cynic",
  "deadbeat",
  "deceiver",
  "defame",
  "degrade",
  "deluded",
  "demean",
  "demonic",
  "deranged",
  "despair",
  "desperate",
  "despotic",
  "detestable",
  "dictator",
  "dimwit",
  "dirtbag",
  "disarray",
  "disaster",
  "disgust",
  "disheveled",
  "dishonor",
  "disloyal",
  "disobey",
  "disrespect",
  "disrupt",
  "dissident",
  "distorted",
  "double-faced",
  "downfall",
  "drain",
  "drunkard",
  "dunce",
  "embarrass",
  "executioner",
  "exploit",
  "extreme",
  "fanatic",
  "filthy_minded",
  "frightening",
  "germ",
  "ghastly",
  "glum",
  "goof",
  "gory",
  "grating",
  "greedy-guts",
  "grievance",
  "grimace",
  "grudge",
  "grumpy",
  "gullible",
  "haggard",
  "harsh",
  "havoc",
  "headache",
  "heinous",
  "hiss",
  "hoax",
  "hood",
  "horrendous",
  "hysterical",
  "idiotic",
  "ignoramus",
  "ill-fated",
  "ill-mannered",
  "ill-tempered",
  "impostor",
  "impudent",
  "incite",
  "incompetent",
  "indecisive",
  "inept",
  "infamous",
  "infectious",
  "inhumane",
  "insolent",
  "intolerant",
  "irrational",
  "irritate",
  "jabber",
  "jackass",
  "jeer",
  "jest",
  "jinx",
  "junky",
  "lackey",
  "lackluster",
  "lament",
  "liability",
  "loath",
  "loiter",
  "lousy",
  "lunacy",
  "madman",
  "malicious",
  "manipulator",
  "masochist",
  "meddlesome",
  "menacing",
  "mishap",
  "mooch",
  "muddle",
  "nag",
  "narcotic",
  "neglectful",
  "negligent",
  "nightmarish",
  "noisy",
  "notorious",
  "nuisance",
  "obscene",
  "obsessive",
  "offender",
  "onerous",
  "oppressor",
  "outburst",
  "outlaw",
  "overbearing",
  "overkill",
  "overrated",
  "overthrow",
  "panicky",
  "parasitic",
  "patronizing",
  "pauper",
  "penalty",
  "perish",
  "petty",
  "phony",
  "pitiful",
  "plagiarist",
  "ploy",
  "pollute",
  "pompous",
  "pout",
  "predatory",
  "pretentious",
  "prickly",
  "provoke",
  "psychopath",
  "quitter",
  "ravenous",
  "renegade",
  "repent",
  "reproach",
  "revenge",
  "revolting",
  "rough",
  "rowdy",
  "ruin",
  "selfishness",
  "shabby",
  "shady",
  "shallow",
  "shun",
  "sly",
  "smug",
  "snarl",
  "sneaky",
  "snooty",
  "squabble",
  "squash",
  "squirm",
  "stealthy",
  "squirt",
  "stern",
  "sting",
  "struggle",
  "stubborn",
  "stuffy",
  "subversive",
  "sulky",
  "suspicion",
  "syndrome",
  "tantrum",
  "terrorize",
  "threat",
  "troublemaker",
  "tumult",
  "twisted",
  "ugliness",
  "ulterior",
  "uncaring",
  "undermine",
  "undignified",
  "unforgiving",
  "ungrateful",
  "unjust",
  "unlawful",
  "untamed",
  "untrusting",
  "unwise",
  "venomous",
  "villain",
  "violent-tempered",
  "volatile",
  "weak-willed",
  "whiny",
  "wicked-hearted",
];

const containsOffensiveWords = (message) => {
  const words = message.toLowerCase().split(/\s+/); // Splits message into words
  return words.some((word) => offensiveWords.includes(word));
};

//end here

const ChatRoomScreen = ({ userName }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [user, setUserName] = useState("Guest");
  const flatListRef = useRef(null); // Ref for FlatList
  const [networkState, setNetworkState] = useState(null);
  const [isOnline, setIsOnline] = useState(false);

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

    // Network state subscription
    const unsubscribeNetInfo = NetInfo.addEventListener((state) => {
      setNetworkState(state);
      setIsOnline(state.isConnected && state.isInternetReachable);
    });

    return () => {
      unsubscribeNetInfo();
    };
  }, []);

  useEffect(() => {
    let ws;

    const connectToWebSocket = async () => {
      if (networkState?.type === "wifi" && isOnline) {
        try {
          // Close existing connection if any
          if (socket) {
            socket.close();
            setSocket(null);
          }

          ws = new WebSocket(SERVER_URL);

          ws.onopen = () => {
            console.log("Connected to WebSocket server");
            // Sync offline messages when reconnecting
            // syncLocalMessages();
          };

          ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            let found = false;
            messages.forEach((msg) => {
              console.log(msg.timestamp);
              if (msg.timestamp == message.timestamp) {
                found = true;
              }
            });
            if (!found) {
              setMessages((prev) => [...prev, message]);
            }
          };

          ws.onerror = (error) => {
            console.log("WebSocket Error:", error);
            handleConnectionError();
          };

          ws.onclose = () => {
            console.log("Disconnected from WebSocket");
            handleConnectionClose();
          };

          setSocket(ws);
        } catch (error) {
          console.error("WebSocket connection failed:", error);
        }
      } else {
        console.log("Using Firebase instead");
        //syncLocalMessages(); // Sync any pending messages
      }
    };

    const handleConnectionError = () => {
      // Fallback to Firebase
      if (socket) {
        socket.close();
        setSocket(null);
      }

      //syncLocalMessages();
    };

    const handleConnectionClose = () => {
      // Attempt reconnect after delay
      setTimeout(() => {
        if (networkState?.type === "wifi" && isOnline) {
          connectToWebSocket();
        }
      }, 5000);
    };
    connectToWebSocket();

    return () => {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    };
  }, [networkState, isOnline]);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = () => {
    if (containsOffensiveWords(inputMessage)) {
      Alert.alert(
        "Warning",
        "You are not following chat guidelines. Please avoid using offensive language."
      );
      return;
    }

    if (socket && socket.readyState === WebSocket.OPEN) {
      let timestamp = Date.now();
      let userName = user;
      const message = {
        text: inputMessage,
        user: "example@gmail.com",
        nickname: userName,
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
        ref={flatListRef} // Assign ref to FlatList
        data={messages}
        keyExtractor={(item) => item.timestamp.toString()} // Ensure unique keys
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
              alignSelf:
                item.nickname === user
                  ? "flex-end"
                  : item.nickname === "SAARTHI"
                  ? "center"
                  : "flex-start",
            }}
          >
            {item.nickname !== user && item.nickname !== "SAARTHI" && (
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
                  item.nickname === "SAARTHI"
                    ? "#FFF4D1"
                    : item.nickname === "CREW"
                    ? "#f29ec8"
                    : item.nickname === user
                    ? "#ADD8E6"
                    : "#E5E5EA",
                padding: 10,
                borderRadius: 15,
                maxWidth: "70%",
                borderColor:
                  item.nickname === "SAARTHI" ? "#FFD700" : "transparent",
                borderWidth: item.nickname === "SAARTHI" ? 1 : 0,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color:
                    item.nickname === "SAARTHI"
                      ? "#DAA520"
                      : item.nickname === "CREW"
                      ? "#8B0000"
                      : "#000",
                }}
              >
                {item.nickname}
              </Text>
              <Text>{item.text}</Text>
            </View>
          </View>
        )}
        onContentSizeChange={() =>
          flatListRef.current.scrollToEnd({ animated: true })
        }
        onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            fontSize: 16,
            marginRight: 10,
          }}
          placeholder="Type your message..."
          value={inputMessage}
          onChangeText={setInputMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={{ padding: 10 }}>
          <Icon name="paper-plane" size={30} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatRoomScreen;
