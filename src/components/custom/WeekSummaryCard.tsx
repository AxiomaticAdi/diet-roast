import { Card } from "@/components/ui/card";

export default function WeekSummaryCard() {
	return (
		<Card className="bg-muted p-6 space-y-4">
			<div className="flex items-center justify-between">
				<div className="text-lg font-semibold">Daily Macro Averages</div>
				<div className="text-lg font-semibold text-muted-foreground">
					Yikes, Adi...
				</div>
			</div>
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
				Wow, Adi. I'm impressed. Impressed at how you managed to pack in enough
				carbs to feed a small village, while somehow forgetting that protein and
				fat are also important macros. Bravo on your impressive display of
				nutritional ignorance. Maybe try reading a book instead of following the
				latest celebrity diet trends, hmm?
			</div>
		</Card>
	);
}
