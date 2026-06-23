import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { ChevronLeft, Camera, Image as ImageIcon } from 'lucide-react-native';
import { uploadReceiptImage } from '../../services/firebase/storage.service';
import { processReceiptMock } from '../../services/ocr/mockOCR.service';

export function ReceiptScannerScreen() {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const processImage = async (uri: string) => {
    setImageUri(uri);
    setIsScanning(true);

    try {
      // Bypass Firebase Storage completely to avoid billing limits!
      // We will just process the local URI directly with our mock OCR.
      
      // Trigger the mock OCR process (No backend/credit card required!)
      const extractedData = await processReceiptMock(uri);
      
      // Navigate to the form, pre-filling the extracted details
      (navigation as any).navigate('SubscriptionForm', {
        defaultName: extractedData.name,
        defaultCategory: extractedData.category,
        defaultPrice: extractedData.price
      });
    } catch (error) {
      Alert.alert('Scan Failed', 'Could not extract information from the receipt. Please try again or add manually.');
      setImageUri(null);
    } finally {
      setIsScanning(false);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      processImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      processImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-app">
      {/* Header */}
      <View className="flex-row items-center px-screenX py-md">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{ width: 40, height: 40, borderRadius: 9999, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#E6DBCD', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
        >
          <ChevronLeft size={24} color="#161C27" />
        </TouchableOpacity>
        <Text className="font-app font-bold text-[20px] text-text-primary ml-4">
          Scan Receipt
        </Text>
      </View>

      <View className="flex-1 items-center justify-center px-6">
        {isScanning ? (
          <View className="items-center">
            {imageUri && (
              <Image 
                source={{ uri: imageUri }} 
                style={{ width: 200, height: 280, borderRadius: 16, opacity: 0.5, marginBottom: 24 }}
              />
            )}
            <ActivityIndicator size="large" color="#A1401E" />
            <Text className="font-app text-text-primary text-[18px] font-semibold mt-4">
              Scanning your receipt...
            </Text>
            <Text className="font-app text-text-muted text-[14px] text-center mt-2">
              Our AI is extracting the service name, cost, and category.
            </Text>
          </View>
        ) : (
          <View className="w-full">
            <View className="items-center mb-10">
              <View className="w-20 h-20 bg-background-surface rounded-full items-center justify-center mb-4 shadow-soft">
                <Camera size={32} color="#A1401E" />
              </View>
              <Text className="font-app text-text-primary text-[24px] font-bold text-center">
                Automate with AI
              </Text>
              <Text className="font-app text-text-secondary text-[15px] text-center mt-2 px-4 leading-6">
                Snap a photo of any receipt or upload a screenshot, and we'll automatically detect your subscription details.
              </Text>
            </View>

            <TouchableOpacity 
              onPress={takePhoto}
              className="bg-brand-primary w-full py-4 rounded-button flex-row justify-center items-center mb-4"
            >
              <Camera size={20} color="#FFFFFF" />
              <Text className="font-app font-semibold text-text-inverse text-[16px] ml-2">
                Take a Photo
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={pickImage}
              className="bg-background-surface w-full py-4 rounded-button flex-row justify-center items-center border border-border-warm"
            >
              <ImageIcon size={20} color="#161C27" />
              <Text className="font-app font-semibold text-text-primary text-[16px] ml-2">
                Choose from Library
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
