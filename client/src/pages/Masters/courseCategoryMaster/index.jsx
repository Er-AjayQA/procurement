import { CourseCategoryMasterPage } from "../../../components/masters/courseCategoryMasters/courseCategoryMasterPage";
import { CourseCategoryMasterProvider } from "../../../contextApis/masters/courseCategoryMaster/courseCategoryMasterProvider";

export const MasterCourseCategoryPage = () => {
  return (
    <CourseCategoryMasterProvider>
      <CourseCategoryMasterPage />
    </CourseCategoryMasterProvider>
  );
};
