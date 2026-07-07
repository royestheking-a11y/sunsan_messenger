import { Capacitor } from "@capacitor/core";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

// Initialize the plugin
if (Capacitor.isNativePlatform()) {
  GoogleAuth.initialize({
    clientId:
      "1020729373464-m48ld29rfgkeocgu9al5ea4qtq23pdqi.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    grantOfflineAccess: true,
  });
}

export const signInWithGoogleNative = async () => {
  try {
    const user = await GoogleAuth.signIn();
    return {
      success: true,
      user: {
        googleId: user.id || user.authentication.idToken, // ID or token depending on platform
        email: user.email,
        name: user.name || user.givenName,
        avatar: user.imageUrl,
        idToken: user.authentication.idToken,
      },
    };
  } catch (error) {
    console.error("Native Google Sign-In Error:", error);
    return { success: false, error };
  }
};
