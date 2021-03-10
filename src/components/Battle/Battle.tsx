import { Button, Layout, Text, useTheme } from "@ui-kitten/components";
import React, { useState } from "react";
import { Alert, Dimensions, Image, StyleSheet, View } from "react-native";
import api from "../../libs/api/api";
import { BattleType, BattleTypeProps } from "../../libs/types/BattleType";
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

const actionFight = (data: BattleTypeProps) => {
  const b = new BattleType(data);
  if (b.winner.result == "tie") {
    cAlert(
      "Tied fight",
      `${b.hero1.name} and ${b.hero2.name} has the same ${data.confrontation}`,
    );
    return;
  }
  cAlert(
    `${b.winner.hero.name} wins!`,
    `${b.winner.hero.name} is better than ${b.loser.name} in '${data.confrontation}'`,
  );
  api.saveBattle(b);
};

const Battle = ({ navigation, route, initialBattleID = "" }) => {
  console.log(TAG, navigation);
  const initialHero: HeroType = new HeroType({});
  const [actualHero1, setActualHero1] = useState(initialHero);
  const [actualHero2, setActualHero2] = useState(initialHero);
  return (
    <Panel style={styles.container} totalHeight={80}>
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
            appearance="outline"
            onPress={() => {
              actionFight({
                hero1: actualHero1,
                hero2: actualHero2,
                confrontation: "speed",
              });
            }}
            style={styles.button}>
            RUN
          </Button>
          <Button
            appearance="outline"
            onPress={() => {
              actionFight({
                hero1: actualHero1,
                hero2: actualHero2,
                confrontation: "power",
              });
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
const w = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {},
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
