import React, { createContext, useContext, useState, ReactNode } from 'react';
import { wardrobeItems as initialItems, outfits as initialOutfits, WardrobeItem, Outfit } from '@/data/mockData';

interface AppState {
  items: WardrobeItem[];
  outfitsList: Outfit[];
  isAuthenticated: boolean;
  userName: string;
  addItem: (item: WardrobeItem) => void;
  addOutfit: (outfit: Outfit) => void;
  deleteItem: (id: string) => void;
  deleteOutfit: (id: string) => void;
  setAuthenticated: (val: boolean) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WardrobeItem[]>(initialItems);
  const [outfitsList, setOutfitsList] = useState<Outfit[]>(initialOutfits);
  const [isAuthenticated, setAuthenticated] = useState(false);

  const addItem = (item: WardrobeItem) => setItems(prev => [item, ...prev]);
  const addOutfit = (outfit: Outfit) => setOutfitsList(prev => [outfit, ...prev]);
  const deleteItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
  const deleteOutfit = (id: string) => setOutfitsList(prev => prev.filter(o => o.id !== id));

  return (
    <AppContext.Provider value={{ items, outfitsList, isAuthenticated, userName: 'Sarah', addItem, addOutfit, deleteItem, deleteOutfit, setAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
