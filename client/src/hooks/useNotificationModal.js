import { useEffect, useState } from 'react';
import { STORAGE_KEY } from '../commons/constants';
import { storage } from '../utils/storage';

export default function useNotificationModal(postedAt) {
  const [open, setOpen] = useState(true);
  function closeModal() {
    storage.set(STORAGE_KEY.LAST_NOTIFICATION_SEEN_AT, new Date().toString());
    setOpen(false);
  }

  useEffect(() => {
    const lastSeenAtStr = storage.get(STORAGE_KEY.LAST_NOTIFICATION_SEEN_AT);
    if (!lastSeenAtStr || postedAt > new Date(lastSeenAtStr)) setOpen(true);
  }, [postedAt]);

  return [open, closeModal];
}
