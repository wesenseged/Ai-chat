import { Search } from "lucide-react";

import useChatStore from "@/store/chat";

import { Input } from "./ui/input";

function SearchChat() {
  const store = useChatStore();

  return (
    <div className="absolute top-0 flex space-x-4 pt-2 z-50">
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
