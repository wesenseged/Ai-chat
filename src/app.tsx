import { useAuth, UserButton } from "@clerk/clerk-react";
import { GoogleGenAI } from "@google/genai";
import { useMutation, useQuery } from "convex/react";
import Groq from "groq-sdk";
import { ArrowUpCircle } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css"; // or any other theme

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { api } from "../convex/_generated/api";
import ChatLists from "./components/chats-list";
import ModelSelector from "./components/model-selector";
import SearchChat from "./components/search";
import { Button } from "./components/ui/button";
import { Skeleton } from "./components/ui/skeleton";
import { Textarea } from "./components/ui/textarea";
import useChatStore from "./store/chat";

function App() {
  const { userId } = useAuth();
  const store = useChatStore();
  const chats = useQuery(api.chats.get, { userId: userId! });
  const addChat = useMutation(api.chats.add);
  const chatRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const ai = useMemo(
    () => new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY }),
    [],
  );
  const groq = useMemo(
    () =>
      new Groq({
        apiKey: import.meta.env.VITE_GROQ_API_KEY,
        dangerouslyAllowBrowser: true,
      }),
    [],
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", store.isDark);
  }, [store.isDark]);

  const handleSubmit = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
    if (!store.question.trim()) 
return;

  store.handleSubmitChange(true); // Start loading

  try {
    if (store.model === "groq") {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: store.question,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });
      await addChat({
        ai: "groq",
        answer: chatCompletion.choices[0].message.content || "",
        question: store.question,
        userId: userId!,
      });
      store.handleAIResponseChange(
        chatCompletion.choices[0]?.message?.content || "",
      );
    }
    else if (store.model === "gemini") {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: store.question,
      });
      await addChat({
        ai: "gemin",
        answer: response.text!,
        question: store.question,
        userId: userId!,
      });
      store.handleAIResponseChange(response.text!);
    }
    store.handleQuestionChange("");
    store.handleSelectedChatChange("");
  } catch (error) {
        console.error(error);
  }
   finally {
    store.handleSubmitChange(false); // Stop loading
  }
  };
  console.log("convex is running");

  return (
    <div className="flex flex-row h-screen bg-zinc-100 dark:bg-zinc-900">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          style={{ width: 0 }}
          minSize={10}
          maxSize={25}
          defaultSize={20}
          className="bg-zinc-200 dark:bg-zinc-800 p-0 md:p-4 space-y-1 flex flex-col relative"
        >
          <SearchChat />
          {
            chats
              ? (
                <div className="overflow-x-scroll lg:overflow-x-hidden">
                  <ChatLists chats={chats!} title="Today" />
                  <ChatLists chats={chats!} title="Yesterday" />
                  <ChatLists chats={chats!} title="Previous 7 Days" />
                  <ChatLists chats={chats!} title="Previous 30 Days" />
                </div>
              )
              : (
                <div className="flex flex-col space-y-6 mt-20">
                  <Skeleton className="h-10 w-full bg-white dark:bg-zinc-500 rounded-lg" />
                  <Skeleton className="h-10 w-full bg-white dark:bg-zinc-500 rounded-lg" />
                  <Skeleton className="h-10 w-full bg-white dark:bg-zinc-500 rounded-lg" />
                  <Skeleton className="h-10 w-full bg-white dark:bg-zinc-500 rounded-lg" />
                  <Skeleton className="h-10 w-full bg-white dark:bg-zinc-500 rounded-lg" />
                </div>
              )
          }
          <div className="fixed md:absolute bottom-2 w-full flex flex-col md:flex-row justify-between items-center px-0 md:pr-6 ">
            <ModelSelector />
            <UserButton />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={80} className="relative">

          <div className="flex flex-col space-y-10 h-screen justify-center items-center overflow-y-scroll ">
            {!store.aiResponse && !store.selectedChat 
              ? (
<h1
  className="dark:text-white text-black absolute top-1/2 text-3xl mb-20"
>
                Ask anything?
</h1>
)
: (
            <div className="flex-1 w-full overflow-y-auto h-screen mb-20 px-4 ">
              {chats
                && chats
                  ?.filter((chat) => {
                    if (store.selectedChat) {
                      return chat._id === store.selectedChat;
                    }
                    else {
                      const creationDate = new Date(
                        Math.floor(chat._creationTime),
                      );
                      const today = new Date();
                      const creationDateStr = creationDate
                        .toISOString()
                        .split("T")[0];
                      const todayStr = today.toISOString().split("T")[0];

                      return creationDateStr === todayStr;
                    }
                  })
                  .map((chat) => {
                    return (
                      <div
                        key={chat._id}
                        ref={(el) => {
                          chatRefs.current[chat._id] = el;
                        }}
                        className="prose dark:prose-invert text-black dark:text-white w-11/12 md:w-9/12 flex flex-col space-y-4 py-6 mx-auto "
                      >
                        <h1 className="bg-zinc-200 mb-5 dark:bg-zinc-800 px-2 py-1 font-normal rounded-md text-sm self-end w-fit">
                          { chat.question }
                        </h1>
                        <Markdown rehypePlugins={[rehypeHighlight]}>
                          {chat.answer}
                        </Markdown>
                      </div>
                    );
                  })}
            </div>
          )}
            <div className="absolute bottom-0 left-0 w-full bg-zinc-100 dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-800 px-4 py-3 text-4xl flex items-center justify-center space-x-3 shadow-md">
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
                className="flex items-center w-full max-w-3xl rounded-xl bg-zinc-100 dark:bg-zinc-900 px-4 py-2"
              >
                <Textarea
                  placeholder="Ask me anything..."
                  value={store.question}
                  disabled={store.isSubmit}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey)
                      handleSubmit(e);
                  }}
                  onChange={e => store.handleQuestionChange(e.target.value)}
                  rows={1}
                  className="focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 shadow-none w-full resize-none bg-white dark:bg-zinc-900  border-none text-sm lg:text-xl text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
                />
                <Button
                  variant="ghost"
                  disabled={!store.question.trim() || store.isSubmit}
                  type="submit"
                  className="ml-2 p-1 text-zinc-700 dark:text-zinc-200 hover:text-black dark:hover:text-white"
                >
                 {store.isSubmit
? (
    <span className="animate-pulse text-sm">...</span>
  )
: (
    <ArrowUpCircle size={32} />
  )}
                </Button>
              </form>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default App;
