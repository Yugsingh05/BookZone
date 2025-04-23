import * as React from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';

export default function SignInScreen() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');

  const showAlert = (title: string, message: string) => {
    Alert.alert(title, message, [{ text: 'OK' }]);
  };

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        showAlert('Success', 'Welcome back!');
        router.replace('/');
      } else {
        console.log(JSON.stringify(result, null, 2));
        showAlert('Additional Steps Required', 'Please complete any further verification steps.');
      }
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage || 'Invalid credentials or something went wrong.';
      showAlert('Sign In Failed', message);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-900"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 justify-center p-6">
          <Text className="text-3xl font-bold text-center mb-8 text-white">
            Welcome Back
          </Text>

          <View className="gap-4">
            <Text className="text-sm font-medium text-gray-300 mb-1">Email</Text>
            <TextInput
              className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white"
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Enter email"
              placeholderTextColor="#9CA3AF"
              onChangeText={setEmailAddress}
              keyboardType="email-address"
            />

            <Text className="text-sm font-medium text-gray-300 mb-1">Password</Text>
            <TextInput
              className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white"
              value={password}
              placeholder="Enter password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              onChangeText={setPassword}
            />

            <TouchableOpacity
              className="w-full bg-blue-600 p-4 rounded-lg mt-6"
              onPress={onSignInPress}
            >
              <Text className="text-white text-center font-semibold">Sign In</Text>
            </TouchableOpacity>

            <View className="flex-row justify-center items-center mt-6 gap-2">
              <Text className="text-gray-400">Don't have an account?</Text>
              <Link href="/sign-up">
                <Text className="text-blue-400 font-semibold ml-1">Sign up</Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
