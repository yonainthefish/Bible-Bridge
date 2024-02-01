import { createContext, useReducer, useEffect } from 'react';
import { User } from 'firebase/auth';

import { appAuth } from '../firebase/config';

interface State {
  user: null | User;
  isAuthReady: boolean;
}

type Action =
  | { type: 'login'; payload: User }
  | { type: 'logout'; payload: null }
  | { type: 'isAuthReady'; payload: null | User };

interface ContextType extends State {
  dispatch: React.Dispatch<Action>;
}

const AuthContext = createContext<ContextType>({
  user: null,
  isAuthReady: false,
  dispatch: () => {},
});

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const authReducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'login':
        return { ...state, user: action.payload };
      case 'logout':
        return { ...state, user: null };
      case 'isAuthReady':
        return { ...state, user: action.payload, isAuthReady: true };
    }
  };

  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthReady: false,
  });

  useEffect(() => {
    const unsubscribe = appAuth.onAuthStateChanged((user) => {
      dispatch({ type: 'isAuthReady', payload: user });
      console.log('hiii');
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
