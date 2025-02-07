import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const flightAlerts = [
  {
    id: 1,
    text: "✅ Flight 6E321 is now boarding at Gate 7.",
    time: "10:30 AM",
    color: "#8FDFF8",
  },
  {
    id: 2,
    text: "⚠ Flight 6E321 delayed.\nNew time: 5:30 PM.",
    time: "9:58 AM",
    color: "#DBC2CF",
  },
];

const HomeScreen = () => {
  const [name, setName] = useState("Guest");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedData = await AsyncStorage.getItem("userName");
        if (storedData) {
          const { userName } = JSON.parse(storedData);
          setName(userName);
        }
      } catch (error) {
        console.error("Error fetching user name", error);
      }
    };
    fetchUserName();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Welcome, {name}!</Text>
      <Image source={require("../assets/2flight.jpg")} style={styles.image} />
      {flightAlerts.map((alert) => (
        <View
          key={alert.id}
          style={[styles.card, { backgroundColor: alert.color }]}
        >
          <Text style={styles.cardText}>{alert.text}</Text>
          <Text style={styles.cardTime}>{alert.time}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 30,
    marginTop: 18,
    marginBottom: 20,
  },
  skylinkText: {
    fontSize: 30,
    fontFamily: "serif",
    fontWeight: "400",
    textAlign: "left",
  },
  tagline: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    width: width * 0.9,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
  },
  cardTime: {
    fontSize: 12,
    textAlign: "right",
  },
});

export default HomeScreen;
