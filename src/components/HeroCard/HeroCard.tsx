import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import StackUtils from "stack-utils";
import HeroType from "../../libs/types/HeroType";
const TAG = "";

const Stats = ({ title, value }) => {
  return (
    <View style={styles.itemStats}>
      <Text>{title + ": "}</Text>
      <Text style={styles.numStats}>{value}</Text>
    </View>
  );
};

const StarIcon = (props) => <Icon {...props} name="flip-outline" />;

interface HeroCardProps {
  heroData: HeroType;
  navigation: any;
}
const HeroCard = ({ heroData, navigation }: HeroCardProps) => {
  const [heroInfo, setHeroInfo] = useState(heroData);
  if (heroData.urlImage == "") {
    heroData.urlImage =
      "https://lh3.googleusercontent.com/fife/ABSRlIoG9pumdlsLMPY2EKWZhnMdixz1XJrG1qEtz0z6a4KVGHh13UdNEJXZQv1EiRt1qRPduk5Ikxc6tplJWhtZFyfRbZ4C7vFNFuoaPquVTTWUTVrkHraLBDLI2MVihrapHEW91HyE5DQ_T-zJzkyAaYscBo6O4pmrQwL5pipBLw2pinj1bkpJQThlc4QctcdpL-9UiKsFbctpTS39B15hvT-P9ST89VWFV8qRt5fsfJLQqELcB8mqkbQ2FkVozukaGW5LY4Wslsr0gnnRQ_fucoqVzOO_4v5DiQSJd1fYFaVHrp8M236tofVnErLHuGoIpdNbEa8y_I2nB-9sPq4C18qA0fM7VvlM42YNdZTUREwumTeSnww5eebnpbZZAxkOBAlNtTfqQZ8L3FTZbgeh-Z109Wh7qDXfxr4RE9Pc1KfSjV5skj8f9f18TTRGf9GJZ67frQCeEc834A7K18ja40ghTw2wcASDQNw-FdwGGxaDyrWGViAex_O7OQQPd3YCPPiOSwxakoCBFhwqpV7jUmXBYnQX7HPF5IowJ_TDFOOrSM55I-vzY_c24A6y4JreLg7KsBZRYO5JsSDheF5AQ_0NqLJTQ1ynmzIwKxafVU47N0foSMcyO3uYoVj6igkDVM7bYtAEmGblxhwqz9TzSP-1sdPUTcCj7OM2som5FqT2xrnPahKeDuTLG76t_B3L-r1BSWV8mB3o0FsB4W_hq7JHfnS9aN04ZQ=w1538-h829-ft";
  }

  const onPress = () => {
    console.log(TAG, "pepe");
    navigation.navigate("SearchHero", {
      callBack: (data) => {
        console.log(TAG, data);
        setHeroInfo(data);
      },
    });
  };
  const allPowers = [];
  console.log(TAG, "allPowers");
  for (const key in heroInfo.powerstats) {
    if (!Object.prototype.hasOwnProperty.call(heroInfo.powerstats, key)) {
      continue;
    }
    const power = heroInfo.powerstats[key];
    allPowers.push(<Stats title={key.toUpperCase()} value={power} />);
  }
  const buttonTitle = heroInfo.name !== "" ? "Change Hero" : "Select Hero";
  return (
    <View>
      <Layout style={styles.cardHero}>
        <Text category="h5" style={styles.cardName}>
          {heroInfo.name}
        </Text>
        <Image
          style={styles.cardImage}
          source={{
            uri: heroInfo.urlImage,
          }}
        />
        <Button onPress={onPress} accessoryRight={StarIcon}>
          {buttonTitle}
        </Button>
      </Layout>
      <Layout style={styles.panelStats}>{allPowers}</Layout>
    </View>
  );
};

const w = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    height: w.height - 80,
    //width: "50%",
  },
  numStats: {
    position: "absolute",
    right: 0,
    top: 3,
  },
  itemStats: {
    width: "100%",
    flexDirection: "row",
    padding: 5,
    alignContent: "space-between",
  },
  panelStats: {
    borderRadius: 12,
    marginTop: 5,
    padding: 5,
  },
  cardHero: {
    //height: w.height / 4 + 80,
    borderRadius: 12,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: w.height / 4,
  },
  cardName: {
    paddingLeft: 5,
    textAlign: "center",
    position: "absolute",
    top: 0,
    zIndex: 1,
    width: "100%",
    backgroundColor: "#01235acc",
  },
});

export default HeroCard;
