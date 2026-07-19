import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext({});
const STORAGE_USERS = 'contrato_users';
const STORAGE_SESSION = 'contrato_session';

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_USERS) || '{}');
  } catch {
    return {};
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
}

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode('cc_' + password + '_salt');
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem(STORAGE_SESSION);
    if (session) {
      const users = getUsers();
      if (users[session]) {
        setUser({ email: session });
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const users = getUsers();
    const key = email.toLowerCase().trim();
    if (!users[key]) {
      throw { code: 'user-not-found' };
    }
    const hash = await hashPassword(password);
    if (users[key].hash !== hash) {
      throw { code: 'wrong-password' };
    }
    localStorage.setItem(STORAGE_SESSION, key);
    setUser({ email: key });
  }, []);

  const register = useCallback(async (email, password) => {
    const users = getUsers();
    const key = email.toLowerCase().trim();
    if (users[key]) {
      throw { code: 'email-already-in-use' };
    }
    const hash = await hashPassword(password);
    users[key] = { hash };
    saveUsers(users);
    localStorage.setItem(STORAGE_SESSION, key);
    setUser({ email: key });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_SESSION);
    setUser(null);
  }, []);

  const value = { user, loading, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
