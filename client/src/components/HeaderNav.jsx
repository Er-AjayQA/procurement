import { useSelector } from "react-redux";

export const HeaderNav = () => {
  const { assignedModules } = useSelector((state) => state.login);

  console.log(assignedModules);

  return (
    <div>
      <p>Navbar</p>
    </div>
  );
};
