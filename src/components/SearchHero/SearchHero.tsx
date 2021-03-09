import {
  Button,
  Icon,
  Input,
  Layout,
  ListItem,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import React, { useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import api from "../../libs/api/api";
import HeroType from "../../libs/types/HeroType";

import Panel from "../Panel/Panel";
const TAG = "SEARCH HERO";
let actualInputValue = "";
const SearchInput = ({ onResults = (data) => {} }) => {
  const [inputValue, setInputValue] = useState("flash");
  let myTime = setTimeout(() => {}, 0);
  function callApi() {
    api
      .searchHeroesByName(inputValue)
      .then((data) => {
        console.log(TAG, data);
        onResults(data);
      })
      .catch((err) => {
        console.log(TAG, err);
      });
  }
  function search(text) {
    setInputValue(text);
    clearTimeout(myTime);
    actualInputValue = text;
    myTime = setTimeout(() => {
      if (text == actualInputValue) {
        callApi();
      }
    }, 300);
    //
  }
  const renderIcon = (props) => (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          setInputValue("");
        }}>
        <Icon
          {...props}
          name={inputValue !== "" ? "close" : "search-outline"}
        />
      </TouchableWithoutFeedback>
    </>
  );

  return (
    <View>
      <Input
        value={inputValue}
        onChangeText={(text) => {
          search(text);
        }}
        accessoryRight={renderIcon}
      />
    </View>
  );
};

interface CustomMessageProps {
  onPress: (data) => void;
  dataO: any;
}
const CustomMessage = ({ onPress, dataO }: CustomMessageProps) => {
  console.log(TAG, dataO);

  const data = new HeroType(dataO.item);

  const renderItemAccessory = (props) => (
    <Button
      onPress={() => {
        onPress(data);
      }}
      size="tiny">
      Select
    </Button>
  );

  const renderItemIcon = (props) => <Icon {...props} name="person" />;

  return (
    <ListItem
      title={`${data.name}`}
      description={`${data.description}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
  );
};

const CustomTopNav = ({ goBack = () => {} }) => {
  const BackIcon = (fnOnPress: () => void) => {
    return (props) => (
      <Pressable onPress={fnOnPress}>
        <Icon {...props} name="arrow-back" />
      </Pressable>
    );
  };

  const BackAction = () => <TopNavigationAction icon={BackIcon(goBack)} />;

  return (
    <TopNavigation
      accessoryLeft={BackAction}
      title={() => (
        <Text style={{ textAlign: "center" }} category="h3">
          Search Heroes⚡
        </Text>
      )}
    />
  );
};

const SearchHero = ({ navigation, route }) => {
  let callBack = (data) => {};
  const goBack = () => {
    navigation.goBack();
  };
  if (typeof route.params.callBack !== "undefined") {
    callBack = (data) => {
      console.log(TAG, data);
      route.params.callBack(data);
      goBack();
    };
  }
  console.log(TAG, route);
  const messageList = useRef<FlatList>();
  const [dataO, setDataO] = useState<Array<HeroType>>([]);
  return (
    <Panel totalHeight={0}>
      <CustomTopNav goBack={goBack} />
      <View style={styles.top}>
        <SearchInput onResults={(data) => setDataO(data)} />
      </View>
      <View style={styles.top}>
        <FlatList
          ref={messageList}
          scrollEnabled={false}
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
const styles = StyleSheet.create({
  top: {
    padding: 5,
  },
  flatList: {},
});
export default SearchHero;
