import { format } from "date-fns";

export default function MessageBubble({ role, text, timestamp }: { role: string; text: string; timestamp?: Date }) {
	const isUser = role === "user";

	return (
		<div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
			<div
				className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl p-4 rounded-lg ${
					isUser ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-200 dark:bg-gray-700 rounded-bl-none"
				}`}
			>
				<p className="whitespace-pre-wrap">{text}</p>
				{timestamp && (
					<p className={`text-xs mt-1 ${isUser ? "text-blue-200" : "text-gray-500 dark:text-gray-400"}`}>
						{format(new Date(timestamp), "h:mm a")}
					</p>
				)}
			</div>
		</div>
	);
}
