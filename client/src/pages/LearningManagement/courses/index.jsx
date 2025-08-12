import { CoursesPageComponent } from "../../../components/lms/courses/coursesPage";
import { CoursesProvider } from "../../../contextApis/lms/courses/coursesProvider";

export const CoursesPage = () => {
  return (
    <CoursesProvider>
      <CoursesPageComponent />
    </CoursesProvider>
  );
};
