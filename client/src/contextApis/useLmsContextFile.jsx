import { useContext } from "react";

import { CoursesContext } from "./lms/courses/coursesContext";

// Use Courses Context
export const useCoursesMasterContext = () => {
  const context = useContext(CoursesContext);
  if (context === undefined) {
    throw new Error(
      "useCoursesMasterContext must be used within a CoursesProvider"
    );
  }
  return context;
};
