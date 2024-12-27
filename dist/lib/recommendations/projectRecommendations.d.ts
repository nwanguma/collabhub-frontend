import { Project } from "@/common/constants";
declare const recommendProjects: ({ currentUser, projects, }: {
    currentUser: any;
    projects: Project[];
}) => Project[];
export default recommendProjects;
