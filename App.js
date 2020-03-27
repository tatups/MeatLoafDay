
import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MeatLoafParser } from './components/MeatLoafParser';
import { SettingPage } from './components/SettingPage';

const Stack = createStackNavigator();




const App: () => React$Node = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={MeatLoafParser}
            options={{ title: 'MeatLoafDay 0.1' }}
          />
          <Stack.Screen name="Settings" component={SettingPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};


export default App;
