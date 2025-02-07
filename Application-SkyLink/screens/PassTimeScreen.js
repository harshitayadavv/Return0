import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { t } from "react-native-tailwindcss";
import Icon from "react-native-vector-icons/Ionicons";

const PassTimeScreen = () => {
  const bookData = [
    {
      title: "Defeat Into Victory",
      uri: require("../assets/PassTime/book1.png"),
    },
    { title: "The Brave", uri: require("../assets/PassTime/book2.png") },
    {
      title: "Military History India",
      uri: require("../assets/PassTime/book3.png"),
    },
    { title: "India's Wars", uri: require("../assets/PassTime/book4.png") },
    { title: "The Indian Army", uri: require("../assets/PassTime/book5.png") },
    {
      title: "India's Most Fearless",
      uri: require("../assets/PassTime/book6.png"),
    },
  ];

  return (
    <SafeAreaView style={[t.flex1, t.bgWhite]}>
      <StatusBar backgroundColor="#f3f4f6" barStyle="dark-content" />

      <ScrollView>
        {/* Warrior of the Day Section */}
        <View style={[t.m4, t.bgYellow100, t.roundedLg, t.p4, t.shadowLg]}>
          <Text style={[t.text2xl, t.fontBold, t.textCenter, t.mB2]}>
            Warrior Of the Day
          </Text>

          <View style={[t.flexRow, t.itemsCenter, t.justifyBetween]}>
            <Image
              source={{
                uri: "https://i.pinimg.com/736x/d2/f9/63/d2f963086080cf718c0ad93ce007074e.jpg",
              }}
              style={[t.w32, t.h32, t.roundedFull, t.border2, t.borderGray300]}
            />
            <View style={[t.flex1, t.mL4]}>
              <Text style={[t.textBlack, t.fontMedium, t.mB2]}>
                Yogendra Singh Yadav
              </Text>
              <Text style={[t.textGray700, t.textSm]}>
                Honorary Captain (Subedar Major)
              </Text>
              <Text style={[t.textJustify, t.mT2, t.textGray800]}>
                Yogendra Singh Yadav is a retired Indian Army soldier known for
                his bravery during the 1999 Kargil War. Despite severe injuries,
                he played a crucial role in securing key positions.
              </Text>
            </View>
          </View>
        </View>

        {/* Books Section */}
        <View style={[t.m4, t.bgBlue100, t.roundedLg, t.p4, t.shadowLg]}>
          <Text style={[t.text2xl, t.fontBold, t.textCenter, t.mB4]}>
            Books
          </Text>

          <View style={[t.flexRow, t.flexWrap, t.justifyBetween]}>
            {bookData.map((book, index) => (
              <View key={index} style={[t.w1_3, t.mB4, t.itemsCenter]}>
                <Image
                  source={book.uri}
                  style={[t.w24, t.h32, t.roundedLg, t.shadowSm, t.mB2]}
                />
                <Text style={[t.textCenter, t.textGray800]}>{book.title}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PassTimeScreen;
