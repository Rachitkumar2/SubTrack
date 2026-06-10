/// <reference types="nativewind/types" />
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MoreHorizontal } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { AdobeIcon } from '../../components/icons/AdobeIcon';
import { Button } from '../../components/common/Button';
import Animated, { LinearTransition, FadeIn, FadeOut, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';

type Subscription = {
  id: string;
  name: string;
  planName: string;
  price: number;
  billingCycle: string;
  bgColor: string;
  initial: string;
  hasIcon?: boolean;
};

const SUBSCRIPTIONS: Subscription[] = [
  { id: '1', name: 'Dropbox', planName: 'Premium', price: 16.96, billingCycle: '1 month', bgColor: '#9DB9E3', initial: 'D' },
  { id: '2', name: 'Spotify', planName: 'Family Plan', price: 76.77, billingCycle: '3 months', bgColor: '#1DB954', initial: 'S' },
  { id: '3', name: 'GitHub Copilot', planName: 'Pro Business', price: 49.99, billingCycle: '1 month', bgColor: '#0C111D', initial: 'G' },
  { id: '4', name: 'Adobe', planName: 'Family Plan', price: 98.10, billingCycle: '2 months', bgColor: '#FF0000', initial: 'A', hasIcon: true },
  { id: '5', name: 'Figma', planName: 'Premium', price: 19.23, billingCycle: '1 month', bgColor: '#F24E1E', initial: 'F' },
];

const SubscriptionCard = ({ sub, isExpanded, onToggle }: { sub: Subscription, isExpanded: boolean, onToggle: () => void }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(isExpanded ? '#A1401E' : '#ffffff', { duration: 250 }),
      borderColor: withTiming(isExpanded ? '#A1401E' : '#E5E2C8', { duration: 250 }),
    };
  });

  const renderIcon = () => {
    if (sub.hasIcon && sub.name === 'Adobe') {
      return (
        <View style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: '#ffdad6', alignItems: 'center', justifyContent: 'center' }}>
          <AdobeIcon size={24} color="#0C111D" />
        </View>
      );
    }
    
    // Dynamic icon background based on Figma HTML
    let iconBg = sub.bgColor;
    if (sub.name === 'Dropbox') iconBg = '#b8ede3'; // secondary-container
    if (sub.name === 'Spotify') iconBg = '#161c27'; // on-background
    if (sub.name === 'GitHub Copilot') iconBg = '#161c27'; // on-surface
    if (sub.name === 'Figma') iconBg = '#dde2f2'; // surface-container-highest

    return (
      <View 
        style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: iconBg, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
      >
        <Text className="text-white font-app font-bold text-[20px]">{sub.initial}</Text>
      </View>
    );
  };

  return (
    <Animated.View 
      layout={LinearTransition.springify().damping(16).stiffness(150)}
      style={[
        {
          borderRadius: 24,
          marginBottom: 16,
          padding: 20,
          borderWidth: 1,
          shadowColor: '#161c27',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 20,
          elevation: 2,
          overflow: 'hidden',
        },
        animatedStyle,
      ]}
    >
      <TouchableOpacity 
        activeOpacity={0.9}
        onPress={onToggle}
      >
        {/* Header Row */}
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center" style={{ gap: 12 }}>
            {renderIcon()}
            <View>
              <Text 
                className="font-app text-[18px]" 
                style={{ fontWeight: '500', color: isExpanded ? '#FFFFFF' : '#161c27', marginBottom: 2 }}
              >
                {sub.name}
              </Text>
              <Text 
                className="font-app text-[12px]" 
                style={{ fontWeight: '600', color: isExpanded ? '#FFDAD6' : '#57423c' }}
              >
                {sub.planName}
              </Text>
            </View>
          </View>

          <View className="items-end">
            <Text 
              className="font-app text-[18px]" 
              style={{ fontWeight: '500', color: isExpanded ? '#FFFFFF' : '#161c27', marginBottom: 2 }}
            >
              ${sub.price}
            </Text>
            <Text 
              className="font-app text-[12px]" 
              style={{ fontWeight: '600', color: isExpanded ? '#FFDAD6' : '#57423c' }}
            >
              {sub.billingCycle}
            </Text>
          </View>
        </View>

        {/* Expanded Content Area */}
        {isExpanded && (
          <Animated.View 
            entering={FadeIn.duration(300).delay(100)} 
            exiting={FadeOut.duration(200)}
            style={{ paddingTop: 16, marginTop: 16 }}
          >
            <View className="flex-row justify-between items-center" style={{ marginBottom: 12 }}>
              <View>
                <Text className="font-app text-[12px]" style={{ fontWeight: '600', color: '#FFB59D', marginBottom: 4 }}>
                  Payment info:
                </Text>
                <Text className="font-app text-[14px]" style={{ fontWeight: '500', color: '#FFFFFF' }}>
                  **** 8530
                </Text>
              </View>
              <TouchableOpacity 
                style={{ paddingHorizontal: 20, paddingVertical: 8, backgroundColor: 'transparent', borderRadius: 9999, borderWidth: 1.5, borderColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}
              >
                <Text className="font-app text-[12px]" style={{ fontWeight: '600', color: '#FFFFFF' }}>Manage</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between items-center" style={{ marginBottom: 20 }}>
              <View>
                <Text className="font-app text-[12px]" style={{ fontWeight: '600', color: '#FFB59D', marginBottom: 4 }}>
                  Plan details:
                </Text>
                <Text className="font-app text-[14px]" style={{ fontWeight: '500', color: '#FFFFFF' }}>
                  {sub.planName}
                </Text>
              </View>
              <TouchableOpacity 
                style={{ paddingHorizontal: 20, paddingVertical: 8, backgroundColor: 'transparent', borderRadius: 9999, borderWidth: 1.5, borderColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}
              >
                <Text className="font-app text-[12px]" style={{ fontWeight: '600', color: '#FFFFFF' }}>Change</Text>
              </TouchableOpacity>
            </View>

            <Button 
              title="Cancel Subscription"
              onPress={() => {}}
              variant="primary"
              style={{ borderWidth: 1.5, borderColor: '#FFFFFF' }}
            />
          </Animated.View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export function SubscriptionsScreen() {
  const navigation = useNavigation();
  const [expandedId, setExpandedId] = useState<string | null>('3'); // Default to Copilot expanded

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FDFCF0]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-screenX py-md">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{ width: 40, height: 40, borderRadius: 9999, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#E6DBCD', alignItems: 'center', justifyContent: 'center' }}
        >
          <ChevronLeft size={24} color="#161C27" />
        </TouchableOpacity>
        
        <Text className="font-app font-bold text-[20px] text-text-primary">
          My Subscriptions
        </Text>
        
        <TouchableOpacity 
          style={{ width: 40, height: 40, borderRadius: 9999, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#E6DBCD', alignItems: 'center', justifyContent: 'center' }}
        >
          <MoreHorizontal size={24} color="#161C27" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        className="flex-1 px-screenX pt-md" 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {SUBSCRIPTIONS.map((sub) => (
          <SubscriptionCard 
            key={sub.id} 
            sub={sub} 
            isExpanded={expandedId === sub.id} 
            onToggle={() => toggleExpand(sub.id)} 
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
