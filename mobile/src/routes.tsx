import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/home';
import Points from './pages/points';
import Detail from './pages/detail';
import Admin from './pages/admin';
import AdminPoints from './pages/adminPoints';


const AppStack = createStackNavigator();


const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator
             headerMode='none'
             screenOptions={{
                 cardStyle: {
                     backgroundColor:'#f0f0f5'
                 }
             }} 
            >
                <AppStack.Screen name='Home' component={Home}/>
                <AppStack.Screen name='Points' component={Points}/>
                <AppStack.Screen name='Admin' component={Admin}/>
                <AppStack.Screen name='AdminPoints' component={AdminPoints}/>
                <AppStack.Screen name='Detail' component={Detail}/>
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;