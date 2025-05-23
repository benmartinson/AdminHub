import React from "react";

interface AppCardProps {
  appName: string;
  icon?: React.ReactNode;
}

const AppCard: React.FC<AppCardProps> = ({ appName, icon }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 text-center m-2 w-52 shadow-md">
      {icon && <div className="text-5xl mb-4">{icon}</div>}
      <h3 className="text-xl m-0">{appName}</h3>
    </div>
  );
};

export default AppCard;
