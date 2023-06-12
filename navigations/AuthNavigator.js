import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Connexion from '../screens/Connexion';
import Kilometrage from '../screens/Kilometrage';
import ROUTES from '../constants/routes';
import MdpOublie from '../screens/MdpOublie';
import AjoutKM from '../screens/AjoutKM';

const Stack = createStackNavigator();

function AuthNavigator() {

  return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }} initialRouteName={ROUTES.CONNEXION}>
        <Stack.Screen name={ROUTES.CONNEXION} component={Connexion} />
        <Stack.Screen name={ROUTES.KILOMETRAGE} component={Kilometrage} />
        <Stack.Screen name={ROUTES.MDPOUBLIE} component={MdpOublie} />
        <Stack.Screen name={ROUTES.AJOUTKM} component={AjoutKM} />
      </Stack.Navigator>
  );

}

export default AuthNavigator;