export type MealStats = {
	calories: number;
	gramsCarbs: number;
	gramsProtein: number;
	gramsFat: number;
};

export type MealResponse = {
	mealStats: MealStats;
	mealRoast: string;
};
