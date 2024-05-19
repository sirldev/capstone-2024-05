'use client';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 localStorage에서 로그인 상태를 읽어옴
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
      setAccessToken(token);
    }
  }, []);

  const login = (token: string) => {
    setIsLoggedIn(true);
    setAccessToken(token);
    localStorage.setItem('accessToken', token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAccessToken(null);
    localStorage.removeItem('accessToken');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
