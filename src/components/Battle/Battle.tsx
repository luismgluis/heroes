import { Button, Layout, Text, useTheme } from "@ui-kitten/components";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import HeroType from "../../libs/types/HeroType";
import Panel from "../Panel/Panel";
import HeroCard from "./../HeroCard/HeroCard";
const TAG = "BATTLE";

const Battle = ({ navigation, route, initialBattleID = "" }) => {
  console.log(TAG, navigation);
  const aHero: HeroType = new HeroType({});
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
      <View style={styles.panelButtons}>
        <Button style={styles.button}>RUN</Button>
        <Button style={styles.button}>FIGHT</Button>
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
  panelButtons: {
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  button: {
    height: 80,
    width: 100,
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
export default Battle;
