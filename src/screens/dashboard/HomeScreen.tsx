import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, User } from 'lucide-react-native';
import { OpenAIIcon } from '../../components/icons/OpenAIIcon';
import { AdobeIcon } from '../../components/icons/AdobeIcon';
import { MediumIcon } from '../../components/icons/MediumIcon';

// Subscription card data — colors match StitchMCP HTML reference
const SUBSCRIPTION_CARDS = [
  {
    id: '1',
    name: 'Open AI',
    date: 'June 05, 18:00',
    price: '$42.25',
    bgColor: '#9DB9E3',
    icon: (size: number) => <OpenAIIcon size={size} color="#FFFFFF" />,
  },
  {
    id: '2',
    name: 'Adobe',
    date: 'June 25, 12:00',
    price: '$7.72',
    bgColor: '#F6D254',
    icon: (size: number) => <AdobeIcon size={size} color="#E1251B" />,
  },
  {
    id: '3',
    name: 'Medium',
    date: 'June 30, 11:00',
    price: '$13.08',
    bgColor: '#A0D4BF',
    icon: (size: number) => <MediumIcon size={size} color="#1F2937" />,
  },
];

const UPCOMING_CARDS = [
  {
    id: '1',
    letter: 'N',
    name: 'Notion Team',
    price: '$20.00',
    daysLeft: '12 days left',
    letterColor: '#111827',
    iconBg: '#F3F4F6',
  },
  {
    id: '2',
    letter: 'D',
    name: 'Dropbox',
    price: '$10.00',
    daysLeft: '32 days left',
    letterColor: '#2563EB',
    iconBg: '#EFF6FF',
  },
];

export function HomeScreen(): React.JSX.Element {
  return (
    <SafeAreaView className="flex-1 bg-background-app">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 130, paddingHorizontal: 24 }}
      >
        {/* ── Header ── */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 24,
            paddingBottom: 16,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: '#3D2E1E',
                borderWidth: 2,
                borderColor: 'rgba(235,123,86,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <User color="#C9A87E" size={24} />
            </View>
            <Text
              style={{
                fontFamily: 'Inter',
                fontWeight: '700',
                fontSize: 20,
                color: '#0C111D',
                letterSpacing: -0.3,
              }}
            >
              Rachit Kumar
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#F3F4F6',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 1,
            }}
          >
            <Plus color="#0C111D" size={24} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* ── Balance Card ── */}
        <View style={{ marginBottom: 32 }}>
          <View
            style={{
              backgroundColor: '#A1401E',
              borderRadius: 24,
              padding: 32,
              overflow: 'hidden',
              shadowColor: 'rgba(235,123,86,0.2)',
              shadowOffset: { width: 0, height: 16 },
              shadowOpacity: 1,
              shadowRadius: 24,
              elevation: 8,
            }}
          >
            {/* Decorative circle — top right, subtle */}
            <View
              style={{
                position: 'absolute',
                right: -20,
                top: -40,
                width: 200,
                height: 200,
                borderRadius: 100,
                backgroundColor: 'rgba(255,255,255,0.1)',
              }}
            />
            <Text
              style={{
                fontFamily: 'Inter',
                fontWeight: '500',
                fontSize: 18,
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              Balance
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginTop: 8,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Inter',
                  fontWeight: '700',
                  fontSize: 48,
                  color: '#FFFFFF',
                  letterSpacing: -1,
                  lineHeight: 52,
                }}
              >
                $198.53
              </Text>
              <Text
                style={{
                  fontFamily: 'Inter',
                  fontWeight: '500',
                  fontSize: 20,
                  color: 'rgba(255,255,255,0.9)',
                  marginBottom: 4,
                }}
              >
                04/21
              </Text>
            </View>
          </View>
        </View>

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
              color: '#0C111D',
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
              borderColor: '#E5E7EB',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 1,
            }}
          >
            <Text
              style={{
                fontFamily: 'Inter',
                fontWeight: '600',
                fontSize: 14,
                color: '#0C111D',
              }}
            >
              View all
            </Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 32 }}
          contentContainerStyle={{ gap: 16, paddingRight: 24 }}
        >
          {UPCOMING_CARDS.map((card) => (
            <View
              key={card.id}
              style={{
                minWidth: 200,
                backgroundColor: '#FFFFFF',
                padding: 20,
                borderRadius: 24,
                borderWidth: 1,
                borderColor: '#F3F4F6',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 1,
                gap: 16,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                {/* Letter icon — rounded-xl (12px corners), not circular */}
                <View
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: card.iconBg,
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Inter',
                      fontWeight: '700',
                      fontSize: 24,
                      color: card.letterColor,
                    }}
                  >
                    {card.letter}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text
                    style={{
                      fontFamily: 'Inter',
                      fontWeight: '700',
                      fontSize: 18,
                      color: '#0C111D',
                    }}
                  >
                    {card.price}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Inter',
                      fontWeight: '600',
                      fontSize: 10,
                      color: '#9CA3AF',
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                    }}
                  >
                    {card.daysLeft}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontFamily: 'Inter',
                  fontWeight: '700',
                  fontSize: 18,
                  color: '#1F2937',
                }}
              >
                {card.name}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* ── All Subscriptions Section ── */}
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
              color: '#0C111D',
            }}
          >
            All Subscriptions
          </Text>
          <TouchableOpacity
            style={{
              paddingHorizontal: 16,
              paddingVertical: 6,
              backgroundColor: '#FFFFFF',
              borderRadius: 9999,
              borderWidth: 1,
              borderColor: '#E5E7EB',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 1,
            }}
          >
            <Text
              style={{
                fontFamily: 'Inter',
                fontWeight: '600',
                fontSize: 14,
                color: '#0C111D',
              }}
            >
              View all
            </Text>
          </TouchableOpacity>
        </View>

        {/* Subscription Cards */}
        <View style={{ gap: 16 }}>
          {SUBSCRIPTION_CARDS.map((card) => (
            <View
              key={card.id}
              style={{
                backgroundColor: card.bgColor,
                borderRadius: 32,
                padding: 24,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                {/* Icon circle — rounded-2xl (16px), frosted glass bg */}
                <View
                  style={{
                    width: 56,
                    height: 56,
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    borderRadius: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {card.icon(28)}
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Inter',
                      fontWeight: '700',
                      fontSize: 20,
                      color: '#111827',
                      marginBottom: 2,
                    }}
                  >
                    {card.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Inter',
                      fontWeight: '500',
                      fontSize: 14,
                      color: 'rgba(55,65,81,0.6)',
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
                    fontSize: 20,
                    color: '#111827',
                    marginBottom: 2,
                  }}
                >
                  {card.price}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: '600',
                    fontSize: 12,
                    color: 'rgba(55,65,81,0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: -0.2,
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
