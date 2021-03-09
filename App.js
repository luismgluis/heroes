/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { SafeAreaView, View, Text, StatusBar } from "react-native";

import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { ApplicationProvider, Button, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import "react-native-gesture-handler";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./src/reducers/index.js";
import AppNav from "./AppNav";
import { SafeAreaProvider } from "react-native-safe-area-context";
import theme from "./src/themes/one.json"

const store = createStore(
  reducers, // Reducers
  {}, // Estado inicial
  applyMiddleware(reduxThunk),
);

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
          <NavigationContainer>
            <AppNav />
          </NavigationContainer>
        </ApplicationProvider>
      </Provider>
    </SafeAreaProvider>
  );
  /* <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <View>
          <Button>hola</Button>
        </View>
      </ApplicationProvider> */
};

export default App;
