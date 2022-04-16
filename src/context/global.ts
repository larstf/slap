import React from 'react';

interface Context {
  coins: number,
  xp: number,
  user?: {
    token: string,
    discord: {
      username: string,
      discriminator: string,
      id: string,
      avatar_url: string,
    },
    statistics: {
      xp: number,
      coins: number,
    },
    settings: {
      sound: boolean,
      public_profile: boolean,
    },
  },
  modal: {
    open: boolean,
    type: string,
    disable_close?: boolean,
  },
  update: (data: any) => void,
}

export const defaultValues: Context = {
  coins: 0,
  xp: 0,
  user: undefined,
  modal: {
    open: false,
    type: '',
  },
  update: (data: any) => {},
}

const GlobalContext = React.createContext(defaultValues);

export default GlobalContext