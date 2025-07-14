import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './screens/login';
import { Home } from './screens/home';
import { UserProvider } from './contexts/userContext';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Login' component={Login}></Stack.Screen>
          <Stack.Screen name='Home' component={Home}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
