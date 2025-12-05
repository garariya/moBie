import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import MovieCard from './screens/MovieCard';
import TrailerScreen from './screens/TrailerScreen';
import ExplorePage from './screens/ExplorePage';
import HelpCenter from './screens/HelpCenter';
import AccountCenter from './screens/AccountCenter';
import MoviesExplore from './screens/MoviesExplore';
import TVSeriesExplore from './screens/TVSeriesExplore';
import Animated from './screens/Animated';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExplorePage} />
      <Tab.Screen name="Help" component={HelpCenter} />
      <Tab.Screen name="Account" component={AccountCenter} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="MovieCard" component={MovieCard} />
        <Stack.Screen name="Trailer" component={TrailerScreen} />
        <Stack.Screen name="MoviesExplore" component={MoviesExplore} />
        <Stack.Screen name="TVSeriesExplore" component={TVSeriesExplore} />
        <Stack.Screen name="Animated" component={Animated} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
