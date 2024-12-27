import { Job } from "@/common/constants";
declare const recommendJobs: ({ currentUser, jobs, }: {
    currentUser: any;
    jobs: Job[];
}) => Job[];
export default recommendJobs;
