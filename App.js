import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import { UserProvider } from './src/context/UserContext';
import { FeedsProvider } from './src/context/FeedsContext';
import { JobsProvider } from './src/context/JobsContext';
import { TendersProvider } from './src/context/TendersContext';



const App = () => {
  return (
    <NavigationContainer >
      <MainNavigator />
    </NavigationContainer>
  );
};

export default () => {
  return (
    <UserProvider>
      <TendersProvider>
        <JobsProvider>
          <FeedsProvider>
            <App />
          </FeedsProvider>
        </JobsProvider>
      </TendersProvider>
    </UserProvider>
  );
};



