import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'navy';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: any;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  icon,
  style,
}: ButtonProps) {
  const getContainerStyle = () => {
    const base = 'h-[56px] flex-row items-center justify-center px-3xl shadow-button';
    if (disabled) return `${base} opacity-50`;
    return base;
  };

  const getDynamicContainerStyle = () => {
    let style: any = { borderRadius: 9999 };
    if (disabled) {
      style.backgroundColor = '#161C27'; // fallback
    } else {
      switch (variant) {
        case 'primary':
          style.backgroundColor = '#A1401E'; // brand-primary
          break;
        case 'navy':
          style.backgroundColor = '#2C313E'; // brand-navy
          break;
        case 'danger':
          style.backgroundColor = '#FFDAD6';
          break;
        case 'secondary':
          style.backgroundColor = 'transparent';
          style.borderWidth = 1;
          style.borderColor = '#A1401E';
          break;
        default:
          style.backgroundColor = '#A1401E';
      }
    }
    return style;
  };

  const getTextStyle = () => {
    const base = 'font-app font-bold text-[16px]';
    return base;
  };

  const getDynamicTextStyle = () => {
    let style: any = {};
    if (disabled) {
      style.color = '#7C8A9D';
    } else {
      switch (variant) {
        case 'primary':
        case 'navy':
          style.color = '#FFFFFF';
          break;
        case 'danger':
          style.color = '#C71F1F';
          break;
        case 'secondary':
          style.color = '#A1401E';
          break;
        default:
          style.color = '#FFFFFF';
      }
    }
    return style;
  };

  return (
    <TouchableOpacity
      className={getContainerStyle()}
      style={[getDynamicContainerStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? '#A1401E' : '#FFFFFF'} />
      ) : (
        <View className="flex-row items-center justify-center">
          {icon && <View className="mr-md">{icon}</View>}
          <Text className={getTextStyle()} style={getDynamicTextStyle()}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
