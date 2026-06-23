import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';

export function PrivacyScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-background-app">
      {/* Header */}
      <View className="flex-row items-center px-screenX py-md">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{ width: 40, height: 40, borderRadius: 9999, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#E6DBCD', alignItems: 'center', justifyContent: 'center' }}
        >
          <ChevronLeft size={24} color="#161C27" />
        </TouchableOpacity>
        <Text className="font-app font-bold text-[20px] text-text-primary ml-4">
          Privacy Policy
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 100 }}>
        <Text className="font-app text-[14px] text-text-muted mb-6">
          Last updated: October 2026
        </Text>

        <Text className="font-app font-bold text-[18px] text-text-primary mb-2">
          1. Your Data is Yours
        </Text>
        <Text className="font-app text-[15px] text-text-secondary leading-6 mb-6">
          SubTrack AI believes in complete data ownership. We only collect the minimal amount of information required to track your subscriptions. Your financial data and subscription records are encrypted and tied exclusively to your account.
        </Text>

        <Text className="font-app font-bold text-[18px] text-text-primary mb-2">
          2. Firebase and Cloud Services
        </Text>
        <Text className="font-app text-[15px] text-text-secondary leading-6 mb-6">
          We use Google Firebase for authentication and database storage. Security rules enforce strict user isolation, meaning no other user—or unauthorized third party—can access your subscription or receipt data.
        </Text>

        <Text className="font-app font-bold text-[18px] text-text-primary mb-2">
          3. AI Insights
        </Text>
        <Text className="font-app text-[15px] text-text-secondary leading-6 mb-6">
          When you use our AI Insight features to analyze your spending or extract text from receipts, your anonymized text is processed to generate recommendations. We do not use your personal subscription records to train public AI models.
        </Text>

        <Text className="font-app font-bold text-[18px] text-text-primary mb-2">
          4. Export and Deletion
        </Text>
        <Text className="font-app text-[15px] text-text-secondary leading-6 mb-6">
          You have the right to export your data at any time via the Settings screen. You may also request a full deletion of your account and associated records, which will permanently remove your data from our servers.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
