import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { User, CreditCard, Landmark, Bell, Moon, Shield, Download, Lock, LogOut, ChevronRight } from 'lucide-react-native';
import { signOut } from '../../services/firebase/auth';
import { useSubscriptions } from '../../hooks/useSubscriptions';

export function SettingsScreen() {
  const navigation = useNavigation();
  const { data: subscriptions } = useSubscriptions();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Log Out', 
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to log out');
            }
          }
        }
      ]
    );
  };

  const handleExportData = async () => {
    try {
      if (!subscriptions || subscriptions.length === 0) {
        Alert.alert('No Data', 'You have no subscriptions to export.');
        return;
      }
      
      const exportData = JSON.stringify(subscriptions, null, 2);
      
      await Share.share({
        message: exportData,
        title: 'SubTrack Export',
      });
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to export data');
    }
  };

  const renderSectionHeader = (title: string) => (
    <Text className="text-text-muted text-[13px] font-app font-semibold uppercase tracking-wider ml-4 mb-2 mt-6">
      {title}
    </Text>
  );

  const renderRow = ({ 
    icon: Icon, 
    label, 
    onPress, 
    rightElement, 
    isLast = false, 
    isDestructive = false 
  }: any) => (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      className={`flex-row items-center justify-between py-4 px-4 bg-background-surface ${
        !isLast ? 'border-b border-border-warm' : ''
      } ${isDestructive ? 'bg-action-danger-surface rounded-card' : ''}`}
      style={{
        borderBottomWidth: !isLast && !isDestructive ? 1 : 0,
      }}
    >
      <View className="flex-row items-center">
        {!isDestructive && (
          <View className="w-10 h-10 rounded-full bg-background-appAlt items-center justify-center mr-3">
            <Icon size={20} color="#6B5A52" />
          </View>
        )}
        {isDestructive && (
          <View className="w-10 h-10 items-center justify-center mr-1">
            <Icon size={20} color="#C71F1F" />
          </View>
        )}
        <Text className={`font-app text-[16px] ${isDestructive ? 'font-medium text-action-danger-text' : 'font-regular text-text-primary'}`}>
          {label}
        </Text>
      </View>
      
      <View>
        {rightElement ? (
          rightElement
        ) : !isDestructive ? (
          <ChevronRight size={20} color="#8A8D97" />
        ) : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-background-app">
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-text-primary text-[24px] font-app font-bold mb-2">Settings</Text>

        {renderSectionHeader('Account')}
        <View className="bg-background-surface rounded-card border border-border-warm overflow-hidden">
          {renderRow({
            icon: User,
            label: 'Profile',
            onPress: () => (navigation as any).navigate('Profile'),
          })}
          {renderRow({
            icon: CreditCard,
            label: 'Payment Methods',
            onPress: () => Alert.alert('Coming Soon', 'Payment methods will be available in the next update.'),
          })}
          {renderRow({
            icon: Landmark,
            label: 'Connected Banks',
            onPress: () => Alert.alert('Coming Soon', 'Bank connection will be available in the next update.'),
            isLast: true,
          })}
        </View>

        {renderSectionHeader('Preferences')}
        <View className="bg-background-surface rounded-card border border-border-warm overflow-hidden">
          {renderRow({
            icon: Bell,
            label: 'Push Notifications',
            rightElement: (
              <Switch 
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#E0E9EF', true: '#A1401E' }}
                thumbColor="#FFFFFF"
              />
            ),
          })}
          {renderRow({
            icon: Moon,
            label: 'Dark Mode',
            isLast: true,
            rightElement: (
              <Switch 
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: '#E0E9EF', true: '#A1401E' }}
                thumbColor="#FFFFFF"
              />
            ),
          })}
        </View>

        {renderSectionHeader('Data & Security')}
        <View className="bg-background-surface rounded-card border border-border-warm overflow-hidden">
          {renderRow({
            icon: Shield,
            label: 'Security Settings',
            onPress: () => (navigation as any).navigate('Security'),
          })}
          {renderRow({
            icon: Download,
            label: 'Export Data',
            onPress: handleExportData,
          })}
          {renderRow({
            icon: Lock,
            label: 'Privacy Policy',
            onPress: () => (navigation as any).navigate('Privacy'),
            isLast: true,
          })}
        </View>

        <View className="mt-8 mb-4">
          {renderRow({
            icon: LogOut,
            label: 'Log Out',
            onPress: handleLogout,
            isDestructive: true,
            isLast: true,
          })}
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}
