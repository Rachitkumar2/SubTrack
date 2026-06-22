import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, User, LogOut } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from '../../services/firebase/auth';
import { useSubscriptions } from '../../hooks/useSubscriptions';
import { useTrackingStats } from '../../hooks/useTrackingStats';

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<any>();
  const { data: subscriptions, isLoading } = useSubscriptions();
  const { monthlySpend, upcomingRenewals } = useTrackingStats(subscriptions);

  return (
    <SafeAreaView className="flex-1 bg-background-app">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 130, paddingHorizontal: 24 }}
      >
        {/* ── Header ── */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 24, paddingBottom: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#3D2E1E', borderWidth: 2, borderColor: 'rgba(235,123,86,0.2)', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <User color="#C9A87E" size={24} />
            </View>
            <Text style={{ fontFamily: 'Inter', fontWeight: '700', fontSize: 20, color: '#0C111D', letterSpacing: -0.3 }}>
              My Dashboard
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity
              onPress={async () => {
                try {
                  await signOut();
                } catch (e) {
                  console.error(e);
                }
              }}
              style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFF1F2', borderWidth: 1, borderColor: '#FECDD3', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}
            >
              <LogOut color="#E11D48" size={20} strokeWidth={2} />
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => navigation.navigate('AddSubscription')}
              style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}
            >
              <Plus color="#0C111D" size={24} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Balance Card ── */}
        <View style={{ marginBottom: 32 }}>
          <View style={{ backgroundColor: '#A1401E', borderRadius: 24, padding: 32, overflow: 'hidden', shadowColor: 'rgba(235,123,86,0.2)', shadowOffset: { width: 0, height: 16 }, shadowOpacity: 1, shadowRadius: 24, elevation: 8 }}>
            <View style={{ position: 'absolute', right: -20, top: -40, width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <Text style={{ fontFamily: 'Inter', fontWeight: '500', fontSize: 18, color: 'rgba(255,255,255,0.8)' }}>
              Monthly Spend
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 8 }}>
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={{ fontFamily: 'Inter', fontWeight: '700', fontSize: 48, color: '#FFFFFF', letterSpacing: -1, lineHeight: 52 }}>
                  ₹{monthlySpend.toFixed(2)}
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* ── Upcoming Section ── */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <Text style={{ fontFamily: 'Inter', fontWeight: '700', fontSize: 20, color: '#0C111D' }}>Upcoming</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 32 }} contentContainerStyle={{ gap: 16, paddingRight: 24 }}>
          {upcomingRenewals.length === 0 ? (
            <View style={{ minWidth: 200, backgroundColor: '#FFFFFF', padding: 20, borderRadius: 24, borderWidth: 1, borderColor: '#F3F4F6' }}>
              <Text style={{ fontFamily: 'Inter', fontWeight: '500', color: '#9CA3AF' }}>No upcoming renewals</Text>
            </View>
          ) : (
            upcomingRenewals.map((card) => (
              <View key={card.id} style={{ minWidth: 200, backgroundColor: '#FFFFFF', padding: 20, borderRadius: 24, borderWidth: 1, borderColor: '#F3F4F6', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1, gap: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <View style={{ width: 48, height: 48, backgroundColor: '#F3F4F6', borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'Inter', fontWeight: '700', fontSize: 24, color: '#111827' }}>
                      {card.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ fontFamily: 'Inter', fontWeight: '700', fontSize: 18, color: '#0C111D' }}>
                      ₹{card.price.toFixed(2)}
                    </Text>
                    <Text style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: 10, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 1 }}>
                      {card.daysLeft === 0 ? 'Today' : `${card.daysLeft} days left`}
                    </Text>
                  </View>
                </View>
                <Text style={{ fontFamily: 'Inter', fontWeight: '700', fontSize: 18, color: '#1F2937' }}>
                  {card.name}
                </Text>
              </View>
            ))
          )}
        </ScrollView>

        {/* ── All Subscriptions Section ── */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <Text style={{ fontFamily: 'Inter', fontWeight: '700', fontSize: 20, color: '#0C111D' }}>All Subscriptions</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Subscriptions')} style={{ paddingHorizontal: 16, paddingVertical: 6, backgroundColor: '#FFFFFF', borderRadius: 9999, borderWidth: 1, borderColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
            <Text style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: 14, color: '#0C111D' }}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 16 }}>
          {isLoading ? (
             <ActivityIndicator color="#A1401E" size="large" />
          ) : subscriptions?.length === 0 ? (
            <Text style={{ fontFamily: 'Inter', color: '#9CA3AF', textAlign: 'center', marginTop: 20 }}>No subscriptions added yet.</Text>
          ) : (
            subscriptions?.map((card) => (
              <View key={card.id} style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F3F4F6', borderRadius: 32, padding: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                  <View style={{ width: 56, height: 56, backgroundColor: '#F5F0E6', borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'Inter', fontWeight: '700', fontSize: 24, color: '#A1401E' }}>
                      {card.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ fontFamily: 'Inter', fontWeight: '700', fontSize: 20, color: '#111827', marginBottom: 2 }}>
                      {card.name}
                    </Text>
                    <Text style={{ fontFamily: 'Inter', fontWeight: '500', fontSize: 14, color: 'rgba(55,65,81,0.6)' }}>
                      {card.category}
                    </Text>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ fontFamily: 'Inter', fontWeight: '700', fontSize: 20, color: '#111827', marginBottom: 2 }}>
                    ₹{card.price.toFixed(2)}
                  </Text>
                  <Text style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: 12, color: 'rgba(55,65,81,0.6)', textTransform: 'uppercase', letterSpacing: -0.2 }}>
                    {card.billingCycle}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
