import { ShiftMasterPage } from "../../../components/masters/shiftMasters/shiftMasterPage";
import { ShiftMasterProvider } from "../../../contextApis/masters/shiftMaster/shiftMasterProvider";

export const MasterShiftPage = () => {
  return (
    <ShiftMasterProvider>
      <ShiftMasterPage />
    </ShiftMasterProvider>
  );
};
