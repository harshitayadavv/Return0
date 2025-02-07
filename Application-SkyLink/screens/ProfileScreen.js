import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const [name, setName] = useState("Guest");
  const [bio, setBio] = useState(
    "Disciplined. Fearless. Committed to duty and honor. ⚔"
  );
  const [email, setEmail] = useState("tejas@example.com");
  const [phone, setPhone] = useState("+91 9876543210");
  const [isEdited, setIsEdited] = useState(false);

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

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem(
        "userName",
        JSON.stringify({ userName: name })
      );
      setIsEdited(false);
    } catch (error) {
      console.error("Error saving user name", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.profileText}>Profile</Text>
      <View style={styles.avatarContainer}>
        <Image
          source={require("../assets/avatar1.jpg")}
          style={styles.avatar}
        />
        <FontAwesome name="pencil" size={20} color="black" />
      </View>

      <View style={[styles.card, { backgroundColor: "#CDF3FD" }]}>
        <Text style={styles.label}>Nick Name</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(text) => {
              setName(text);
              setIsEdited(true);
            }}
          />

          <FontAwesome name="edit" size={20} color="black" />
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: "#DBC2CF" }]}>
        <Text style={styles.label}>Bio</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            value={bio}
            onChangeText={(text) => {
              setBio(text);
              setIsEdited(true);
            }}
          />
          <FontAwesome name="edit" size={20} color="black" />
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: "#EDE7B1" }]}>
        <Text style={styles.label}>Personal Information</Text>
        <Text style={styles.info}>Email: {email}</Text>
        <Text style={styles.info}>Mobile: {phone}</Text>
      </View>

      <TouchableOpacity>
        <TouchableOpacity onPress={handleSave}>
          <Text
            style={[styles.saveButton, { color: isEdited ? "black" : "grey" }]}
          >
            Save
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 10,
  },
  profileText: { fontSize: 24, fontWeight: "bold", fontFamily: "serif" },
  avatarContainer: { position: "relative", marginVertical: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  editAvatar: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 20,
  },
  card: { width: "90%", borderRadius: 8, padding: 10, marginVertical: 10 },
  label: { fontSize: 21, fontWeight: "bold", fontFamily: "Inria Sans" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: { fontSize: 20, fontWeight: "300", flex: 1 },
  info: { fontSize: 18, marginTop: 5 },
  saveButton: { fontSize: 18, marginTop: 20 },
});

export default ProfileScreen;
