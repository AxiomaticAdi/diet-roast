import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Carrot, Beef, Croissant } from "lucide-react";
import { MealResponse } from "@/types/mealTypes";

// Assuming recommended values per meal for an average adult
const recommendedValues = {
	calories: 660,
	carbs: 80, // grams
	protein: 40, // grams
	fat: 20, // grams
};

interface MealReportCardProps {
	mealResponse: MealResponse | null;
}

export default function MealReportCard({ mealResponse }: MealReportCardProps) {
	if (!mealResponse) return null;

	const mealStats = mealResponse.mealStats;
	const getProgressColor = (current: number, max: number) => {
		const percentage = (current / max) * 100;
		if (percentage > 100) return "bg-red-500";
		if (percentage > 75) return "bg-yellow-500";
		return "bg-green-500";
	};

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle className="text-2xl font-bold">
					Nutritional Disaster Report
				</CardTitle>
				<CardDescription>
					Brace yourself for the cold, hard truth
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Flame className="w-6 h-6 text-red-500" />
							<span>Meal Overview</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-lg italic">{mealResponse.mealRoast}</p>
					</CardContent>
				</Card>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Card>
						<CardHeader className="flex flex-row items-center space-x-2">
							<Flame className="w-6 h-6 text-red-500" />
							<CardTitle>Calories</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{mealStats.calories} / {recommendedValues.calories}
							</div>
							<Progress
								value={(mealStats.calories / recommendedValues.calories) * 100}
								className={`h-2 mt-2 ${getProgressColor(
									mealStats.calories,
									recommendedValues.calories
								)}`}
							/>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center space-x-2">
							<Carrot className="w-6 h-6 text-orange-500" />
							<CardTitle>Carbs</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{mealStats.gramsCarbs}g / {recommendedValues.carbs}g
							</div>
							<Progress
								value={(mealStats.gramsCarbs / recommendedValues.carbs) * 100}
								className={`h-2 mt-2 ${getProgressColor(
									mealStats.gramsCarbs,
									recommendedValues.carbs
								)}`}
							/>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center space-x-2">
							<Beef className="w-6 h-6 text-red-700" />
							<CardTitle>Protein</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{mealStats.gramsProtein}g / {recommendedValues.protein}g
							</div>
							<Progress
								value={
									(mealStats.gramsProtein / recommendedValues.protein) * 100
								}
								className={`h-2 mt-2 ${getProgressColor(
									mealStats.gramsProtein,
									recommendedValues.protein
								)}`}
							/>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center space-x-2">
							<Croissant className="w-6 h-6 text-yellow-500" />
							<CardTitle>Fat</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{mealStats.gramsFat}g / {recommendedValues.fat}g
							</div>
							<Progress
								value={(mealStats.gramsFat / recommendedValues.fat) * 100}
								className={`h-2 mt-2 ${getProgressColor(
									mealStats.gramsFat,
									recommendedValues.fat
								)}`}
							/>
						</CardContent>
					</Card>
				</div>
			</CardContent>
		</Card>
	);
}
