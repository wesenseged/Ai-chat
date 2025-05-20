import { useMutation } from "convex/react";
import { Trash } from "lucide-react";
import { useRef } from "react";

import type { Doc } from "convex/_generated/data-model";

import useChatStore from "@/store/chat";

import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";

type Chat = Doc<"chats">;

function getDateStr(offsetDays: number) {
  const date = new Date();
  date.setDate(date.getDate() - offsetDays);
  return date.toISOString().split("T")[0];
}

function isInRange(chatDate: string, title: string) {
  const todayStr = getDateStr(0);
  const yesterdayStr = getDateStr(1);
  const twoDaysAgoStr = getDateStr(2);
  const sevenDaysAgoStr = getDateStr(7);
  const eightDaysAgoStr = getDateStr(8);

  switch (title) {
    case "Yesterday":
      return chatDate === yesterdayStr;
    case "Previous 7 Days":
      return chatDate <= twoDaysAgoStr && chatDate >= sevenDaysAgoStr;
    case "Previous 30 Days":
      return chatDate <= eightDaysAgoStr;
    default: // "Today"
      return chatDate === todayStr;
  }
}

function ChatLists(props: { chats: Chat[]; title: string }) {
  const store = useChatStore();
  const deleteChat = useMutation(api.chats.deleteChat);
  const chatRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  return (
    <div className="flex flex-col mt-10 text-sm font-normal md:font-semibold">
      <h1 className="text-black dark:text-white mb-5">{props.title}</h1>
      {props.chats && props.chats?.filter((chat) => {
        if (store.search) {
          return chat.question.toLowerCase().includes(store.search.toLowerCase());
        }
        else {
          return isInRange(new Date(chat._creationTime).toISOString().split("T")[0], props.title);
        }
      },
      ).map(chat => (
        <div key={chat._id} className="text-white flex items-center py-1 rounded-sm">
          <Button
            variant="destructive"
            onClick={() => {
              deleteChat({ id: chat._id });
            }}
            className=""
          >
            <Trash />
          </Button>
          <Button
            onClick={() => {
              store.handleSelectedChatChange(chat._id);
              chatRefs.current[chat._id]?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="w-full text-left bg-white text-black dark:bg-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 justify-start text-sm font-thin flex overflow-hidden "
          >
            <h1>{chat.answer}</h1>
          </Button>
        </div>
      ))}
    </div>
  );
}

export default ChatLists;
