import React, { useState } from 'react';
import { TextInput, TextInputProps, View, Text, TouchableOpacity } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  isPassword?: boolean;
  prefix?: string;
}

export function Input({ label, error, className, isPassword, prefix, ...props }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View className={`w-full mb-lg ${className || ''}`}>
      {label && (
        <Text className="font-app font-medium text-caption text-text-secondary mb-xs">
          {label}
        </Text>
      )}
      <View className="relative justify-center">
        {prefix && (
          <Text className="absolute left-lg font-app text-[16px] text-text-primary z-10 top-[17px]">
            {prefix}
          </Text>
        )}
        <TextInput
          className={`h-[56px] ${prefix ? 'pl-[48px]' : 'pl-lg'} pr-[48px] border font-app text-[16px] text-text-primary bg-background-surface ${
            error ? 'border-[#C71F1F]' : 'border-[#E0E9EF]'
          } rounded-[12px] focus:border-brand-primary`}
          placeholderTextColor="#8A8D97"
          secureTextEntry={isPassword ? !isPasswordVisible : props.secureTextEntry}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity 
            className="absolute right-4"
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            activeOpacity={0.7}
          >
            {isPasswordVisible ? (
              <Eye size={20} color="#8A8D97" />
            ) : (
              <EyeOff size={20} color="#8A8D97" />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text className="font-app text-caption text-[#C71F1F] mt-xs">
          {error}
        </Text>
      )}
    </View>
  );
}
