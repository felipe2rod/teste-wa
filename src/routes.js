import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import { default as Main } from  './screens/Main';
import { default as User } from './screens/User';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User
    },
    {
      headerLayoutPreset: 'center',
      //headerBackTitleVisible: 'false',
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#F36B7F',
        },
        headerTintColor: '#fff',
      },
    }
  )
);

export default Routes;
