import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import useChatStore from "@/store/chat";

function ModelSelector() {
	const store = useChatStore();

	return (
		<Select defaultValue={store.model} onValueChange={store.handleModelChange}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select a model" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="groq">Groq</SelectItem>
				<SelectItem value="gemini">Gemini</SelectItem>
				<SelectItem value="deepseek">Deepseek</SelectItem>
			</SelectContent>
		</Select>
	);
}

export default ModelSelector;
