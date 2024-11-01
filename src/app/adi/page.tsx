import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import WeekSummaryCard from "@/components/custom/WeekSummaryCard";
import DailyLogCard from "@/components/custom/DailyLogCard";
import Layout from "@/components/custom/Layout";

export default function UserAdi() {
	return (
		<Layout>
			<div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto space-y-8 p-6 md:p-8">
				<div className="flex flex-col items-center space-y-4">
					<Avatar className="w-24 h-24 border-4 border-primary">
						<AvatarImage
							src="https://res.cloudinary.com/djxfhec23/image/upload/v1730049245/General/adi-egg_pbucs1.jpg"
							alt="user-avatar"
						/>
						<AvatarFallback>AR</AvatarFallback>
					</Avatar>
					<div className="text-center">
						<h1 className="text-3xl font-bold">Adi</h1>
						<p className="text-muted-primary">Professional Snack Enthusiast</p>
					</div>
				</div>
				<div className="w-full space-y-4">
					{/* <h2 className="text-2xl font-bold">Weekly Macro Review</h2> */}
					<WeekSummaryCard />
				</div>
				<div className="w-full space-y-4">
					{/* <h2 className="text-2xl font-bold">Daily Log</h2> */}
					<DailyLogCard />
				</div>
			</div>
		</Layout>
	);
}
