import * as React from "react"
// import { ChevronRight, File, Folder } from "lucide-react"
import { IconType } from 'react-icons'
import { LuFileText, LuSettings, LuLogOut } from 'react-icons/lu'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  changes: [
    {
      file: "README.md",
      state: "M",
    },
    {
      file: "api/hello/route.ts",
      state: "U",
    },
    {
      file: "app/layout.tsx",
      state: "M",
    },
  ],

  tree: [
    [
      "app",
      [
        "api",
        ["hello", ["route.ts"]],
        "page.tsx",
        "layout.tsx",
        ["blog", ["page.tsx"]],
      ],
    ],
    [
      "components",
      ["ui", "button.tsx", "card.tsx"],
      "header.tsx",
      "footer.tsx",
    ],
    ["lib", ["util.ts"]],
    ["public", ["favicon.ico", ["vercel.svg", "newfile.txt"]]],
    ".eslintrc.json",
    ".gitignore",
    "next.config.js",
    "tailwind.config.js",
    "package.json",
    "README.md",
  ],
}

// const newData = ['Orders', 'Costumers', 'Product']

type dataProps = {
  icon: IconType
  title: string
}

const newData: dataProps[] = [
  {
    icon: LuFileText,
    title: 'Orders'
  }, {
    icon: LuFileText,
    title: 'Costumers'
  },
  {
    icon: LuFileText,
    title: 'Product'
  }
]
const newDataFooter: dataProps[] = [
  {
    icon: LuSettings,
    title: 'Setting'
  },
  {
    icon: LuLogOut,
    title: 'Logout'
  }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard Admin</SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col h-[92vh] justify-between">
            <SidebarMenu>

              {newData.map((val, i) => (
                <SidebarMenuButton>
                  <LuFileText /> {val.title}
                </SidebarMenuButton>
              ))}

            </SidebarMenu>
            <SidebarMenu>

              {/* LuSettings */}

              {newDataFooter.map((val, i) => {
                const Icon = val.icon
                return (
                  <SidebarMenuButton
                    key={val.title + i}
                    variant={val.title === 'Logout' ? 'destructive' : undefined}
                  >
                    <Icon /> {val.title}
                  </SidebarMenuButton>
                )
              })}

            </SidebarMenu>
          </SidebarGroupContent>

        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}


// const  Tree({ item }: { item: string[] }) {
//   return (
//     <SidebarMenuButton
//       className="data-[active=true]:bg-transparent"
//     >
//       <File />
//       {item}
//     </SidebarMenuButton>
//   )
// }