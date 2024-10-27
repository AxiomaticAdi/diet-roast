"use client";

import MealSubmitFormCard from "@/components/custom/MealSubmitFormCard";
import MealReportCard from "@/components/custom/MealReportCard";
import { useState } from "react";
import { MealResponse } from "@/types/mealTypes";
export default function SubmitPage() {
	const [mealType, setMealType] = useState("");
	const [mealDescription, setMealDescription] = useState("");
	const [isSubmit, setIsSubmit] = useState(false);
	const [mealResponse, setMealResponse] = useState<MealResponse | null>(null);

	return (
		<div className="flex flex-col justify-center items-center gap-4">
			<MealSubmitFormCard
				mealType={mealType}
				mealDescription={mealDescription}
				setMealType={setMealType}
				setMealDescription={setMealDescription}
				setIsSubmit={setIsSubmit}
				setMealResponse={setMealResponse}
			/>
			{isSubmit && mealResponse && (
				<MealReportCard mealResponse={mealResponse} />
			)}
		</div>
	);
}
