import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";

// Import screens from the screens folder
import HomeScreen from "./screens/HomeScreen";
import ChatRoom from "./screens/ChatRoom";
import PassTimeScreen from "./screens/PassTimeScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "#1C3144" },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="home" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Chat Room"
          component={ChatRoom}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="chat" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="PassTime"
          component={PassTimeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="game-controller" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user-alt" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
