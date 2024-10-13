import { StatusBar } from 'expo-status-bar';
import MainScreen from './screens/MainScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AngleProvider } from './store/angleCtx';
import { TourGuideProvider } from 'rn-tourguide';
import { useState, useEffect } from 'react';
import Splash from './screens/Splash';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <TourGuideProvider>
      <NavigationContainer>
        <StatusBar backgroundColor='#202020' style='light'/>
        <AngleProvider>
          <Stack.Navigator>
            <Stack.Screen
              name='home'
              component={MainScreen}
              options={{
                headerShown: false
              }}
            />
          </Stack.Navigator>
        </AngleProvider>
      </NavigationContainer>
    </TourGuideProvider>
  );
}
