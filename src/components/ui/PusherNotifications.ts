//  WIP: real-time chat and notifications with pusher
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/store";
import pusher from "@/lib/pusher";
import { Message, Notification } from "@/common/constants";
import { fetchConnections } from "@/store/connections";
import { fetchConversations } from "@/store/conversations";

const PusherNotifications = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const userId = user.data.id;
    const channel = pusher.subscribe(`private-user-${userId}`);

    channel.bind(
      "new-notification",
      function (data: { data: Notification[]; messages: Message[] }) {
        if (data.data?.length > 0) {
          dispatch(fetchConnections());
        }

        if (data.messages?.length > 0) {
          dispatch(fetchConversations());
        }
      }
    );

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  return null;
};

export default PusherNotifications;
