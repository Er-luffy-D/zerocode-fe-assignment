export const exportChatAsJSON = (chat: { role: string; text: string; timestamp?: Date }[]) => {
	const dateStr = new Date().toISOString().replace(/[:.]/g, "-");
	const filename = `chat_export_${dateStr}.json`;

	const data = {
		metadata: {
			exportedAt: new Date().toISOString(),
			messageCount: chat.length,
		},
		messages: chat.map((m) => ({
			...m,
			timestamp: m.timestamp ? new Date(m.timestamp).toISOString() : undefined,
		})),
	};

	const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
};
