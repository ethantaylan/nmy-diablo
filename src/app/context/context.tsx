import React, { createContext, Dispatch, PropsWithChildren, useContext, useReducer } from 'react';

export interface GlobalContext {
  darkMode: boolean;
  userName: string;
}

const initialState: GlobalContext = {
  darkMode: true,
  userName: '',
};

const reducer = (state: GlobalContext, action: any): GlobalContext => {
  switch (action.type) {
    case 'DARK':
      return {
        ...state,
        darkMode: true,
      };
    case 'LIGHT':
      return {
        ...state,
        darkMode: false,
      };
    case 'SET_USER_NAME':
      return {
        ...state,
        userName: action.userName,
      };
    default:
      return state;
  }
};

export const StateContext = createContext<GlobalContext>(initialState);

export const DispatchContext = createContext<Dispatch<any> | undefined>(undefined);

export const GlobalContextProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContext => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('Must be used within a GlobalContextProvider');
  }
  return context;
};

export const useGlobalDispatch = (): Dispatch<any> => {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) {
    throw new Error('Must be used within a GlobalContextProvider');
  }
  return dispatch;
};
