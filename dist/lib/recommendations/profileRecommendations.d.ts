import { Profile } from "@/common/constants";
declare const recommendProfiles: ({ currentUser, profiles, }: {
    currentUser: any;
    profiles: Profile[];
}) => Profile[];
export default recommendProfiles;
