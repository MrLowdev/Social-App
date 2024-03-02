import DynamicNavBar from "@/components/common/DynamicNavBar";
import UserAvatar from "@/components/common/UserAvatar";
import { fetchNotifications } from "@/lib/serverMethods";
import { formatDate } from "@/lib/utils";
import { NotificationType } from "@/types/type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notification",
  description: "Find your all notifications and who commented on your post.",
  openGraph: {
    title: "Search your notification",
  },
};

const Notifications = async () => {
  const notification: Array<NotificationType> | [] = await fetchNotifications();
  return (
    <div>
      <DynamicNavBar title="Notifications" />
      <div className="mt-5 w-full">
        {notification &&
          notification.length > 0 &&
          notification.map((item) => (
            <div
              key={item.id}
              className="flex items-start space-x-5 mb-3 w-full"
            >
              <UserAvatar name={item.user.name} image="" />
              <div className="w-full">
                <div className="flex justify-between w-full items-center">
                  <p className="font-bold text-xl">{item.user.name}</p>
                  <span className="text-sm">{formatDate(item.created_at)}</span>
                </div>
                <p className="text-md">{item.content}</p>
              </div>
            </div>
          ))}
        {notification && notification.length < 1 && (
          <div className="text-center">
            <h1>No notification found!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
