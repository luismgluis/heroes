import {
  Button,
  Icon,
  Input,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import React, { useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import api from "../../libs/api/api";
import { HeroType } from "../HeroCard/HeroCard";
import Panel from "../Panel/Panel";
const TAG = "SEARCH HERO";
let actualInputValue = "";
const SearchInput = () => {
  const [inputValue, setInputValue] = useState("flash");
  let myTime = setTimeout(() => {}, 0);
  function callApi() {
    api
      .searchHeroesByName(inputValue)
      .then((data) => {
        console.log(TAG, data);
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

const CustomMessage = ({ onPress, data }) => {
  return (
    <View>
      <Pressable onPress={onPress}>
        <Text>pp</Text>
      </Pressable>
    </View>
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
        <SearchInput />
      </View>
      <View style={styles.top}>
        <FlatList
          ref={messageList}
          scrollEnabled={false}
          style={styles.flatList}
          data={dataO}
          renderItem={(rowData) => (
            <CustomMessage onPress={callBack} data={rowData} />
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
