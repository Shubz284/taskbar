import { Outlet } from "react-router";
import Header from "./Header";
import AppSidebar from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <div className="bg-[#f1f5f9] flex flex-col flex-1 overflow-hidden">
          <div className=" flex items-center gap-3">
            <SidebarTrigger className="flex justify-start cursor-pointer" />
            <div className="flex-1 flex items-center justify-between">
              <div className="text-lg font-bold">Todo</div>
              <div className="flex gap-5 items-center">
                <Header />
              </div>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
