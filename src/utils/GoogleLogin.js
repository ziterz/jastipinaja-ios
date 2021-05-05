import { GoogleSignin } from "@react-native-community/google-signin";

export default function () {
    GoogleSignin.configure({
      webClientId:
        '703965490914-lkrvt0b4c8lih6kuep9nb5pgvb9t5cbd.apps.googleusercontent.com',
      offlineAccess: true,
      iosClientId: '703965490914-75a8n6k4vc35ehgq0i17j9kc5llgpu85.apps.googleusercontent.com'
    });
  }
  