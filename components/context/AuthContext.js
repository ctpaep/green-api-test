"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getSettingsFromLocalStorage, setSettings, setSettingsIntoLocalStorage } from '../utils/requests';

// Create AuthContext
const AuthContext = createContext();


// Create AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const save = (apiData) => {
    const {idInstance, apiTokenInstance} = apiData;
    setIsAuthenticated(true);
    const data = { idInstance, apiTokenInstance}; 
    setSettingsIntoLocalStorage(data)
    setSettings(idInstance, apiTokenInstance)
  }

  useEffect (()=>{
    const storeData = getSettingsFromLocalStorage()
    if (storeData) {
      setIsAuthenticated(true)
      setSettings(storeData.idInstance, storeData.apiTokenInstance)
    }
    else {
      setIsAuthenticated(false)
    }
    setIsLoading (false)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, save, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
