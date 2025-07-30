import { useSelector } from "react-redux";

export const SidebarMenu = () => {
  const { assignedModules } = useSelector((state) => state.auth);

  return (
    <>
      <div>
        <p>Sidebar</p>
      </div>
    </>
  );
};
