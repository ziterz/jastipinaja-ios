import React, {Component} from 'react';
import Routing from './src/routing/Routing';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Lato-Reguler',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Lato-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Lato-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Lato-Thin',
      fontWeight: 'normal',
    },
  },
};
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#01579B',
    accent: '#01579B',
  },
  fonts: configureFonts(fontConfig),
};

function myiOSPromptCallback(permission){
  // do something with permission value
}
class App extends Component {
  constructor(properties) {
    super(properties);
    //Remove this method to stop OneSignal Debugging
    OneSignal.setLogLevel(6, 0);

    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init('c477eb04-2ae4-41e5-b4f7-e59d81a8b050', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
    OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }
  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  render() {
    return (
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <PaperProvider theme={theme}>
          <Routing />
        </PaperProvider>
      </SafeAreaProvider>
    );
  }
}

export default App;
