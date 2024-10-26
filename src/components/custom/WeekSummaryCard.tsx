import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
	CardContent,
} from "@/components/ui/card";

export default function WeekSummaryCard() {
	return (
		<Card className="bg-muted">
			<CardHeader>
				<CardTitle>Weekly Macro Averages</CardTitle>
				<CardDescription>Yikes, Adi...</CardDescription>
			</CardHeader>
			<CardContent className="p-6 pt-0 space-y-4">
				<div className="grid grid-cols-3 gap-4 text-center">
					<div>
						<div className="text-4xl font-bold">142g</div>
						<div className="text-muted-foreground">Carbs</div>
					</div>
					<div>
						<div className="text-4xl font-bold">38g</div>
						<div className="text-muted-foreground">Protein</div>
					</div>
					<div>
						<div className="text-4xl font-bold">67g</div>
						<div className="text-muted-foreground">Fat</div>
					</div>
				</div>
				<div className="text-lg text-muted-foreground">
					Wow. I'm impressed. Impressed at how you managed to pack in enough
					carbs to feed a small village, while somehow forgetting that protein
					and fat are also important macros. Bravo on your impressive display of
					nutritional ignorance. Maybe try reading a book instead of following
					the latest celebrity diet trends, hmm?
				</div>
			</CardContent>
		</Card>
	);
}
