"use client";

import MealSubmitFormCard from "@/components/custom/MealSubmitFormCard";
import { useState } from "react";

export default function SubmitPage() {
	const [mealType, setMealType] = useState("");
	const [mealDescription, setMealDescription] = useState("");
	const [isSubmit, setIsSubmit] = useState(false);

	return (
		<div className="flex justify-center items-center h-screen">
			<MealSubmitFormCard
				mealType={mealType}
				mealDescription={mealDescription}
				setMealType={setMealType}
				setMealDescription={setMealDescription}
				setIsSubmit={setIsSubmit}
			/>
			{isSubmit && <div>Submitted</div>}
		</div>
	);
}
