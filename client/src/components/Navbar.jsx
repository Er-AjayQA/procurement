import { useSelector } from "react-redux";

export const Navbar = () => {
  const { assignedModules } = useSelector((state) => state.login);

  console.log(assignedModules);

  return (
    <div>
      <p>Navbar</p>
    </div>
  );
};
