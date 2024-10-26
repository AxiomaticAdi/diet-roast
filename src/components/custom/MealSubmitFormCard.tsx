"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Coffee, UtensilsCrossed, Cake } from "lucide-react";
import { useState } from "react";
interface MealSubmitFormCardProps {
	mealType: string;
	mealDescription: string;
	setMealType: (value: string) => void;
	setMealDescription: (value: string) => void;
	setIsSubmit: (value: boolean) => void;
}

export default function MealSubmitFormCard({
	mealType,
	mealDescription,
	setMealType,
	setMealDescription,
	setIsSubmit,
}: MealSubmitFormCardProps) {
	const [responseText, setResponseText] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!mealType || !mealDescription.trim()) {
			toast({
				title: "Error",
				description: "Please fill out both fields before submitting.",
				variant: "destructive",
			});
			return;
		}

		try {
			const response = await fetch("/api/logMeal", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ mealType, mealDescription }),
			});

			if (!response.ok) {
				throw new Error("Failed to log meal");
			}

			const result = await response.json();
			console.log("Meal logged successfully:", result);
			setResponseText(result);

			// Clear the form after successful submission
			setMealType("");
			setMealDescription("");
			setIsSubmit(true);

			toast({
				title: "Success",
				description: "Meal logged successfully!",
				variant: "default",
			});
		} catch (error) {
			console.error("Error logging meal:", error);
			toast({
				title: "Error",
				description: "Failed to log meal. Please try again.",
				variant: "destructive",
			});
		}
	};

	const handleClear = () => {
		setMealType("");
		setMealDescription("");
	};

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle>Log Your Culinary Crimes</CardTitle>
				<CardDescription>Receive the judgement you deserve.</CardDescription>
			</CardHeader>
			<form onSubmit={handleSubmit}>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<label
							htmlFor="meal-type"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Meal Type
						</label>
						<Select value={mealType} onValueChange={setMealType}>
							<SelectTrigger id="meal-type">
								<SelectValue placeholder="Select a meal type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="breakfast">
									<div className="flex items-center">
										<Coffee className="mr-2 h-4 w-4" />
										Breakfast
									</div>
								</SelectItem>
								<SelectItem value="lunch">
									<div className="flex items-center">
										<UtensilsCrossed className="mr-2 h-4 w-4" />
										Lunch
									</div>
								</SelectItem>
								<SelectItem value="dinner">
									<div className="flex items-center">
										<UtensilsCrossed className="mr-2 h-4 w-4" />
										Dinner
									</div>
								</SelectItem>
								<SelectItem value="snack">
									<div className="flex items-center">
										<Cake className="mr-2 h-4 w-4" />
										Snack
									</div>
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<label
							htmlFor="meal-description"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Meal Description
						</label>
						<Textarea
							id="meal-description"
							placeholder="Describe your dietary disaster in excruciating detail..."
							value={mealDescription}
							onChange={(e) => setMealDescription(e.target.value)}
							className="min-h-[100px]"
						/>
					</div>
				</CardContent>
				<CardFooter className="flex justify-between gap-2">
					<Button type="button" variant="outline" onClick={handleClear}>
						Clear Evidence
					</Button>
					<Button type="submit">Submit for Judgment</Button>
				</CardFooter>
			</form>
			{responseText && <div>{responseText}</div>}
		</Card>
	);
}
