import { Button, Layout, Text, useTheme } from "@ui-kitten/components";
import React, { useState } from "react";
import { Alert, Dimensions, Image, StyleSheet, View } from "react-native";
import HeroType from "../../libs/types/HeroType";
import Panel from "../Panel/Panel";
import HeroCard from "./../HeroCard/HeroCard";
const TAG = "BATTLE";
const cAlert = (title, msj) => {
  Alert.alert(
    title,
    msj,
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    { cancelable: false },
  );
};
const actionRun = (hero1: HeroType, hero2: HeroType) => {
  const p1 = hero1.powerstats;
  const p2 = hero2.powerstats;
  if (p1.speed == p2.speed) {
    cAlert("it's a tie", "Now change to another hero");
    return;
  }
  if (p1.speed > p2.speed) {
    cAlert(`${hero1.name} wins`, `${p1.speed} is greater than ${p2.speed}`);
    return;
  }
  cAlert(`${hero2.name} wins`, `${p2.speed} is greater than ${p1.speed}`);
};
const actionFight = (hero1: HeroType, hero2: HeroType) => {
  const p1 = hero1.powerstats;
  const p2 = hero2.powerstats;
  if (p1.power == p2.power) {
    cAlert("it's a tie", "Now change to another hero");
    return;
  }
  if (p1.power > p2.power) {
    cAlert(`${hero1.name} wins`, `${p1.power} is greater than ${p2.power}`);
    return;
  }
  cAlert(`${hero2.name} wins`, `${p2.power} is greater than ${p1.power}`);
};

const Battle = ({ navigation, route, initialBattleID = "" }) => {
  console.log(TAG, navigation);
  const initialHero: HeroType = new HeroType({});
  const [actualHero1, setActualHero1] = useState(initialHero);
  const [actualHero2, setActualHero2] = useState(initialHero);
  return (
    <Panel style={styles.container}>
      <View style={styles.panelCards}>
        <View style={styles.panelCard}>
          <HeroCard
            onHeroUpdate={setActualHero1}
            heroData={initialHero}
            navigation={navigation}
          />
        </View>
        <View style={styles.panelCard}>
          <HeroCard
            onHeroUpdate={setActualHero2}
            heroData={initialHero}
            navigation={navigation}
          />
        </View>
      </View>
      {actualHero1.id !== "" && actualHero2.id !== "" && (
        <View style={styles.panelButtons}>
          <Button
            onPress={() => {
              actionRun(actualHero1, actualHero2);
            }}
            style={styles.button}>
            RUN
          </Button>
          <Button
            onPress={() => {
              actionFight(actualHero1, actualHero2);
            }}
            style={styles.button}>
            FIGHT
          </Button>
        </View>
      )}
      {!(actualHero1.id !== "" && actualHero2.id !== "") && (
        <View style={styles.panelButtons}>
          <Text status="warning" category="h6">
            Waiting fighters
          </Text>
        </View>
      )}
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
