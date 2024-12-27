"use client";

import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import PaginationComponent from "@/components/ui/PaginationComponent";
import { RootState, AppDispatch } from "@/store";
import { setMainFeedSettings } from "@/store/ui";
import { ProjectCard } from "@/components/ui/ProjectCard";
import AppModal from "@/components/ui/Modal";
import CreateProjectForm from "@/components/forms/ProjectForm";
import { ProfilePreviewCard } from "@/components/ui/ProfileCardPreview";
import AddItemButton from "@/components/ui/AddItemButton";
import { Project, Connection } from "@/common/constants";
import { WithTooltip } from "@/components/ui/WithTooltip";
import {
  SkeletonCardRounded,
  SkeletonLoader,
} from "@/components/ui/SkeletonLoader";
import { fetchProjectsData } from "@/api";
import {
  selectProfilesRecommendations,
  selectIsRecommendationsLoading,
  selectCurrentUser,
  selectConnectionsData,
} from "../../lib/selectors";
import AvatarComponent from "@/components/ui/AvatarComponent";

import "../../app/globals.css";

const MainFeed: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { mainFeedSettings } = useSelector((state: RootState) => state.ui);
  const { profilesRecommendations, currentUser, connectionsData } = useSelector(
    (state: RootState) => ({
      profilesRecommendations: selectProfilesRecommendations(state),
      isRecommendationsLoading: selectIsRecommendationsLoading(state),
      currentUser: selectCurrentUser(state),
      connectionsData: selectConnectionsData(state),
    }),
    shallowEqual
  );

  const [projectsPagination, setProjectsPagination] = useState({
    page: 1,
    limit: 5,
  });

  const { data: projectsData, isLoading: projectsIsLoading } = useQuery({
    queryKey: [
      "projects",
      projectsPagination,
      mainFeedSettings.contentTypeFrom,
    ],
    queryFn: () =>
      fetchProjectsData(projectsPagination, mainFeedSettings.contentTypeFrom),
    enabled: mainFeedSettings.contentType === "projects",
    placeholderData: keepPreviousData,
  });

  let projects: Project[] = [];
  let projectsTotal: number = 0;

  if (projectsData) {
    const { total: pageTotal } = projectsData;
    projects = projectsData.data;
    projectsTotal = pageTotal;
  }

  const [followersModalIsOpen, setFollowersModalIsOpen] = useState(false);
  const [followingModalIsOpen, setFollowingModalIsOpen] = useState(false);
  const [addProjectModalIsOpen, setAddProjectModalIsOpen] =
    useState<boolean>(false);

  const handleToggleAddProjectModal = () => {
    setAddProjectModalIsOpen(!addProjectModalIsOpen);
  };

  const handleMainFeedContentFromChange = (type: string) => {
    dispatch(
      setMainFeedSettings({
        contentType: mainFeedSettings.contentType,
        contentTypeFrom: type,
      })
    );
  };

  const handleToggleFollowersModal = () => {
    setFollowersModalIsOpen((o) => !o);
  };

  const handleToggleFollowingModal = () => {
    setFollowingModalIsOpen((o) => !o);
  };

  return (
    <div className="min-h-screen w-full bg-white p-6">
      <div className="flex lg:space-x-5">
        <div className="w-full md:flex-1">
          <div className="space-y-6 sticky top-0 self-start">
            <div
              className={`p-4 rounded-lg border border-gray-300 space-y-5 s:space-y-3 flex flex-col s:flex-row items-center justify-between`}
            >
              {currentUser?.id && (
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col text-center s:text-left s:flex-row items-center space-x-2">
                    <AvatarComponent
                      avatar={currentUser.profile.avatar}
                      className="w-16 h-16"
                    />
                    <div className="flex flex-col space-y-1">
                      <span className="font-medium text-base text-custom-gray-heading font-custom font-app-medium">
                        {currentUser.profile.first_name}{" "}
                        {currentUser.profile.last_name}
                      </span>
                      <span className="text-xs text-custom-gray-small-text">
                        {currentUser.profile.title}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-gray-600">
                    <span
                      className="underline cursor-pointer"
                      onClick={() =>
                        !!connectionsData.followers?.length &&
                        handleToggleFollowersModal()
                      }
                    >
                      <span>{connectionsData.followers?.length}</span>{" "}
                      <span>Followers</span>
                    </span>
                    <span
                      className="underline cursor-pointer"
                      onClick={() =>
                        !!connectionsData.following?.length &&
                        handleToggleFollowingModal()
                      }
                    >
                      <span>{connectionsData.following?.length}</span>{" "}
                      <span className="underline">Following</span>
                    </span>
                  </div>
                </div>
              )}
              {!currentUser?.id && <SkeletonCardRounded />}
              <div className="space-y-3 xs:space-y-6">
                <div className="">
                  <div className="flex justify-start xs:justify-end items-center space-x-2">
                    <span className="text-xs-sm text-custom-gray-paragraph">
                      Create:
                    </span>
                    <div className="flex flex-wrap lg:flex-nowrap space-x-3 justify-end">
                      <AddItemButton
                        icon={
                          <div>
                            {WithTooltip(
                              "New Project",
                              <svg
                                className="w-4 h-4 xs:w-6 xs:h-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M16 3L16 6M8 3L8 6"
                                  stroke="#ffffff"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M14 4H10L10 6C10 7.10457 9.10457 8 8 8C6.89543 8 6 7.10457 6 6L6 4.07612C5.02492 4.17203 4.36857 4.38879 3.87868 4.87868C3 5.75736 3 7.17157 3 10V15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15V10C21 7.17157 21 5.75736 20.1213 4.87868C19.6314 4.38879 18.9751 4.17203 18 4.07612L18 6C18 7.10457 17.1046 8 16 8C14.8954 8 14 7.10457 14 6L14 4ZM7 12C7 11.4477 7.44772 11 8 11L16 11C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13L8 13C7.44772 13 7 12.5523 7 12ZM8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17L16 17C16.5523 17 17 16.5523 17 16C17 15.4477 16.5523 15 16 15L8 15Z"
                                  fill="#1D4ED8"
                                />
                              </svg>
                            )}
                          </div>
                        }
                        handleOnClick={handleToggleAddProjectModal}
                        fill="bg-slate-100 text-custom-gray-paragraph hover:bg-slate-200"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-1 xs:space-y-3">
                  <span className="text-xs font-medium text-center s:text-right w-full block">
                    Customize feed
                  </span>
                  <div className="flex flex-wrap space-x-1 xs:space-x-2 items-center justify-start sm:justify-end">
                    <span className="text-xs text-custom-gray-paragraph">
                      From:
                    </span>
                    {["following", "all"].map((contentTypeFrom) => (
                      <div
                        onClick={() =>
                          handleMainFeedContentFromChange(contentTypeFrom)
                        }
                        key={contentTypeFrom}
                        className={`${
                          mainFeedSettings.contentTypeFrom ===
                          contentTypeFrom.toLowerCase()
                            ? "bg-violet-100"
                            : ""
                        } text-xs capitalize cursor-pointer border hover:bg-violet-100 border-violet-500 text-violet-500 py-1 px-2 rounded`}
                      >
                        {contentTypeFrom}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {projectsIsLoading && <SkeletonLoader />}
            {!projectsIsLoading && (
              <div className="overflow-y-auto hide-scroll h-screen">
                {mainFeedSettings.contentType === "projects" && (
                  <div className="space-y-3">
                    {projects &&
                      projects?.map((project) => (
                        <div
                          key={project?.id}
                          className="border border-gray-300 p-2 md:p-3 rounded-lg"
                        >
                          <ProjectCard project={project} />
                        </div>
                      ))}
                    <PaginationComponent
                      dataLength={projects.length}
                      total={projectsTotal}
                      setPagination={setProjectsPagination}
                      limit={projectsPagination.limit}
                      tag="projects"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="hidden lg:block w-1/3">
          <aside className="space-y-5 sticky top-0 self-start">
            <div className="p-4 bg-white rounded-lg border border-gray-300">
              <h3 className="font-app-medium mb-5  text-gray-700 text-base">
                Connect with professionals
              </h3>
              <div className="space-y-4">
                {profilesRecommendations &&
                  profilesRecommendations.length > 0 &&
                  profilesRecommendations.map((profile) => {
                    let hasFollowed = false;

                    if (currentUser)
                      hasFollowed = (connectionsData.following || [])
                        .map((following) => {
                          return (following as Connection).profile_id as string;
                        })
                        .includes(profile?.id);

                    return (
                      <div
                        key={profile?.id}
                        className="border-b border-b-gray-200 pb-4 last:border-0"
                      >
                        <ProfilePreviewCard
                          email={profile.email}
                          currentUserProfileId={currentUser?.profile?.id}
                          name={profile.first_name + " " + profile.last_name}
                          title={profile.title}
                          profile_id={profile?.id}
                          user_id={profile.user_id}
                          avatar={
                            profile.avatar || "/images/profile-placeholder.png"
                          }
                          hasFollowed={hasFollowed}
                        />
                      </div>
                    );
                  })}
                {profilesRecommendations?.length == 0 && (
                  <div className="text-sm text-gray-600">
                    Looks like there is nothing to show.
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
      <AppModal
        title="Create Project"
        isOpen={addProjectModalIsOpen}
        onClose={() => handleToggleAddProjectModal()}
      >
        <CreateProjectForm handleModalClose={handleToggleAddProjectModal} />
      </AppModal>
      <AppModal
        title="Following"
        isOpen={followingModalIsOpen}
        onClose={() => handleToggleFollowingModal()}
      >
        <div className="p-4">
          <div className="space-y-4">
            {connectionsData?.following &&
              connectionsData?.following.map((follower: Connection) => {
                let hasFollowed = false;

                if (currentUser)
                  hasFollowed = (connectionsData.following || [])
                    .map((following: Connection) => following.profile_id)
                    .includes(follower.profile_id);

                return (
                  <div
                    key={follower.profile_id}
                    className="border-b border-b-gray-200 pb-4 last:border-0"
                  >
                    <ProfilePreviewCard
                      email={follower.email}
                      currentUserProfileId={currentUser?.profile?.id}
                      name={follower.first_name + " " + follower.last_name}
                      title={follower.title || ""}
                      profile_id={follower.profile_id}
                      user_id={follower.user_id}
                      avatar={
                        follower.avatar || "/images/profile-placeholder.png"
                      }
                      hasFollowed={hasFollowed}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </AppModal>
      <AppModal
        title="Followers"
        isOpen={followersModalIsOpen}
        onClose={() => handleToggleFollowersModal()}
      >
        <div className="p-4">
          <div className="space-y-4">
            {connectionsData?.followers &&
              connectionsData?.followers.map((follower: Connection) => {
                let hasFollowed = false;

                if (currentUser)
                  hasFollowed = (connectionsData.following || [])
                    .map((following: Connection) => following.profile_id)
                    .includes(follower.profile_id);
                return (
                  <div
                    key={follower.profile_id}
                    className="border-b border-b-gray-200 pb-4 last:border-0"
                  >
                    <ProfilePreviewCard
                      email={follower.email}
                      currentUserProfileId={currentUser?.profile?.id}
                      name={follower.first_name + " " + follower.last_name}
                      title={follower.title || ""}
                      profile_id={follower.profile_id}
                      user_id={follower.user_id}
                      avatar={
                        follower.avatar || "/images/profile-placeholder.png"
                      }
                      hasFollowed={hasFollowed}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </AppModal>
    </div>
  );
};

export default MainFeed;
