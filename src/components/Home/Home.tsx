import {
  Button,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  useTheme,
  ViewPager,
} from "@ui-kitten/components";
import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Battle from "../Battle/Battle";
import BattleHistory from "../BattleHistory/BattleHistory";
import HeroInfo from "../HeroInfo/HeroInfo";
import Panel from "../Panel/Panel";

const TAG = "HOME";
const CustomTitle = () => {
  return (
    <Text style={{ textAlign: "center" }} category="h3">
      HeroesVS⚡
    </Text>
  );
};
const Home = ({ navigation, route }) => {
  const goGame = () => {
    navigation.navigate("GameBoard");
  };

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [initialBattleID, setInitialBattleID] = useState("");
  const theme = useTheme();
  return (
    <Panel>
      <TopNavigation title={CustomTitle} />
      <ViewPager
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}>
        <View>
          <Battle
            navigation={navigation}
            route={route}
            initialBattleID={initialBattleID}
          />
        </View>
        <View>
          <Button>holas2</Button>
        </View>
      </ViewPager>
    </Panel>
  );
  /**  <ViewPager
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}>
        <View style={styles.tab}>
          <Battle navigation route initialBattleID={initialBattleID} />
        </View>
        <View style={styles.tab}>
          <BattleHistory
            onSelect={(battleID) => setInitialBattleID(battleID)}
          />
        </View>
      </ViewPager>*/
};
const w = Dimensions.get("window");
const styles = StyleSheet.create({
  panelButton: { padding: 10 },
  tab: {
    flex: 1,
    height: w.height - 80,
    backgroundColor: "red",
  },
});
export default Home;
