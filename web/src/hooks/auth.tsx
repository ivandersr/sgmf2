import React, {
  createContext, useCallback, useState, useContext,
} from 'react';

import api from '../services/apiClient';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  login: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }

  return context;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@SGMF2:token');
    const user = localStorage.getItem('@SGMF2:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });
  const signIn = useCallback(async ({ login, password }) => {
    const response = await api.post('sessions', {
      login,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@SGMF2:token', token);
    localStorage.setItem('@SGMF2:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@SGMF2:token');
    localStorage.removeItem('@SGMF2:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
