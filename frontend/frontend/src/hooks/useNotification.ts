import { useAppDispatch } from "../features/auth/hook";
import { addNotification, removeNotification } from "../features/notifications/notificationSlice";
import { v4 as uuid } from "uuid";

type NotificationType = "info" | "warning" | "error";

export default function useNotifications() {
  const dispatch = useAppDispatch();

  const notify = (message: string, type: NotificationType = "info") => {
    const id = uuid();
    console.log("message",message)

    // Add notification
    dispatch(addNotification({
      id,
      message,
      type,
      read: false,
    }));

    // Remove notification after 3 seconds
    setTimeout(() => {
      dispatch(removeNotification(id));
    }, 3000);
  };

  return { notify };
}
