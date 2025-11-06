import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MovieCard from './screens/MovieCard';
import TrailerScreen from './screens/TrailerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MovieCard" component={MovieCard} />
        <Stack.Screen name="Trailer" component={TrailerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
