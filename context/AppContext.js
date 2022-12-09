import {createContext, useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import { Text } from 'react-native';

const AppContext = createContext();

export function useAuth() {
  return useContext(AppContext);
}

const AuthProvider = ({children}) => {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    setLoading(false);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  const AnonymouslyAuth = () => {
    auth()
      .signInAnonymously()
      .then(() => {})
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
        }
      });
  };

  AnonymouslyAuth();

  value = {
    user,
    AnonymouslyAuth,
    loading,
    // setLoading
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      {/* {!loading && children} */}
    </AppContext.Provider>
  );
};

export {AuthProvider, AppContext};
