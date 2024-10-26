import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Cake, Coffee, UtensilsCrossed } from "lucide-react";
import { dailyLogs } from "@/lib/seed/dailyLogSeed";

export default function DailyLogCard() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Daily Log</CardTitle>
				<CardDescription>
					Prepare for a serving of truth, extra spicy
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Accordion type="single" collapsible className="w-full">
					{dailyLogs.map((log, index) => (
						<AccordionItem key={index} value={`item-${index}`}>
							<AccordionTrigger>
								<div className="flex items-center gap-4">
									<log.icon className="w-8 h-8 text-muted-foreground" />
									<div className="text-left">
										<h3 className="font-semibold">{log.date}</h3>
										<p className="text-sm text-muted-foreground italic">
											{log.review}
										</p>
									</div>
								</div>
							</AccordionTrigger>
							<AccordionContent>
								<div className="pl-12 space-y-2">
									<div className="flex items-center gap-2">
										<Coffee className="w-4 h-4" />
										<span className="font-medium">Breakfast:</span>{" "}
										{log.meals.breakfast}
									</div>
									<div className="flex items-center gap-2">
										<UtensilsCrossed className="w-4 h-4" />
										<span className="font-medium">Lunch:</span>{" "}
										{log.meals.lunch}
									</div>
									<div className="flex items-center gap-2">
										<UtensilsCrossed className="w-4 h-4" />
										<span className="font-medium">Dinner:</span>{" "}
										{log.meals.dinner}
									</div>
									<div className="flex items-center gap-2">
										<Cake className="w-4 h-4" />
										<span className="font-medium">Snacks:</span>{" "}
										{log.meals.snacks}
									</div>
								</div>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</CardContent>
		</Card>
	);
}
