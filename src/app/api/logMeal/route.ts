import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { MealResponse } from "@/types/mealTypes";

const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
	throw new Error("Missing OpenAI API key");
}

const openai = new OpenAI({
	apiKey: openaiApiKey,
});

const MealAnalysis = z.object({
	calories: z.number(),
	gramsCarbs: z.number(),
	gramsProtein: z.number(),
	gramsFat: z.number(),
	mealRoast: z.string(),
});

export async function POST(req: NextRequest): Promise<NextResponse> {
	let mealType: string;
	let mealDescription: string;

	try {
		const body = await req.json();
		mealType = body.mealType;
		mealDescription = body.mealDescription;

		if (!mealType || !mealDescription) {
			return NextResponse.json(
				{ error: "Missing required fields: mealType and mealDescription" },
				{ status: 400 }
			);
		}
	} catch (error) {
		console.error("Failed to parse request body:", error);
		return NextResponse.json(
			{ error: "Invalid request body" },
			{ status: 400 }
		);
	}

	try {
		const completion = await openai.beta.chat.completions.parse({
			model: "gpt-4o-mini",
			messages: [
				{
					role: "system",
					content: [
						"You are a diet coach with a sassy, sarcastic, and mean but always humorous personality.",
						"Analyze the meal and provide:",
						"- Estimated calories",
						"- Macronutrient breakdown in grams (carbs, protein, fat)",
						"- A short, sarcastic roast of their meal choice",
					].join("\n"),
				},
				{
					role: "user",
					content: [
						`Meal type: ${mealType}`,
						`Meal description: ${mealDescription}`,
					].join("\n"),
				},
			],
			response_format: zodResponseFormat(MealAnalysis, "mealAnalysis"),
		});

		const parsedResponse = completion.choices[0].message.parsed;
		const rawResponseString = completion.choices[0].message.content || "";

		if (
			!parsedResponse?.calories ||
			!parsedResponse?.gramsCarbs ||
			!parsedResponse?.gramsProtein ||
			!parsedResponse?.gramsFat ||
			!parsedResponse?.mealRoast
		) {
			throw new Error("Missing required fields in the OpenAI response");
		}

		const mealResponse: MealResponse = {
			mealStats: {
				calories: parsedResponse?.calories,
				gramsCarbs: parsedResponse?.gramsCarbs,
				gramsProtein: parsedResponse?.gramsProtein,
				gramsFat: parsedResponse?.gramsFat,
			},
			mealRoast: parsedResponse?.mealRoast,
			rawResponseString: rawResponseString,
		};

		return NextResponse.json(mealResponse, { status: 200 });
	} catch (error) {
		console.error("Failed to process meal analysis:", error);
		return NextResponse.json(
			{ error: `Failed to analyze meal: ${error}` },
			{ status: 500 }
		);
	}
}
