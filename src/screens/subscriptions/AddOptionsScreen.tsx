import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronDown, Plus, Building2, Receipt } from 'lucide-react-native';

const POPULAR_SERVICES = [
  { id: 'netflix', name: 'Netflix', category: 'Entertainment', color: '#E50914', icon: 'N' },
  { id: 'spotify', name: 'Spotify', category: 'Entertainment', color: '#1DB954', icon: 'S' },
  { id: 'prime', name: 'Prime Video', category: 'Entertainment', color: '#00A8E1', icon: 'P' },
  { id: 'apple_one', name: 'Apple One', category: 'Software', color: '#000000', icon: '' },
  { id: 'chatgpt', name: 'ChatGPT Plus', category: 'Software', color: '#10A37F', icon: 'C' },
  { id: 'gym', name: 'Gym Membership', category: 'Health', color: '#1E3A8A', icon: 'G' },
];

export function AddOptionsScreen() {
  const navigation = useNavigation<any>();

  const handleQuickAdd = (service: any) => {
    navigation.navigate('SubscriptionForm', {
      defaultName: service.name,
      defaultCategory: service.category,
    });
  };

  const handleManualAdd = () => {
    navigation.navigate('SubscriptionForm');
  };

  return (
    <SafeAreaView className="flex-1 bg-background-app">
      {/* Header */}
      <View className="flex-row items-center justify-between px-screenX py-md">
        <View style={{ width: 40 }} />
        <Text className="font-app font-bold text-[20px] text-text-primary">Add Subscription</Text>
        <TouchableOpacity 
          onPress={() => navigation.getParent()?.goBack()}
          style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#E6DBCD', alignItems: 'center', justifyContent: 'center' }}
        >
          <ChevronDown size={24} color="#161C27" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}>
        {/* Quick Add Section */}
        <Text className="font-app text-[18px] font-bold text-text-primary mb-4 mt-2">
          Quick Add
        </Text>
        <View className="flex-row flex-wrap justify-between" style={{ gap: 12 }}>
          {POPULAR_SERVICES.map((service) => (
            <TouchableOpacity
              key={service.id}
              onPress={() => handleQuickAdd(service)}
              style={{
                width: '31%',
                aspectRatio: 1,
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                padding: 16,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#E6DBCD',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <View 
                style={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: 16, 
                  backgroundColor: service.color, 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: 8
                }}
              >
                <Text style={{ fontFamily: 'Inter', fontWeight: '800', fontSize: 24, color: '#FFFFFF' }}>
                  {service.icon}
                </Text>
              </View>
              <Text style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: 12, color: '#161C27', textAlign: 'center' }} numberOfLines={1}>
                {service.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Action Buttons */}
        <Text className="font-app text-[18px] font-bold text-text-primary mb-4 mt-8">
          Other Options
        </Text>

        <TouchableOpacity
          onPress={handleManualAdd}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            padding: 20,
            borderRadius: 24,
            borderWidth: 1,
            borderColor: '#E6DBCD',
            marginBottom: 16,
          }}
        >
          <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFF4F1', alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
            <Plus color="#A1401E" size={24} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: 'Inter', fontWeight: '700', fontSize: 16, color: '#161C27', marginBottom: 2 }}>
              Add Manually
            </Text>
            <Text style={{ fontFamily: 'Inter', fontSize: 14, color: '#6B7280' }}>
              Create a custom subscription entry
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          disabled
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F9FAFB',
            padding: 20,
            borderRadius: 24,
            borderWidth: 1,
            borderColor: '#E5E7EB',
            marginBottom: 16,
            opacity: 0.7,
          }}
        >
          <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
            <Building2 color="#9CA3AF" size={24} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: 'Inter', fontWeight: '700', fontSize: 16, color: '#4B5563', marginBottom: 2 }}>
              Connect Bank
            </Text>
            <Text style={{ fontFamily: 'Inter', fontSize: 14, color: '#9CA3AF' }}>
              Coming soon
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('ReceiptScanner')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            padding: 20,
            borderRadius: 24,
            borderWidth: 1,
            borderColor: '#E6DBCD',
            marginBottom: 16,
          }}
        >
          <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFF4F1', alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
            <Receipt color="#A1401E" size={24} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: 'Inter', fontWeight: '700', fontSize: 16, color: '#161C27', marginBottom: 2 }}>
              Scan Receipt
            </Text>
            <Text style={{ fontFamily: 'Inter', fontSize: 14, color: '#6B7280' }}>
              Extract details automatically using AI
            </Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
