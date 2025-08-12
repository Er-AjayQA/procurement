import { CourseCategoryMasterPage } from "../../../components/masters/courseCategoryMasters/courseCategoryMasterPage";
import { CourseCategoryMasterProvider } from "../../../contextApis/courseCategoryMaster/courseCategoryMasterProvider";

export const MasterCourseCategoryPage = () => {
  return (
    <CourseCategoryMasterProvider>
      <CourseCategoryMasterPage />
    </CourseCategoryMasterProvider>
  );
};
