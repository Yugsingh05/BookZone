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
import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');

  const showAlert = (title: string, message: string) => {
    Alert.alert(title, message, [{ text: 'OK' }]);
  };

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setPendingVerification(true);
      showAlert('Check your email', 'We sent you a verification code.');
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage || 'Something went wrong. Please try again.';
      showAlert('Sign Up Failed', message);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        showAlert('Success', 'Your account has been created!');
        router.replace('/');
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
        showAlert('Verification Incomplete', 'Please try again.');
      }
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.message || 'Invalid code or something went wrong.';
      showAlert('Verification Failed', message);
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
            {pendingVerification ? 'Verify Your Email' : 'Create Account'}
          </Text>

          <View className="gap-4">
            {pendingVerification ? (
              <>
                <Text className="text-sm font-medium text-gray-300 mb-1">Verification Code</Text>
                <TextInput
                  className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white"
                  value={code}
                  placeholder="Enter your verification code"
                  placeholderTextColor="#9CA3AF"
                  onChangeText={setCode}
                  keyboardType="number-pad"
                />
                <TouchableOpacity
                  className="w-full bg-blue-600 p-4 rounded-lg mt-6"
                  onPress={onVerifyPress}
                >
                  <Text className="text-white text-center font-semibold">Verify Email</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
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
                  onPress={onSignUpPress}
                >
                  <Text className="text-white text-center font-semibold">Create Account</Text>
                </TouchableOpacity>

                <View className="flex-row justify-center items-center mt-6 gap-2">
                  <Text className="text-gray-400">Already have an account?</Text>
                  <Link href="/sign-in">
                    <Text className="text-blue-400 font-semibold ml-1">Sign in</Text>
                  </Link>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
