import { Profile, Project } from "@/common/constants";
import { ReactNode } from "react";

interface IContentWrapperProps {
  dataLength: number;
  children: ReactNode;
}

const ContentWrapper: React.FC<IContentWrapperProps> = ({
  dataLength,
  children,
}) => {
  return (
    <div
      className={`w-full grid ${
        dataLength === 1 ? "!grid-cols-1" : ""
      } grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3 md:gap-5`}
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
