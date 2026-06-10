import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

interface SocialButtonProps {
  title: string;
  onPress: () => void;
  icon: React.ReactNode;
}

export function SocialButton({ title, onPress, icon }: SocialButtonProps) {
  return (
    <TouchableOpacity
      className="flex-1 h-[56px] rounded-[12px] flex-row items-center justify-center bg-[#FFFFFF] border border-[#E6DBCD] shadow-sm"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="mr-sm">{icon}</View>
      <Text className="font-app font-bold text-[14px] text-text-primary uppercase tracking-wider">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
