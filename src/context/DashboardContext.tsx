import { createContext } from "react";

const defaultDashboardContext = {
  editMode: false,
  dashboardId: "",
};

const DashboardContext = createContext(defaultDashboardContext);

export default DashboardContext;
