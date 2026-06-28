// import { NotebookTabs } from "lucide-react";
// import { ListChevronsDownUp } from "lucide-react";

// const Sidebar = () => {
//   return (
//     <div className="border h-full shadow-md w-72 shrink-0">
//       <div className="w-64 flex  items-center m-5 gap-2">
//         <NotebookTabs color="#8cc3fa" />
//         <h3 className="font-bold text-[#0c447b] text-xl">Taskify</h3>
//       </div>
//       <div className="m-5 hover:bg-slate-200 flex justify-between cursor-pointer items-center p-1 rounded-lg">
//         <div className="flex justify-center items-center gap-2">
//           <ListChevronsDownUp size={15} />
//           <label className="text-md font-medium">Todo List</label>
//         </div>
//         <select className="cursor-pointer">Todo List</select>
//       </div>
//     </div>
//   );
// }

// export default Sidebar

import { ListTodo, NotebookTabs } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";

// Menu items.
const items = [
  {
    title: "Todos",
    url: "#",
    icon: ListTodo,
  },
];

export default function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="w-64 flex  items-center  gap-2">
              <NotebookTabs color="#8cc3fa" />
              <h3 className="font-bold text-[#0c447b] text-xl">Taskify</h3>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-5">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === "/dashboard"}
                  >
                    <Link to="/dashboard">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
