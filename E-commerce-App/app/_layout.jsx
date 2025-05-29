import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import React from "react";
import LoginScreen from "../components/LoginScreen";
import Constants from "expo-constants";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "outfit": require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
  });

  if (!fontsLoaded) {
    // Return null or a loading component until fonts are loaded
    return null;
  }

  const { clerkPublishableKey } = Constants.expoConfig.extra;

  if (!clerkPublishableKey) {
    console.error("Clerk publishableKey is missing. Check your app.config.js or app.json.");
    return null; // Or show a fallback UI
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <SignedIn>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SignedIn>
      <SignedOut>
        <LoginScreen />
      </SignedOut>
    </ClerkProvider>
  );
}
