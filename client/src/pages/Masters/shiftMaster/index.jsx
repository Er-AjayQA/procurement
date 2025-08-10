import { ShiftMasterPage } from "../../../components/masters/shiftMasters/shiftMasterPage";
import { ShiftMasterProvider } from "../../../contextApis/shiftMaster/shiftMasterProvider";

export const MasterShiftPage = () => {
  return (
    <ShiftMasterProvider>
      <ShiftMasterPage />
    </ShiftMasterProvider>
  );
};
