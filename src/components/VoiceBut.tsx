import { Mic, MicOff } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export function VoiceButton({ onTranscript, disabled }: { onTranscript: (text: string) => void; disabled?: boolean }) {
	const [isListening, setIsListening] = useState(false);

	const handleVoice = () => {
		if (disabled) return;

		if (!("webkitSpeechRecognition" in window)) {
			toast.error("Speech recognition not supported in your browser");
			return;
		}

		const recognition = new (window as any).webkitSpeechRecognition();
		recognition.continuous = false;
		recognition.interimResults = false;
		recognition.lang = "en-US";

		recognition.onstart = () => {
			setIsListening(true);
			toast("Listening...", { icon: "🎤" });
		};

		recognition.onresult = (e: any) => {
			const transcript = e.results[0][0].transcript;
			onTranscript(transcript);
		};

		recognition.onerror = (e: any) => {
			toast.error("Error occurred in recognition: " + e.error);
		};

		recognition.onend = () => {
			setIsListening(false);
		};

		recognition.start();
	};

	return (
		<button
			onClick={handleVoice}
			disabled={disabled}
			className={`p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
				isListening
					? "bg-purple-600 text-white"
					: "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
			} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
			title="Voice input"
		>
			{isListening ? <MicOff size={20} /> : <Mic size={20} />}
		</button>
	);
}
