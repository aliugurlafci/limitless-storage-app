import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import { Splash } from './src/pages/Splash';
import { Opening } from './src/pages/Opening';
import { Home } from './src/pages/Home';
import { theme } from './src/Styles';
/**{Platform.OS === "android" ? <StatusBar style="light" backgroundColor="black" /> : <StatusBar style="light" backgroundColor="white" />} */
export default function App() {
  return (
    <>
      <StatusBar style="inverted" translucent animated networkActivityIndicatorVisible backgroundColor={theme.backgroundColor} />
      <Router>
        <Stack key="root" hideTabBar hideNavBar lightbox={false}>
          <Scene key="splash" component={Splash} initial />
          <Scene key="opening" component={Opening} />
          <Scene key="home" component={Home} />
        </Stack>
      </Router>
    </>
  );
}