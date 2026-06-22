import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Platform, Text } from 'react-native';
import { SubscriptionsScreen } from '../screens/dashboard/SubscriptionsScreen';
import { HomeScreen } from '../screens/dashboard/HomeScreen';
import { HomeIcon } from '../components/icons/HomeIcon';
import { SubsIcon } from '../components/icons/SubsIcon';
import { InsightIcon } from '../components/icons/InsightIcon';
import { SettingsIcon } from '../components/icons/SettingsIcon';

import { MonthlyInsightsScreen } from '../screens/dashboard/MonthlyInsightsScreen';

import { SettingsScreen } from '../screens/settings/SettingsScreen';

export type MainTabParamList = {
  Home: undefined;
  Subs: undefined;
  Insights: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

// Colors from StitchMCP HTML reference
const NAV_BG = '#0C111D';
const ACTIVE_COLOR = '#A1401E';
const INACTIVE_COLOR = '#9CA3AF';
const ACTIVE_CIRCLE = 48;

export function MainTabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 28 : 24,
          left: 28,
          right: 28,
          height: 68,
          backgroundColor: NAV_BG,
          borderRadius: 40,
          borderTopWidth: 0,
          elevation: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.2,
          shadowRadius: 24,
          paddingBottom: 0,
          // Center icons vertically within the bar
          alignItems: 'center',
          justifyContent: 'center',
        },
        // This ensures the icon is vertically centered
        tabBarItemStyle: {
          height: 68,
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? ACTIVE_COLOR : 'transparent',
                width: ACTIVE_CIRCLE,
                height: ACTIVE_CIRCLE,
                borderRadius: ACTIVE_CIRCLE / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <HomeIcon color={focused ? '#FFFFFF' : INACTIVE_COLOR} size={22} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Subs"
        component={SubscriptionsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? ACTIVE_COLOR : 'transparent',
                width: ACTIVE_CIRCLE,
                height: ACTIVE_CIRCLE,
                borderRadius: ACTIVE_CIRCLE / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SubsIcon color={focused ? '#FFFFFF' : INACTIVE_COLOR} size={22} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Insights"
        component={MonthlyInsightsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? ACTIVE_COLOR : 'transparent',
                width: ACTIVE_CIRCLE,
                height: ACTIVE_CIRCLE,
                borderRadius: ACTIVE_CIRCLE / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <InsightIcon color={focused ? '#FFFFFF' : INACTIVE_COLOR} size={22} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? ACTIVE_COLOR : 'transparent',
                width: ACTIVE_CIRCLE,
                height: ACTIVE_CIRCLE,
                borderRadius: ACTIVE_CIRCLE / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SettingsIcon color={focused ? '#FFFFFF' : INACTIVE_COLOR} size={22} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
