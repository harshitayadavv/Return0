// ChatRoom.js
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
import Icon from "react-native-vector-icons/Ionicons";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

// Supabase Configuration
const supabase = createClient(
  "https://skzuwesngshemxovjerl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrenV3ZXNuZ3NoZW14b3ZqZXJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5NzIzNTcsImV4cCI6MjA1NDU0ODM1N30.KcZl_AX75he-1yxQSxJA1Z7nqg8w1zMzYq_p02GG8pE"
);

// WebSocket Configuration
const SERVER_IP = "192.168.31.110";
const SERVER_URL = `ws://${SERVER_IP}:3000`;

// Offensive words detector (keep your existing list)
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

const ChatRoom = ({ userName }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [user, setUserName] = useState("Guest");
  const flatListRef = useRef(null);
  const [isOnline, setIsOnline] = useState(false);

  // Load messages from cache and Supabase
  useEffect(() => {
    const initializeChat = async () => {
      // Load cached messages
      const cachedMessages = await AsyncStorage.getItem("cachedMessages");
      if (cachedMessages) {
        setMessages(JSON.parse(cachedMessages));
      }

      // Load recent messages from Supabase
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("timestamp", { ascending: true })
        .limit(50);

      if (!error && data) {
        setMessages((prev) => [
          ...new Map([...prev, ...data].map((msg) => [msg.id, msg])).values(),
        ]);
      }
    };

    initializeChat();
  }, []);

  // Network handling
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected && state.isInternetReachable);
    });

    return () => unsubscribe();
  }, []);

  // WebSocket handling
  useEffect(() => {
    let ws;

    const connectWebSocket = async () => {
      ws = new WebSocket(SERVER_URL);

      ws.onopen = async () => {
        console.log("WebSocket connected");
        await syncLocalMessages();
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prev) => [
          ...new Map([...prev, message].map((msg) => [msg.id, msg])).values(),
        ]);
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
        setTimeout(connectWebSocket, 5000);
      };

      setSocket(ws);
    };

    if (isOnline) connectWebSocket();

    return () => {
      if (ws) ws.close();
    };
  }, [isOnline]);

  // Message synchronization
  const syncLocalMessages = async () => {
    const localMessages = await AsyncStorage.getItem("localMessages");
    if (!localMessages) return;

    const messagesToSync = JSON.parse(localMessages);
    const { error } = await supabase.from("messages").insert(messagesToSync);

    if (!error) {
      await AsyncStorage.removeItem("localMessages");
      setMessages((prev) => [
        ...new Map(
          [...prev, ...messagesToSync].map((msg) => [msg.id, msg])
        ).values(),
      ]);
    }
  };

  const storeMessageLocally = async (message) => {
    const existing = await AsyncStorage.getItem("localMessages");
    const messages = existing ? JSON.parse(existing) : [];
    messages.push(message);
    await AsyncStorage.setItem("localMessages", JSON.stringify(messages));
  };

  const sendMessage = async () => {
    try {
      if (containsOffensiveWords(inputMessage)) {
        Alert.alert("Warning", "Please avoid offensive language");
        return;
      }
      const tmsp = Date.now();
      const newMessage = {
        id: tmsp,
        text: inputMessage,
        user: "user@example.com",
        nickname: user,
        timestamp: tmsp,
        source: isOnline ? "online" : "local",
      };

      // Local first approach
      setMessages((prev) => [...prev, newMessage]);
      setInputMessage("");

      if (isOnline) {
        if (socket?.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(newMessage));
        }
        const { error } = await supabase.from("messages").insert(newMessage);
        console.log(error);
        if (error) await storeMessageLocally(newMessage);
      } else {
        await storeMessageLocally(newMessage);
      }
    } catch (e) {
      console.error("Error is here", e);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatMessage item={item} user={user} />}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      <MessageInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        sendMessage={sendMessage}
      />
    </View>
  );
};

const ChatMessage = ({ item, user }) => (
  <View style={messageStyles.container(item, user)}>
    {item.nickname !== user && item.nickname !== "SAARTHI" && (
      <Image source={item.profileImg} style={messageStyles.avatar} />
    )}
    <View style={messageStyles.bubble(item, user)}>
      <Text style={messageStyles.nickname(item)}>{item.nickname}</Text>
      <Text>{item.text}</Text>
    </View>
  </View>
);

const MessageInput = ({ inputMessage, setInputMessage, sendMessage }) => (
  <View style={inputStyles.container}>
    <TextInput
      style={inputStyles.field}
      placeholder="Type your message..."
      value={inputMessage}
      onChangeText={setInputMessage}
    />
    <TouchableOpacity onPress={sendMessage}>
      <Icon name="paper-plane" size={30} color="#007AFF" />
    </TouchableOpacity>
  </View>
);

// Style objects
const messageStyles = {
  container: (item, user) => ({
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    alignSelf: item.nickname === user ? "flex-end" : "flex-start",
  }),
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  bubble: (item) => ({
    backgroundColor: getBubbleColor(item.nickname),
    padding: 10,
    borderRadius: 15,
    maxWidth: "70%",
  }),
  nickname: (item) => ({
    fontWeight: "bold",
    color: getNicknameColor(item.nickname),
  }),
};

const inputStyles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  field: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
};

// Helper functions
const getBubbleColor = (nickname) => {
  const colors = {
    SAARTHI: "#FFF4D1",
    CREW: "#f29ec8",
    default: "#E5E5EA",
  };
  return colors[nickname] || colors.default;
};

const getNicknameColor = (nickname) => {
  const colors = {
    SAARTHI: "#DAA520",
    CREW: "#8B0000",
    default: "#000",
  };
  return colors[nickname] || colors.default;
};

export default ChatRoom;
