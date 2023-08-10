import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MoviesScreen from '../screens/MoviesList/MovieListScreen';
import MovieDetailsScreen from '../screens/MovieDetails/MovieDetailsScreen';
import {RootStackParamList} from '../interfaces';
import SplashScreen from '../screens/Splash/SplashScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen name="Movies" component={MoviesScreen}  
        options={{
            gestureEnabled: false,
            headerShown: true,
            headerLeft: () => <></>,
          }} />
        <Stack.Screen name="Movie Details" component={MovieDetailsScreen} />
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false}}
  
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
