import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronLeft, MoreHorizontal, TrendingUp } from 'lucide-react-native';

import { BarChart } from 'react-native-gifted-charts';

const barData = [
  { value: 35, label: 'Mon', frontColor: '#161C27' },
  { value: 25, label: 'Tue', frontColor: '#161C27' },
  { value: 18, label: 'Wed', frontColor: '#161C27' },
  { 
    value: 40, 
    label: 'Thr', 
    frontColor: '#A1401E',
    topLabelComponent: () => (
      <View style={{ position: 'absolute', bottom: 4, left: -11, width: 36, alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            paddingHorizontal: 6,
            paddingVertical: 4,
            width: 36,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#E7D8CF',
            shadowColor: 'rgba(239, 122, 83, 0.3)',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 8,
            elevation: 4,
            zIndex: 10,
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#A1401E', textAlign: 'center' }}>
            $20
          </Text>
        </View>
        <View 
          style={{ 
            width: 8, 
            height: 8, 
            backgroundColor: '#FFFFFF', 
            transform: [{ rotate: '45deg' }], 
            marginTop: -5,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#E7D8CF',
            zIndex: 9,
          }} 
        />
      </View>
    ),
    labelTextStyle: { color: '#161C27', fontWeight: '700' as const } 
  },
  { value: 28, label: 'Fri', frontColor: '#161C27' },
  { value: 22, label: 'Sat', frontColor: '#161C27' },
  { value: 24, label: 'Sun', frontColor: '#161C27' },
];

const HISTORY_CARDS = [
  {
    id: '1',
    name: 'Claude',
    date: 'June 25, 12:00',
    price: '$9.84',
    bgColor: '#F6D254',
    iconBg: 'rgba(255,255,255,0.4)',
    letter: 'C',
    letterColor: '#161C27',
  },
  {
    id: '2',
    name: 'Canva',
    date: 'June 30, 16:00',
    price: '$43.89',
    bgColor: '#A0D4BF',
    iconBg: 'rgba(255,255,255,0.4)',
    letter: 'C',
    letterColor: '#161C27',
  },
  {
    id: '3',
    name: 'Grammarly',
    date: 'June 24, 09:00',
    price: '$15.00',
    bgColor: '#F3F4F6',
    iconBg: '#E5E7EB',
    letter: 'G',
    letterColor: '#6B7280',
  },
];

import { useNavigation } from '@react-navigation/native';

export function MonthlyInsightsScreen(): React.JSX.Element {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#FDFCF0' }}>
      {/* ── Header ── */}
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

        {/* ── Upcoming Section ── */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontFamily: 'Inter',
              fontWeight: '700',
              fontSize: 20,
              color: '#161C27',
            }}
          >
            Upcoming
          </Text>
          <TouchableOpacity
            style={{
              paddingHorizontal: 16,
              paddingVertical: 6,
              backgroundColor: '#FFFFFF',
              borderRadius: 9999,
              borderWidth: 1,
              borderColor: '#E7D8CF',
            }}
          >
            <Text
              style={{
                fontFamily: 'Inter',
                fontWeight: '600',
                fontSize: 14,
                color: '#57423C',
              }}
            >
              View all
            </Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Chart Card */}
        <View
          style={{
            backgroundColor: '#FDFCF0',
            borderRadius: 32,
            padding: 24,
            paddingTop: 48,
            marginBottom: 24,
            borderWidth: 1,
            borderColor: '#E6DBCD',
            alignItems: 'center',
          }}
        >
          <BarChart
            data={barData}
            barWidth={14}
            spacing={22}
            roundedTop
            roundedBottom
            hideRules
            xAxisThickness={0}
            yAxisThickness={0}
            yAxisTextStyle={{ color: '#8A8D97', fontSize: 10, fontWeight: '500' }}
            noOfSections={3}
            maxValue={45}
            stepValue={15}
            initialSpacing={12}
            endSpacing={12}
            yAxisLabelWidth={30}
            yAxisExtraHeight={40}
            xAxisLabelTextStyle={{ color: '#8A8D97', fontSize: 12, fontWeight: '600' }}
            dashGap={0}
            disablePress
          />
        </View>

        {/* ── Expenses Section ── */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 32,
            padding: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 32,
            borderWidth: 1,
            borderColor: '#E6DBCD',
            shadowColor: 'rgba(0, 0, 0, 0.04)',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 1,
            shadowRadius: 16,
            elevation: 2,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: 'Inter',
                fontWeight: '700',
                fontSize: 20,
                color: '#161C27',
                marginBottom: 4,
              }}
            >
              Expenses
            </Text>
            <Text
              style={{
                fontFamily: 'Inter',
                fontWeight: '500',
                fontSize: 14,
                color: '#6B5A52',
              }}
            >
              March 2026
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text
              style={{
                fontFamily: 'Inter',
                fontWeight: '700',
                fontSize: 24,
                color: '#161C27',
                letterSpacing: -0.5,
                marginBottom: 4,
              }}
            >
              -$424.63
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <TrendingUp color="#A1401E" size={14} strokeWidth={2.5} />
              <Text
                style={{
                  fontFamily: 'Inter',
                  fontWeight: '600',
                  fontSize: 14,
                  color: '#A1401E',
                }}
              >
                +12%
              </Text>
            </View>
          </View>
        </View>

        {/* ── History Section ── */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontFamily: 'Inter',
              fontWeight: '700',
              fontSize: 20,
              color: '#161C27',
            }}
          >
            History
          </Text>
          <TouchableOpacity
            style={{
              paddingHorizontal: 16,
              paddingVertical: 6,
              backgroundColor: '#FFFFFF',
              borderRadius: 9999,
              borderWidth: 1,
              borderColor: '#E7D8CF',
            }}
          >
            <Text
              style={{
                fontFamily: 'Inter',
                fontWeight: '600',
                fontSize: 14,
                color: '#57423C',
              }}
            >
              View all
            </Text>
          </TouchableOpacity>
        </View>

        {/* History Cards */}
        <View style={{ gap: 12 }}>
          {HISTORY_CARDS.map((card) => (
            <View
              key={card.id}
              style={{
                backgroundColor: card.bgColor,
                borderRadius: 24,
                padding: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                <View
                  style={{
                    width: 52,
                    height: 52,
                    backgroundColor: card.iconBg,
                    borderRadius: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Inter',
                      fontWeight: '700',
                      fontSize: 20,
                      color: card.letterColor,
                    }}
                  >
                    {card.letter}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Inter',
                      fontWeight: '700',
                      fontSize: 18,
                      color: '#161C27',
                      marginBottom: 2,
                    }}
                  >
                    {card.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Inter',
                      fontWeight: '500',
                      fontSize: 13,
                      color: 'rgba(22, 28, 39, 0.6)',
                    }}
                  >
                    {card.date}
                  </Text>
                </View>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: '700',
                    fontSize: 18,
                    color: '#161C27',
                    marginBottom: 2,
                  }}
                >
                  {card.price}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: '600',
                    fontSize: 11,
                    color: 'rgba(22, 28, 39, 0.6)',
                    textTransform: 'lowercase',
                  }}
                >
                  per month
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
