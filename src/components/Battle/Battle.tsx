import { Button, Layout, Text, useTheme } from "@ui-kitten/components";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Panel from "../Panel/Panel";
import HeroCard, { HeroType } from "./../HeroCard/HeroCard";
const TAG = "BATTLE";

const Battle = ({ navigation, route, initialBattleID = "" }) => {
  console.log(TAG, navigation);
  const aHero: HeroType = {
    name: "",
    urlImage: "",
    id: "",
  };
  return (
    <Panel style={styles.container}>
      <View style={styles.panelCards}>
        <View style={styles.panelCard}>
          <HeroCard heroData={aHero} navigation={navigation} />
        </View>
        <View style={styles.panelCard}>
          <HeroCard heroData={aHero} navigation={navigation} />
        </View>
      </View>
    </Panel>
  );
};
const w = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    height: w.height - 80,
    //width: "50%",
  },
  panelCards: {
    flex: 12,
    flexDirection: "row",
  },
  panelCard: {
    flex: 6,
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
export default Battle;
