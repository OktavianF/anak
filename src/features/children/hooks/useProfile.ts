import { useState, useCallback } from 'react';

type ActiveSection = 'account' | 'children' | 'notifications' | 'history';

interface ParentAccount {
  name: string;
  email: string;
  phone: string;
  occupation?: string;
  location?: string;
}

interface NotificationSettings {
  assessmentReminders: boolean;
  consultationReminders: boolean;
  progressReports: boolean;
  weeklyDigest: boolean;
  marketingEmails: boolean;
}

interface UseProfileOptions {
  initialSection?: ActiveSection;
  initialAccount?: ParentAccount;
  initialNotifications?: NotificationSettings;
}

const defaultAccount: ParentAccount = {
  name: '',
  email: '',
  phone: '',
  occupation: '',
  location: '',
};

const defaultNotifications: NotificationSettings = {
  assessmentReminders: true,
  consultationReminders: true,
  progressReports: true,
  weeklyDigest: false,
  marketingEmails: false,
};

export function useProfile(options: UseProfileOptions = {}) {
  const [activeSection, setActiveSection] = useState<ActiveSection>(
    options.initialSection ?? 'account'
  );
  const [parentAccount, setParentAccount] = useState<ParentAccount>(
    options.initialAccount ?? defaultAccount
  );
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(
    options.initialNotifications ?? defaultNotifications
  );

  const updateParentAccount = useCallback((updates: Partial<ParentAccount>) => {
    setParentAccount((prev) => ({ ...prev, ...updates }));
  }, []);

  const toggleNotification = useCallback((key: keyof NotificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  return {
    activeSection,
    setActiveSection,
    parentAccount,
    setParentAccount,
    updateParentAccount,
    notificationSettings,
    setNotificationSettings,
    toggleNotification,
  };
}

export default useProfile;
export type { ActiveSection, ParentAccount, NotificationSettings };
