import { create } from "zustand";

type ChatState = {
	model: string;
	isDark: boolean;
	isClose: boolean;
	isSubmit: boolean;
	selectedChat: string;
	aiResponse: string;
	search: string;
	question: string;
	handleModelChange: (model: string) => void;
	handleDarkChange: () => void;
	handleCloseChange: () => void;
	handleSubmitChange: (value: boolean) => void;
	handleSelectedChatChange: (selectedChat: string) => void;
	handleAIResponseChange: (aiResponse: string) => void;
	handleSearchChange: (search: string) => void;
	handleQuestionChange: (question: string) => void;
};

const useChatStore = create<ChatState>()((set) => ({
	// select AI model
	model: "groq",
	handleModelChange: (model: string) => set(() => ({ model })),

	// Select dark mode
	isDark: true,
	handleDarkChange: () => set((state) => ({ isDark: !state.isDark })),

	// Toggle sidebar
	isClose: false,
	handleCloseChange: () => set((state) => ({ isClose: !state.isClose })),

	// Loading state
	isSubmit: false,
	handleSubmitChange: (value: boolean) => set(() => ({ isSubmit: value })),

	// Select chat
	selectedChat: "",
	handleSelectedChatChange: (selectedChat: string) =>
		set(() => ({ selectedChat })),

	// Select AI response
	aiResponse: "",
	handleAIResponseChange: (aiResponse: string) => set(() => ({ aiResponse })),

	// Search chat
	search: "",
	handleSearchChange: (search: string) => set(() => ({ search })),

	// Select question
	question: "",
	handleQuestionChange: (question: string) => set(() => ({ question })),
}));

export default useChatStore;
