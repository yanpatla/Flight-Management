import { AuthStore, IAuthStore } from "@/store";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface AuthContextState {
  authStore?: IAuthStore;
}

export const AuthContext = createContext<AuthContextState>({});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authStore, setAuthStore] = useState<IAuthStore>();

  useEffect(() => {
    if (!authStore) {
      setAuthStore(new AuthStore());
    }
  }, [authStore]);
  return (
    <AuthContext.Provider value={{ authStore }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
