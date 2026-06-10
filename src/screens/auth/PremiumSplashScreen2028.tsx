import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight } from 'lucide-react-native';
import { Button } from '../../components/common/Button';
import {
  HeroContainer,
  BrandCard,
  MintChip,
  PeachChip,
  MeterPill,
} from '../../components/cards/HeroBlocks';

export function PremiumSplashScreen2028() {
  return (
    <View className="flex-1">
      {/* Top half gradient */}
      <LinearGradient
        colors={['#FDFCF0', '#F5F0E6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ height: '55%', width: '100%' }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, paddingTop: 40 }}>
            <HeroContainer>
              <BrandCard />
              {/* For 2028, chips are rotated and flipped as per tokens */}
              <MintChip rotated={true} />
              <PeachChip rotated={true} />
              <MeterPill />
            </HeroContainer>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Bottom half solid warm background */}
      <View className="flex-1 bg-[#FDFCF0] px-screenX items-center justify-center pb-4xl">
        <View className="mb-3xl items-center">
          <Text className="font-app font-bold text-heroTitle text-text-primary mb-md">
            SubTrack AI
          </Text>
          <Text className="font-app text-heroSubtitle text-text-secondary text-center">
            Take control of every{'\n'}subscription with AI.
          </Text>
        </View>

        <View className="w-full mb-xl">
          <Button
            title="Get Started"
            variant="navy"
            onPress={() => {}}
            icon={<ArrowRight color="#FFFFFF" size={16} strokeWidth={2.5} />}
          />
        </View>

        <View className="flex-row items-center justify-center">
          <Text className="font-app text-caption text-text-secondary">
            Already have an account?{' '}
          </Text>
          <Text className="font-app font-bold text-caption text-brand-primary">
            Sign In
          </Text>
        </View>
      </View>
    </View>
  );
}
