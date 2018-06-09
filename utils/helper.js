import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";

const NOTIFICATION_STORAGE_KEY = "NOTIFICATION_STORAGE_KEY";
const NOTIFICATION_PERMISSION_STORAGE_KEY = "NOTIFICATION_PERMISSION_STORAGE_KEY"

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_STORAGE_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

export function createNotification() {
  return {
    title: "Take a Quiz",
    body: "👋 don't forget to take a quiz!",
    ios: {
      sound: true
    }
  };
}

export function setNotification() {
  AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        let date = new Date();
            date.setDate(date.getDate() + 1);
            date.setHours(9,0,0);
            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: date,
              repeat: "day"
            });
        AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(true))
      }
    });
}


export function askNotificationPermission() {
    AsyncStorage.getItem(NOTIFICATION_PERMISSION_STORAGE_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        // @todo How do i handle the case when user is reject to provide this permission
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            AsyncStorage.setItem(NOTIFICATION_PERMISSION_STORAGE_KEY, JSON.stringify(true))
          }
        });
      }
    });
}
