import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Flame, Utensils, Scale } from "lucide-react";
import { PieChart } from "@mui/x-charts/PieChart";
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
					<CardHeader className="flex flex-col items-center">
						<CardTitle className="flex items-center space-x-2">
							<Utensils className="w-6 h-6 text-red-500" />
							<span>Meal Overview</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-lg italic">{mealResponse.mealRoast}</p>
					</CardContent>
				</Card>
				<div className="grid grid-cols-1 gap-4">
					<Card className="flex flex-col">
						<CardHeader className="flex flex-col items-center">
							<div className="flex items-center space-x-2">
								<Flame className="w-6 h-6 text-red-500" />
								<CardTitle>Calories: {mealStats.calories}</CardTitle>
							</div>
							<CardDescription>
								Target: {recommendedValues.calories}
							</CardDescription>
						</CardHeader>
						<CardContent>
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
					<Card className="flex flex-col">
						<CardHeader className="flex flex-col items-center">
							<div className="flex items-center space-x-2">
								<Scale className="w-6 h-6 text-red-500" />
								<CardTitle>Macros</CardTitle>
							</div>
							<CardDescription>Target: 50% Protein</CardDescription>
						</CardHeader>
						<CardContent>
							<PieChart
								series={[
									{
										data: [
											{
												label: "Carbs",
												value: mealStats.gramsCarbs,
												color: "#EA4228",
											},
											{
												label: "Protein",
												value: mealStats.gramsProtein,
												color: "#A5E32B",
											},
											{
												label: "Fat",
												value: mealStats.gramsFat,
												color: "#E6D929",
											},
										],
										arcLabel: (item) => `${item.value}g`,
										highlightScope: { fade: "global", highlight: "item" },
										faded: {
											innerRadius: 30,
											additionalRadius: -30,
											color: "gray",
										},
										valueFormatter: (item: { value: number }) =>
											`${item.value}g`,
										innerRadius: 40,
										cornerRadius: 5,
									},
								]}
								height={200}
							/>
						</CardContent>
					</Card>
				</div>
			</CardContent>
		</Card>
	);
}
