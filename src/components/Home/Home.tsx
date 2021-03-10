import {
  Button,
  Icon,
  Layout,
  Text,
  TopNavigation,
  useTheme,
  ViewPager,
} from "@ui-kitten/components";
import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Battle from "../Battle/Battle";
import BattleHistory from "../BattleHistory/BattleHistory";
import Panel from "../Panel/Panel";

const TAG = "HOME";
const CustomTitle = ({ onPress }) => {
  const theme = useTheme();
  return (
    <Panel
      style={{
        flexDirection: "row",
        width: "100%",
        height: 50,
        padding: 5,
        backgroundColor: theme["color-info-800"],
      }}>
      <Text style={{ textAlign: "center" }} category="h3">
        HeroesVS⚡
      </Text>
      <Button
        onPress={onPress}
        style={{ position: "absolute", right: 0 }}
        appearance="ghost"
        size="large"
        accessoryRight={(props) => <Icon {...props} name="list-outline" />}
      />
    </Panel>
  );
};
const Home = ({ navigation, route }) => {
  const goGame = () => {
    navigation.navigate("GameBoard");
  };

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [initialBattleID, setInitialBattleID] = useState("");
  //<TopNavigation title={CustomTitle} />
  const changePaperIndex = () => {
    if (selectedIndex == 0) {
      setSelectedIndex(1);
      return;
    }
    setSelectedIndex(0);
  };
  return (
    <Panel totalHeight={0}>
      <CustomTitle onPress={changePaperIndex} />
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
          <BattleHistory />
        </View>
      </ViewPager>
    </Panel>
  );
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
