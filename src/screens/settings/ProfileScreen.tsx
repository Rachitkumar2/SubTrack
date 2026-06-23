import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Trash } from 'lucide-react-native';
import { useAuthStore } from '../../store/authStore';
import { updateProfile } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import * as ImagePicker from 'expo-image-picker';
import md5 from 'md5';
import { uploadProfilePhoto } from '../../services/firebase/storage.service';
import { Image, ActivityIndicator } from 'react-native';

export function ProfileScreen() {
  const navigation = useNavigation();
  const { user, initialize } = useAuthStore();
  
  const [displayName, setDisplayName] = useState(user?.name || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const handleUploadPhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'You need to grant camera roll permissions to upload a photo.');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.1, // High compression to fit in Firestore
        base64: true, // Request base64
      });

      if (pickerResult.canceled) {
        return;
      }

      setIsUploadingPhoto(true);
      const base64 = pickerResult.assets[0].base64;
      const dataUri = `data:image/jpeg;base64,${base64}`;
      
      // Bypass Firebase Storage completely to avoid billing limits!
      // Save directly to Firestore since it's just a highly compressed string.
      const currentUser = auth().currentUser;
      if (currentUser) {
        // Update Firestore directly
        const firestore = (await import('@react-native-firebase/firestore')).default;
        await firestore().collection('users').doc(currentUser.uid).update({
          photoURL: dataUri
        });
        
        initialize(); // Refresh state
        Alert.alert('Success', 'Profile photo updated!');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to upload photo.');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleRemovePhoto = async () => {
    setIsUploadingPhoto(true);
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        await currentUser.updateProfile({ photoURL: '' });
        
        const firestore = (await import('@react-native-firebase/firestore')).default;
        await firestore().collection('users').doc(currentUser.uid).update({
          photoURL: firestore.FieldValue.delete()
        });
        
        initialize(); // Refresh state
        Alert.alert('Success', 'Profile photo removed!');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to remove photo.');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleSave = async () => {
    if (!displayName.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }

    setIsSaving(true);
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        await currentUser.updateProfile({
          displayName: displayName.trim(),
        });
        
        // Also update Firestore
        import('@react-native-firebase/firestore').then(({ default: firestore }) => {
          firestore().collection('users').doc(currentUser.uid).update({
            name: displayName.trim()
          });
        });

        // Refresh the auth store state
        initialize();
        Alert.alert('Success', 'Profile updated successfully', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = () => {
    if (!displayName) return 'U';
    return displayName.charAt(0).toUpperCase();
  };

  const [imageError, setImageError] = useState(false);

  const getAvatarUrl = () => {
    if (user?.photoURL) return user.photoURL;
    if (user?.email) {
      const hash = md5(user.email.toLowerCase().trim());
      return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=400`;
    }
    return null;
  };

  return (
    <SafeAreaView className="flex-1 bg-background-app">
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
            Profile
          </Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 100 }}>
          <View className="bg-background-surface rounded-card border border-border-warm p-xl items-center mb-6">
            <TouchableOpacity 
              onPress={handleUploadPhoto}
              disabled={isUploadingPhoto}
              className="w-24 h-24 rounded-full bg-brand-primary items-center justify-center mb-4 overflow-hidden relative"
            >
              {isUploadingPhoto ? (
                <ActivityIndicator color="#FFFFFF" size="large" />
              ) : getAvatarUrl() && !imageError ? (
                <Image 
                  source={{ uri: getAvatarUrl()! }} 
                  style={{ width: '100%', height: '100%' }} 
                  onError={() => setImageError(true)} 
                />
              ) : (
                <Text className="font-app font-bold text-text-inverse text-[36px]">
                  {getInitials()}
                </Text>
              )}
              {/* Optional: Add a little camera icon overlay */}
            </TouchableOpacity>
            <Text className="font-app font-medium text-text-secondary text-[14px]">
              {user?.email}
            </Text>
            {user?.photoURL && (
              <TouchableOpacity 
                onPress={handleRemovePhoto} 
                className="mt-4 flex-row items-center px-4 py-2 rounded-full border"
                style={{ backgroundColor: '#FFF1F2', borderColor: '#FECDD3' }}
              >
                <Trash size={16} color="#E11D48" />
                <Text className="font-app font-semibold text-[#E11D48] text-[14px] ml-2">
                  Remove Photo
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="bg-background-surface rounded-card border border-border-warm p-xl shadow-softCard">
            <View style={{ marginBottom: 24 }}>
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={displayName}
                onChangeText={setDisplayName}
              />
            </View>

            <Button
              title="Save Changes"
              onPress={handleSave}
              variant="primary"
              loading={isSaving}
              disabled={isSaving}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
