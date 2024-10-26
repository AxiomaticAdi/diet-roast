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
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!mealType || !mealDescription.trim()) {
			toast({
				title: "Error",
				description: "Please fill out both fields before submitting.",
				variant: "destructive",
			});
			return;
		}
		// Here you would typically send the data to your backend
		console.log({ mealType, mealDescription });
		// Clear the form after successful submission
		setMealType("");
		setMealDescription("");
		setIsSubmit(true);
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
		</Card>
	);
}
