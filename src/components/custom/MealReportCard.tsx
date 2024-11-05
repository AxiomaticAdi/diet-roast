import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Flame, Carrot, Beef, Croissant } from "lucide-react";
import { MealResponse } from "@/types/mealTypes";

import dynamic from "next/dynamic";
const GaugeComponent = dynamic(() => import("react-gauge-component"), {
	ssr: false,
});

// Assuming recommended values per meal for an average adult
const recommendedValues = {
	calories: 525,
	carbs: 25, // grams
	protein: 50, // grams
	fat: 25, // grams
};

interface MealReportCardProps {
	mealResponse: MealResponse | null;
}

export default function MealReportCard({ mealResponse }: MealReportCardProps) {
	if (!mealResponse) return null;

	const mealStats = mealResponse.mealStats;

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
				<div className="grid grid-cols-1 gap-4">
					<Card>
						<CardHeader className="flex flex-row items-center space-x-2">
							<Flame className="w-6 h-6 text-red-500" />
							<CardTitle>Calories</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{mealStats.calories} / {recommendedValues.calories}
							</div>
							<GaugeComponent
								type="semicircle"
								minValue={0}
								maxValue={1000}
								value={mealStats.calories}
								labels={{
									valueLabel: {
										hide: true,
									},
									tickLabels: {
										hideMinMax: true,
										defaultTickLineConfig: {
											hide: false,
										},
										defaultTickValueConfig: {
											hide: false,
										},
									},
								}}
								arc={{
									subArcs: [
										{ length: 0.1, color: "#EA4228" },
										{ length: 0.1, color: "#E88F29" },
										{ length: 0.1, color: "#E6D929" },
										{ length: 0.1, color: "#A5E32B" },
										{ length: 0.1, color: "#5BE12C" },
										{ length: 0.1, color: "#A5E32B" },
										{ length: 0.1, color: "#E6D929" },
										{ length: 0.1, color: "#E88F29" },
										{ length: 0.1, color: "#EA4228" },
									],
									padding: 0.02,
									width: 0.3,
								}}
								pointer={{
									animationDelay: 500,
									animationDuration: 5000,
								}}
							/>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center space-x-2">
							<Carrot className="w-6 h-6 text-orange-500" />
							<CardTitle>Carbs: {mealStats.gramsCarbs}g</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{mealStats.gramsCarbs}g / {recommendedValues.carbs}g
							</div>
							<GaugeComponent
								type="semicircle"
								minValue={0}
								maxValue={50}
								value={mealStats.gramsCarbs}
								labels={{
									valueLabel: {
										hide: true,
									},
									tickLabels: {
										hideMinMax: true,
										type: "inner",
										ticks: [
											{ value: 200 },
											{ value: 400 },
											{ value: 600 },
											{ value: 800 },
										],
										defaultTickLineConfig: {
											hide: false,
										},
										defaultTickValueConfig: {
											hide: true,
										},
									},
								}}
								arc={{
									colorArray: ["#5BE12C", "#FFFF00", "#EA4228"],
									subArcs: [
										{ length: 0.25 },
										{ length: 0.25 },
										{ length: 0.25 },
										{ length: 0.25 },
										{ length: 0.25 },
									],
									padding: 0.02,
									width: 0.3,
								}}
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
							<GaugeComponent
								type="semicircle"
								minValue={0}
								maxValue={50}
								value={mealStats.gramsProtein}
								labels={{
									valueLabel: {
										hide: true,
									},
									tickLabels: {
										hideMinMax: true,
										type: "inner",
										ticks: [
											{ value: 10 },
											{ value: 20 },
											{ value: 30 },
											{ value: 40 },
										],
										defaultTickLineConfig: {
											hide: false,
										},
										defaultTickValueConfig: {
											hide: true,
										},
									},
								}}
								arc={{
									colorArray: ["#EA4228", "#FFFF00", "#5BE12C"],
									subArcs: [
										{ length: 0.25 },
										{ length: 0.25 },
										{ length: 0.25 },
										{ length: 0.25 },
										{ length: 0.25 },
									],
									padding: 0.02,
									width: 0.3,
								}}
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
							<GaugeComponent
								type="semicircle"
								minValue={0}
								maxValue={50}
								value={mealStats.gramsFat}
								labels={{
									valueLabel: {
										hide: true,
									},
									tickLabels: {
										hideMinMax: true,
										type: "inner",
										ticks: [
											{ value: 10 },
											{ value: 20 },
											{ value: 30 },
											{ value: 40 },
										],
										defaultTickLineConfig: {
											hide: false,
										},
										defaultTickValueConfig: {
											hide: true,
										},
									},
								}}
								arc={{
									colorArray: ["#5BE12C", "#FFFF00", "#EA4228"],
									subArcs: [
										{ length: 0.25 },
										{ length: 0.25 },
										{ length: 0.25 },
										{ length: 0.25 },
										{ length: 0.25 },
									],
									padding: 0.02,
									width: 0.3,
								}}
							/>
						</CardContent>
					</Card>
				</div>
			</CardContent>
		</Card>
	);
}
