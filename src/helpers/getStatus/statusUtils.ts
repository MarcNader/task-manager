export const getStatusColor = (status: string): string => {
  const baseClass = "ml-[5px] font-[Arial] flex items-center";
  switch (status) {
    case "To Do":
      return `${baseClass} text-gray-500`;
    case "In Progress":
      return `${baseClass} text-orange-500`;
    case "Done":
      return `${baseClass} text-green-500`;
    default:
      return baseClass;
  }
};
