import React from "react";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

import HomeAuthControls from "@/components/ui/HomeAuthControls";
import HomeNav from "@/components/ui/HomeNav";

const riderText = [
  "Connecting you with the finest talent globally",
  "Connect with innovators and bring your ideas to life",
  "Unlock career-defining opportunities with top professionals",
  "Discover exciting collaborations and make an impact",
  "Build your dream team and achieve success together",
  "Explore job openings that match your passion and expertise",
  "Create, collaborate, and grow in a thriving professional network",
  "Elevate your career by working with industry-leading talent",
  "Turn your ideas into reality with the right connections",
  "Find the perfect team for your next big project",
];

interface HomeProps {
  searchParams: Record<string, string>;
  params: { slug?: string[] };
}

const Home: React.FC<HomeProps> = ({ searchParams, params }) => {
  const riderTextDisplayIndex = Math.floor(Math.random() * 10);
  const actionParam = searchParams?.action;
  const pathname = `/${params?.slug?.join("/") || ""}`;

  return (
    <>
      <div className="w-full h-screen overflow-hidden">
        <header className="w-full h-screen flex flex-col py-[3.5vw] px-[3vw] bg-white">
          <div className="flex flex-1">
            <div className="w-full lg:w-1/2 h-full px-[2.5vw]">
              <HomeNav actionParam={actionParam} pathname={pathname} />
              <div className="h-full flex justify-center items-center">
                <div className="">
                  <div className="text-md px-[0.1vw] rounded flex space-x-1">
                    <span>{riderText[riderTextDisplayIndex]}</span>
                    <Image
                      src="/icons/work-color.svg"
                      width={15}
                      height={15}
                      alt="work"
                    />
                  </div>
                  <div className="w-full text-3xl lg:text-4xl xl:text-5xl font-bold mt-[0.2vw] mb-[2vw] text-gray-800">
                    Join <span className="text-blue-700">CollabHub</span> to{" "}
                    <br />
                    discover top talent
                    <br />
                    collaborate on projects
                    <br />
                    and unlock opportunities
                  </div>
                  <div className="mb-[1vw] text-gray-600 w-5/6 text-sm sm:text-base lg:text-lg">
                    Connect with professionals, explore exciting projects, and
                    find your next career move in one dynamic platform
                    <Image
                      src="/icons/celebration.svg"
                      width={16}
                      height={16}
                      alt="work"
                      className="ml-1 -mt-1 inline"
                    />
                  </div>
                  <div className="mt-4 md:mt-6">
                    <HomeAuthControls />
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block flex-1 h-full">
              <div className="flex flex-col bg-blue-700 h-full rounded-2xl p-[2.5vw]">
                <div className="flex-1 flex flex-col justify-between">
                  {[
                    {
                      title: "Connect with Developers",
                      description:
                        "Find and collaborate with talented developers worldwide.",
                      icon: "/icons/connection.svg",
                    },
                    {
                      title: "Post Your Projects",
                      description:
                        "Share your projects and attract collaborators with ease.",
                      icon: "/icons/home-projects.svg",
                    },
                    {
                      title: "Find Your Perfect Team",
                      description:
                        "Discover like-minded devs to help you bring ideas to life.",
                      icon: "/icons/team.svg",
                    },
                    {
                      title: "Get Real-Time Feedback",
                      description:
                        "Receive instant insights from a community of experts.",
                      icon: "/icons/home-feedback.svg",
                    },
                    {
                      title: "Showcase Your Skills",
                      description:
                        "Highlight your expertise and stand out in the dev community.",
                      icon: "/icons/work.svg",
                    },
                    {
                      title: "Explore New Opportunities",
                      description:
                        "Work on exciting projects that match your passion and skills.",
                      icon: "/icons/global.svg",
                    },
                    {
                      title: "Grow Together",
                      description:
                        "Collaborate, learn, and thrive with a network of innovators.",
                      icon: "/icons/growth.svg",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex rounded-lg border bg-blue-600 text-white font-medium p-[1vw] items-center"
                    >
                      <div className="w-[2vw] h-[2vw] flex justify-center items-center bg-blue-700 mr-[1vw] rounded-lg p-[0.3vw]">
                        <div className="relative w-full h-full">
                          <Image
                            src={item.icon}
                            alt=""
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="mb-[0.1vw] font-medium">
                          {item.title}
                        </div>
                        <div className="font-light text-sm">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
      <Toaster />
    </>
  );
};

export default Home;
