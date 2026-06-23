import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MoreHorizontal, TrendingUp } from 'lucide-react-native';
import { PieChart } from 'react-native-gifted-charts';
import { useNavigation } from '@react-navigation/native';
import { useSubscriptions } from '../../hooks/useSubscriptions';
import { useTrackingStats } from '../../hooks/useTrackingStats';

export function MonthlyInsightsScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const { data: subscriptions, isLoading } = useSubscriptions();
  const { monthlySpend, categoryBreakdown } = useTrackingStats(subscriptions);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#FDFCF0' }}>
      <View className="flex-row items-center justify-between px-screenX py-md">
        <TouchableOpacity 
          onPress={() => (navigation as any)?.navigate('Subs')}
          style={{ width: 40, height: 40, borderRadius: 9999, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#E6DBCD', alignItems: 'center', justifyContent: 'center' }}
        >
          <ChevronLeft size={24} color="#161C27" />
        </TouchableOpacity>
        
        <Text className="font-app font-bold text-[20px] text-text-primary">
          Monthly Insights
        </Text>
        
        <TouchableOpacity 
          style={{ width: 40, height: 40, borderRadius: 9999, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#E6DBCD', alignItems: 'center', justifyContent: 'center' }}
        >
          <MoreHorizontal size={24} color="#161C27" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 130, paddingHorizontal: 24 }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <Text style={{ fontFamily: 'Inter', fontWeight: '700', fontSize: 20, color: '#161C27' }}>
            Spending by Category
          </Text>
        </View>

        <View style={{ backgroundColor: '#FDFCF0', borderRadius: 32, padding: 24, marginBottom: 24, borderWidth: 1, borderColor: '#E6DBCD', alignItems: 'center' }}>
          {categoryBreakdown.length > 0 ? (
            <>
              <PieChart
                data={categoryBreakdown.map(cat => ({
                  value: cat.amount,
                  color: cat.color,
                  text: cat.percentage > 5 ? `${cat.percentage.toFixed(0)}%` : '',
                  textColor: '#FFFFFF',
                  fontWeight: 'bold',
                }))}
                donut
                radius={80}
                innerRadius={50}
                innerCircleColor="#FDFCF0"
                centerLabelComponent={() => {
                  return (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{fontSize: 22, color: '#161C27', fontWeight: 'bold'}}>
                        ₹{monthlySpend.toFixed(0)}
                      </Text>
                      <Text style={{fontSize: 12, color: '#8A8D97'}}>Total</Text>
                    </View>
                  );
                }}
              />
              <View style={{ width: '100%', marginTop: 24, gap: 12 }}>
                {categoryBreakdown.map((cat, index) => (
                  <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: cat.color }} />
                      <Text style={{ fontFamily: 'Inter', fontWeight: '500', fontSize: 14, color: '#161C27' }}>
                        {cat.category}
                      </Text>
                    </View>
                    <Text style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: 14, color: '#161C27' }}>
                      ₹{cat.amount.toFixed(2)}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          ) : (
            <Text style={{ fontFamily: 'Inter', color: '#9CA3AF', textAlign: 'center', paddingVertical: 40 }}>
              Not enough data for insights.
            </Text>
          )}
        </View>

        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 32, padding: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, borderWidth: 1, borderColor: '#E6DBCD', shadowColor: 'rgba(0, 0, 0, 0.04)', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 1, shadowRadius: 16, elevation: 2 }}>
          <View>
            <Text style={{ fontFamily: 'Inter', fontWeight: '700', fontSize: 20, color: '#161C27', marginBottom: 4 }}>
              Expenses
            </Text>
            <Text style={{ fontFamily: 'Inter', fontWeight: '500', fontSize: 14, color: '#6B5A52' }}>
              This Month
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            {isLoading ? (
               <ActivityIndicator color="#A1401E" size="small" />
            ) : (
              <Text style={{ fontFamily: 'Inter', fontWeight: '700', fontSize: 24, color: '#161C27', letterSpacing: -0.5, marginBottom: 4 }}>
                ₹{monthlySpend.toFixed(2)}
              </Text>
            )}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <TrendingUp color="#A1401E" size={14} strokeWidth={2.5} />
              <Text style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: 14, color: '#A1401E' }}>
                Active
              </Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <Text style={{ fontFamily: 'Inter', fontWeight: '700', fontSize: 20, color: '#161C27' }}>
            All Subscriptions
          </Text>
        </View>

        <View style={{ gap: 12 }}>
          {isLoading ? (
            <ActivityIndicator color="#A1401E" size="large" style={{ marginTop: 20 }} />
          ) : subscriptions?.length === 0 ? (
            <Text style={{ fontFamily: 'Inter', color: '#9CA3AF', textAlign: 'center', marginTop: 20 }}>No subscriptions added yet.</Text>
          ) : (
            subscriptions?.map((card) => (
              <View key={card.id} style={{ backgroundColor: '#F3F4F6', borderRadius: 24, padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                  <View style={{ width: 52, height: 52, backgroundColor: '#E5E7EB', borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'Inter', fontWeight: '700', fontSize: 20, color: '#6B7280' }}>
                      {card.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ fontFamily: 'Inter', fontWeight: '700', fontSize: 18, color: '#161C27', marginBottom: 2 }}>
                      {card.name}
                    </Text>
                    <Text style={{ fontFamily: 'Inter', fontWeight: '500', fontSize: 13, color: 'rgba(22, 28, 39, 0.6)' }}>
                      {new Date(card.renewalDate).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ fontFamily: 'Inter', fontWeight: '700', fontSize: 18, color: '#161C27', marginBottom: 2 }}>
                    ₹{card.price.toFixed(2)}
                  </Text>
                  <Text style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: 11, color: 'rgba(22, 28, 39, 0.6)', textTransform: 'lowercase' }}>
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
