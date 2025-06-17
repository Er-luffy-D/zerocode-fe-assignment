import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import { VoiceButton } from "./VoiceBut";
import { exportChatAsJSON } from "../utils/exportChat";
import { Loader2, Send, Download } from "lucide-react";

export default function Chat() {
	const [messages, setMessages] = useState<{ role: string; text: string; timestamp: Date }[]>(() => {
		const saved = localStorage.getItem("chatMessages");
		return saved ? JSON.parse(saved) : [];
	});
	const [input, setInput] = useState("");
	const [isSending, setIsSending] = useState(false);
	const chatRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		localStorage.setItem("chatMessages", JSON.stringify(messages));
	}, [messages]);

	const sendMessage = async () => {
		if (!input.trim()) return;

		const userMsg = { role: "user", text: input, timestamp: new Date() };
		setIsSending(true);
		setMessages((msgs) => [...msgs, userMsg]);
		setInput("");

		// Simulate API call
		setTimeout(() => {
			const botMsg = {
				role: "bot",
				text: `I received your message: "${input}". This is a simulated response.`,
				timestamp: new Date(),
			};
			setMessages((msgs) => [...msgs, botMsg]);
			setIsSending(false);
		}, 1000);
	};

	useEffect(() => {
		chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
	}, [messages]);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	return (
		<div className="max-w-4xl mx-auto p-4 space-y-4">
			<div
				ref={chatRef}
				className="h-[70vh] overflow-y-auto p-4 space-y-4 bg-card border border-border rounded-lg shadow"
			>
				{messages.length === 0 ? (
					<div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
						<p>Start a conversation by sending a message</p>
					</div>
				) : (
					messages.map((m, i) => <MessageBubble key={i} role={m.role} text={m.text} timestamp={m.timestamp} />)
				)}
			</div>

			<div className="flex gap-2 items-center">
				<input
					className="flex-1 p-3 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Type a message..."
					disabled={isSending}
				/>

				<VoiceButton onTranscript={(text) => setInput(text)} disabled={isSending} />

				<button
					onClick={sendMessage}
					disabled={!input.trim() || isSending}
					className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isSending ? <Loader2 className="animate-spin" /> : <Send />}
				</button>

				<button
					onClick={() => exportChatAsJSON(messages)}
					className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
					title="Export chat"
				>
					<Download size={20} />
				</button>
			</div>
		</div>
	);
}
