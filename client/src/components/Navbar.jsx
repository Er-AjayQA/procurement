import { useEffect, useState } from "react";
import { moduleService } from "../services/rbac_services/service";

export const Navbar = () => {
  const [moduleList, setModuleList] = useState(null);

  // Get Module List
  const getAllModules = async () => {
    const data = await moduleService();

    setModuleList(data);
  };

  console.log(moduleList);

  // Use Effect
  useEffect(() => {
    getAllModules();
  }, []);

  return (
    <div>
      <p>Navbar</p>
    </div>
  );
};
