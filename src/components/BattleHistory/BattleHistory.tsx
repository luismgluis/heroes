import {
  Avatar,
  Button,
  Icon,
  Layout,
  ListItem,
  Text,
} from "@ui-kitten/components";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import api from "../../libs/api/api";
import { BattleType } from "../../libs/types/BattleType";
import HeroType from "../../libs/types/HeroType";
import utils from "../../libs/utils/utils";
import Panel from "../Panel/Panel";
const TAG = "BATTLE HISTORY";

interface CustomMessageProps {
  onPress: (data) => void;
  dataO: any;
}
const CustomMessage = ({ onPress, dataO }: CustomMessageProps) => {
  const data = new BattleType(dataO.item);

  const renderAvatar = (imageUrl) => {
    return (props) => (
      <Avatar
        size="large"
        source={{
          uri: imageUrl,
        }}
      />
    );
  };

  return (
    <ListItem
      key={utils.generateKey(
        `BattleHistoryItem${data.hero1.id + data.hero2.id}`,
      )}
      title={`${data.hero1.name} VS ${data.hero2.name}`}
      description={`Type: ${data.confrontation} / Win: ${data.winner.hero.name}`}
      accessoryLeft={renderAvatar(data.hero1.urlImage)}
      accessoryRight={renderAvatar(data.hero2.urlImage)}
    />
  );
};

const BattleHistory = (onSelect) => {
  const messageList = useRef<FlatList>();
  const [dataO, setDataO] = useState<Array<BattleType>>([]);
  const callBack = () => {};
  const loadData = () => {
    api.getBattleHistory().then((data) => {
      setDataO(data);
    });
  };
  useEffect(() => {
    loadData();
  }, [setDataO]);
  return (
    <Panel totalHeight={0}>
      <View style={styles.panelTitle}>
        <Text category="h3" style={styles.panelTitleText}>
          Fight history
        </Text>
        <Button
          style={styles.panelTitleButton}
          onPress={loadData}
          appearance="outline"
          accessoryRight={(props) => <Icon {...props} name="flip-outline" />}>
          Refresh
        </Button>
      </View>
      <View style={styles.top}>
        <FlatList
          ref={messageList}
          scrollEnabled={true}
          style={styles.flatList}
          data={dataO}
          renderItem={(item) => (
            <CustomMessage onPress={callBack} dataO={item} />
          )}
        />
      </View>
    </Panel>
  );
};
const w = Dimensions.get("screen");
const styles = StyleSheet.create({
  top: {
    padding: 0,
    borderRadius: 12,
    overflow: "hidden",
  },
  flatList: {
    height: w.height - 200,
  },
  panelTitle: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "row",
    alignSelf: "center",
  },
  panelTitleText: {
    textAlign: "center",
  },
  panelTitleButton: {
    borderRadius: 12,
    marginLeft: 10,
  },
});
export default BattleHistory;
