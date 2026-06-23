import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAddSubscription } from '../../hooks/useSubscriptions';
import { BillingCycle } from '../../types/subscription.types';

type SubscriptionFormRouteProp = RouteProp<{
  SubscriptionForm: {
    defaultName?: string;
    defaultCategory?: string;
    defaultPrice?: string;
  };
}, 'SubscriptionForm'>;

export function SubscriptionFormScreen() {
  const navigation = useNavigation();
  const route = useRoute<SubscriptionFormRouteProp>();
  const addSubscriptionMutation = useAddSubscription();

  const [name, setName] = useState(route.params?.defaultName || '');
  const [price, setPrice] = useState(route.params?.defaultPrice || '');
  const [category, setCategory] = useState(route.params?.defaultCategory || 'Entertainment');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('Monthly');
  const [renewalDate, setRenewalDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setRenewalDate(selectedDate);
    }
  };

  const handleSave = () => {
    if (!name || !price) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum)) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    addSubscriptionMutation.mutate(
      {
        name,
        price: priceNum,
        category,
        billingCycle,
        currency: 'INR',
        status: 'active',
        renewalDate: renewalDate.toISOString(),
      },
      {
        onSuccess: () => {
          navigation.goBack();
        },
        onError: (error: any) => {
          Alert.alert('Error', error.message || 'Failed to add subscription');
        },
      }
    );
  };

  const renderCycleOption = (cycle: BillingCycle) => (
    <TouchableOpacity
      key={cycle}
      onPress={() => setBillingCycle(cycle)}
      style={{
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: billingCycle === cycle ? '#A1401E' : '#E6DBCD',
        backgroundColor: billingCycle === cycle ? '#FFF4F1' : '#FFFFFF',
        borderRadius: 12,
        marginHorizontal: 4,
      }}
    >
      <Text style={{ 
        fontFamily: 'Inter', 
        fontWeight: billingCycle === cycle ? '600' : '500',
        color: billingCycle === cycle ? '#A1401E' : '#57423C'
      }}>
        {cycle}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#FDFCF0]">
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Header */}
        <View className="flex-row items-center px-screenX py-md">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={{ width: 40, height: 40, borderRadius: 9999, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#E6DBCD', alignItems: 'center', justifyContent: 'center' }}
          >
            <ChevronLeft size={24} color="#161C27" />
          </TouchableOpacity>
          <Text className="font-app font-bold text-[20px] text-text-primary ml-4">
            Add Subscription
          </Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 100 }}>
          <View className="bg-[#FFFFFF] rounded-[32px] p-xl shadow-softCard border border-[#E6DBCD]">
            <View style={{ marginBottom: 20 }}>
              <Input
                label="Subscription Name"
                placeholder="e.g. Netflix, Spotify"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Input
                label="Price"
                placeholder="0.00"
                keyboardType="decimal-pad"
                prefix="₹"
                value={price}
                onChangeText={setPrice}
              />
            </View>

            <View style={{ marginBottom: 24 }}>
              <Text className="font-app text-[14px] font-semibold text-text-secondary mb-2 ml-1">
                Category
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -4 }}>
                <View style={{ flexDirection: 'row', paddingHorizontal: 4 }}>
                  {['Entertainment', 'Software', 'Health', 'Utilities', 'Other'].map((cat) => (
                    <TouchableOpacity
                      key={cat}
                      onPress={() => setCategory(cat)}
                      style={{
                        paddingVertical: 10,
                        paddingHorizontal: 16,
                        borderWidth: 1,
                        borderColor: category === cat ? '#A1401E' : '#E6DBCD',
                        backgroundColor: category === cat ? '#FFF4F1' : '#FFFFFF',
                        borderRadius: 20,
                        marginRight: 8,
                      }}
                    >
                      <Text style={{ 
                        fontFamily: 'Inter', 
                        fontWeight: category === cat ? '600' : '500',
                        color: category === cat ? '#A1401E' : '#57423C'
                      }}>
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View style={{ marginBottom: 24 }}>
              <Text className="font-app text-[14px] font-semibold text-text-secondary mb-2 ml-1">
                Billing Cycle
              </Text>
              <View className="flex-row justify-between" style={{ marginHorizontal: -4 }}>
                {renderCycleOption('Weekly')}
                {renderCycleOption('Monthly')}
                {renderCycleOption('Annual')}
              </View>
            </View>

            <View style={{ marginBottom: 24 }}>
              <Text className="font-app text-[14px] font-semibold text-text-secondary mb-2 ml-1">
                Next Billing Date
              </Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={{
                  paddingVertical: 14,
                  paddingHorizontal: 16,
                  borderWidth: 1,
                  borderColor: '#E6DBCD',
                  borderRadius: 12,
                  backgroundColor: '#FFFFFF',
                }}
              >
                <Text style={{ fontFamily: 'Inter', color: '#161C27', fontSize: 16 }}>
                  {renewalDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              
              {showDatePicker && (
                <DateTimePicker
                  value={renewalDate}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                  minimumDate={new Date()}
                />
              )}
            </View>

            <View style={{ marginTop: 8 }}>
              <Button
                title="Save Subscription"
                onPress={handleSave}
                variant="primary"
                loading={addSubscriptionMutation.isPending}
                disabled={addSubscriptionMutation.isPending}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
