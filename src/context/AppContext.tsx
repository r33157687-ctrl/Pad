import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthSession, ContentCategory, MentorProfile, PortalItem } from '../types';
import { INITIAL_MENTOR_PROFILE, INITIAL_PORTAL_ITEMS } from '../data/initialData';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info';
}

interface AppContextType {
  session: AuthSession;
  login: (username: string, pass: string) => { success: boolean; role: 'admin' | 'user'; message: string };
  logout: () => void;

  // View mode toggle for Admin (preview as student without re-logging in)
  adminPreviewAsStudent: boolean;
  setAdminPreviewAsStudent: (preview: boolean) => void;

  items: PortalItem[];
  addItem: (item: Omit<PortalItem, 'id' | 'createdAt' | 'views'>) => void;
  updateItem: (item: PortalItem) => void;
  deleteItem: (id: string) => void;
  togglePin: (id: string) => void;

  mentorProfile: MentorProfile;
  updateMentorProfile: (profile: Partial<MentorProfile>) => void;

  activeCategory: ContentCategory | 'all';
  setActiveCategory: (cat: ContentCategory | 'all') => void;

  searchQuery: string;
  setSearchQuery: (q: string) => void;

  viewingItem: PortalItem | null;
  setViewingItem: (item: PortalItem | null) => void;

  isPostModalOpen: boolean;
  setIsPostModalOpen: (open: boolean) => void;

  editingItem: PortalItem | null;
  setEditingItem: (item: PortalItem | null) => void;

  toasts: Toast[];
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const STORAGE_KEYS = {
  SESSION: 'portal_auth_session_v3',
  ITEMS: 'portal_items_list_v3',
  PROFILE: 'portal_mentor_profile_v3',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth Session state
  const [session, setSession] = useState<AuthSession>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SESSION);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      isLoggedIn: false,
      role: 'user',
      username: '',
      displayName: '',
    };
  });

  const [adminPreviewAsStudent, setAdminPreviewAsStudent] = useState(false);

  // Items state
  const [items, setItems] = useState<PortalItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ITEMS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_PORTAL_ITEMS;
  });

  // Mentor Profile state
  const [mentorProfile, setMentorProfile] = useState<MentorProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_MENTOR_PROFILE;
  });

  const [activeCategory, setActiveCategory] = useState<ContentCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingItem, setViewingItem] = useState<PortalItem | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortalItem | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync session
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
    } catch (e) {
      console.warn(e);
    }
  }, [session]);

  // Sync items
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items));
    } catch (e) {
      console.warn(e);
    }
  }, [items]);

  // Sync mentor
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(mentorProfile));
    } catch (e) {
      console.warn(e);
    }
  }, [mentorProfile]);

  // LOGIN FUNCTION
  const login = (u: string, p: string): { success: boolean; role: 'admin' | 'user'; message: string } => {
    const user = u.trim();
    const pass = p.trim();

    if (!user || !pass) {
      return { success: false, role: 'user', message: 'Kripya username aur password dono enter karein.' };
    }

    // CHECK ADMIN (Manish9090 / Munna9090)
    if (user.toLowerCase() === 'manish9090' && pass === 'Munna9090') {
      const newSession: AuthSession = {
        isLoggedIn: true,
        role: 'admin',
        username: 'Manish9090',
        displayName: 'Manish Kumar Thakur (Creator & Admin)',
      };
      setSession(newSession);
      setAdminPreviewAsStudent(false);
      showToast('Swagat hai Manish Sir! Admin Panel Unlock ho gaya.', 'success');
      return { success: true, role: 'admin', message: 'Admin login successful.' };
    }

    // USER / STUDENT LOGIN
    const studentSession: AuthSession = {
      isLoggedIn: true,
      role: 'user',
      username: user,
      displayName: user.charAt(0).toUpperCase() + user.slice(1),
    };
    setSession(studentSession);
    showToast(`Welcome ${studentSession.displayName}! VIP Student Panel open ho gaya.`, 'success');
    return { success: true, role: 'user', message: 'User login successful.' };
  };

  const logout = () => {
    setSession({
      isLoggedIn: false,
      role: 'user',
      username: '',
      displayName: '',
    });
    setAdminPreviewAsStudent(false);
    showToast('Aap safaltapoorvak logout ho gaye.', 'info');
  };

  // Content Operations (Instant update & persist)
  const addItem = (itemData: Omit<PortalItem, 'id' | 'createdAt' | 'views'>) => {
    const newItem = {
      ...itemData,
      id: `${itemData.category}_${Date.now().toString(36)}`,
      createdAt: new Date().toISOString().split('T')[0],
      views: 1,
    } as PortalItem;

    setItems((prev) => [newItem, ...prev]);
    showToast('Post turant publish ho gaya aur live dikhne laga!', 'success');
  };

  const updateItem = (updated: PortalItem) => {
    setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    showToast('Item safaltapoorvak update ho gaya!', 'success');
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item delete ho gaya!', 'success');
  };

  const togglePin = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isPinned: !item.isPinned } : item))
    );
  };

  const updateMentorProfile = (profile: Partial<MentorProfile>) => {
    setMentorProfile((prev) => ({ ...prev, ...profile }));
    showToast('Aapki Profile aur Red Badge details update ho gayi!', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        session,
        login,
        logout,
        adminPreviewAsStudent,
        setAdminPreviewAsStudent,
        items,
        addItem,
        updateItem,
        deleteItem,
        togglePin,
        mentorProfile,
        updateMentorProfile,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        viewingItem,
        setViewingItem,
        isPostModalOpen,
        setIsPostModalOpen,
        editingItem,
        setEditingItem,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
