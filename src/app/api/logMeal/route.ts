// File: src/app/api/logMeal/route.ts

import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const {
			mealType,
			mealDescription,
		}: { mealType: string; mealDescription: string } = await req.json();

		const prompt = `Analyze the following meal for calories and macros. Then, from the perspective of a sassy, sarcastic, and mean but always humorous diet coach: provide a scathing review of of the following food logs for a new client.\n\nMeal type: ${mealType}\nMeal description: ${mealDescription}\n\nOutput format:\n"calories": [number]\n"gramsCarbs": [number]\n"gramsProtein": [number]\n"gramsFat": [number]\n"roast": [roast text]\n`;

		const gptResponse = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [{ role: "user", content: prompt }],
			max_tokens: 150,
		});
		const responseText = gptResponse.choices[0]?.message.content?.trim();
		if (!responseText) {
			throw new Error("No response from OpenAI");
		}

		const result = parseOpenAiResponse(responseText);
		return NextResponse.json(result, { status: 200 });
	} catch (error) {
		console.error("Error processing request:", error);
		return NextResponse.json(
			{ error: "Failed to process meal" },
			{ status: 500 }
		);
	}
}

function parseOpenAiResponse(responseText: string) {
	const mealStatsRegex =
		/calories:\s*(\d+).*gramsCarbs:\s*(\d+).*gramsProtein:\s*(\d+).*gramsFat:\s*(\d+).*roast:\s*(.+)/is;
	const match = responseText.match(mealStatsRegex);

	if (!match) {
		throw new Error("Invalid response format from OpenAI");
	}

	return {
		mealStats: {
			calories: parseInt(match[1], 10),
			gramsCarbs: parseInt(match[2], 10),
			gramsProtein: parseInt(match[3], 10),
			gramsFat: parseInt(match[4], 10),
		},
		mealRoast: match[5].trim(),
	};
}
