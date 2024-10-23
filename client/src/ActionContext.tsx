import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Action } from './types/login.interface';

interface ActionContextType {
  actions: Action[];
  setActions: React.Dispatch<React.SetStateAction<Action[]>>;
}

const ActionContext = createContext<ActionContextType | undefined>(undefined);

export const ActionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [actions, setActions] = useState<Action[]>([]);
  return (
    <ActionContext.Provider value={{ actions, setActions }}>
      {children}
    </ActionContext.Provider>
  );
};

export const useActionContext = () => {
  const context = useContext(ActionContext);
  if (!context) {
    throw new Error('Something went wrong');
  }
  return context;
};
