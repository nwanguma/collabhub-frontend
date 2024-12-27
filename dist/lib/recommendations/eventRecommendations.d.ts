import { Event } from "@/common/constants";
declare const recommendEvents: ({ currentUser, events, }: {
    currentUser: any;
    events: Event[];
}) => Event[];
export default recommendEvents;
