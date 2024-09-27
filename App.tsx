import 'react-native-gesture-handler';
import React from "react";
import { PaperProvider } from 'react-native-paper';
import { LoginScreen } from "./src/screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from './src/Navigator/StackNavigator';

export const App = () => {
  return(
    <NavigationContainer>
    <PaperProvider>
      <StackNavigator/>
    </PaperProvider>
    </NavigationContainer>
  )
}

export default App;