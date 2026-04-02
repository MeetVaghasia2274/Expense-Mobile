import 'react-native-get-random-values';
import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import TrendsScreen from './screens/TrendsScreen';
import { initDB } from './lib/db';
import { COLORS } from './constants/theme';

const Tab = createBottomTabNavigator();

const NAV_THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.bg,
    card: COLORS.tabBar,
    text: COLORS.text,
    border: COLORS.tabBarBorder,
    primary: COLORS.accent,
    notification: COLORS.accent,
  },
};
//default 
export default function App() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor={COLORS.bg} />
      <NavigationContainer theme={NAV_THEME}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: COLORS.accent,
            tabBarInactiveTintColor: COLORS.textMuted,
            tabBarStyle: {
              backgroundColor: COLORS.tabBar,
              borderTopColor: COLORS.tabBarBorder,
              borderTopWidth: 1,
              height: 60,
              paddingBottom: 8,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <Text style={{ fontSize: size, color }}>🏠</Text>
              ),
            }}
          />
          <Tab.Screen
            name="Trends"
            component={TrendsScreen}
            options={{
              tabBarLabel: 'Trends',
              tabBarIcon: ({ color, size }) => (
                <Text style={{ fontSize: size, color }}>📊</Text>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}
