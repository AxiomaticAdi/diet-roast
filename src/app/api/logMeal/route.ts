// File: src/app/api/logMeal/route.ts

import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { MealResponse } from "@/types/mealTypes";
const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
	throw new Error("Missing OpenAI API key");
}

const openai = new OpenAI({
	apiKey: process.env.openaiApiKey!,
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

function parseOpenAiResponse(responseText: string): MealResponse {
	// Define default values
	const defaultRoast = "No roast available.";

	// Helper function to extract numerical values
	const extractNumber = (label: string): number => {
		const regex = new RegExp(`"${label}"\\s*:\\s*(\\d+)`, "i");
		const match = responseText.match(regex);
		if (match && match[1]) {
			const parsed = parseInt(match[1], 10);
			return isNaN(parsed) ? 0 : parsed;
		}
		return 99; // Default value if parsing fails
	};

	// Extract each field individually
	const calories = extractNumber("calories");
	const gramsCarbs = extractNumber("gramsCarbs");
	const gramsProtein = extractNumber("gramsProtein");
	const gramsFat = extractNumber("gramsFat");

	// Extract the roast text
	let mealRoast = defaultRoast;
	const roastRegex = /"roast"\s*:\s*"([^"]+)"/i;
	const roastMatch = responseText.match(roastRegex);
	if (roastMatch && roastMatch[1]) {
		mealRoast = roastMatch[1].trim();
	}

	return {
		mealStats: {
			calories,
			gramsCarbs,
			gramsProtein,
			gramsFat,
		},
		mealRoast,
	};
}
