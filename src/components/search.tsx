import { MoonIcon, Search, SidebarClose, SidebarOpen, SunIcon } from "lucide-react";

import useChatStore from "@/store/chat";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

function SearchChat() {
  const store = useChatStore();

  return (
    <div className="absolute top-0 flex space-x-4 pt-2">
      <Button onClick={() => store.handleCloseChange()} className="bg-white dark:bg-black hover:bg-zinc-100 dark:hover:bg-zinc-900 ">
        {store.isClose ? <SidebarOpen className="text-zinc-800 dark:text-zinc-200" /> : <SidebarClose className="text-zinc-800 dark:text-zinc-200" />}
      </Button>
      <Button onClick={() => store.handleDarkChange()} className="bg-white dark:bg-black hover:bg-zinc-100 dark:hover:bg-zinc-900 ">
        {store.isDark ? <SunIcon className="text-zinc-800 dark:text-zinc-200" /> : <MoonIcon className="text-zinc-800 dark:text-zinc-200" />}
      </Button>
      <div className="flex items-center justify-between w-full px-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-2xl">
        <Input
          value={store.search}
          onChange={e => store.handleSearchChange(e.target.value)}
          className="bg-zinc-100 dark:bg-zinc-900 border-none focus:outline-none focus:ring-0 focus-visible:ring-0 shadow-none"
          placeholder="Search..."
        />
        <Search />
      </div>
    </div>
  );
}

export default SearchChat;
