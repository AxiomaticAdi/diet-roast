import Layout from "@/components/custom/Layout";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Carrot, Flame, Scale } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
	return (
		<Layout>
			{/* Hero Section */}
			<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
				<div className="container px-4 md:px-6 mx-auto text-center">
					<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
						Get Roasted For Eating Toast
					</h1>
					<p className="mx-auto max-w-2xl text-gray-500 md:text-xl dark:text-gray-400 mt-4">
						Track your macros, endure our mockery, and{" "}
						<span className="font-bold italic">maybe</span> lose some weight
						along the way. Or don&apos;t, you fuck.
					</p>
					<div className="mt-6 flex justify-center space-x-4">
						<Link href="/adi">
							<Button className="flex items-center">
								Check it out <ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</Link>
						<Link href="/submit">
							<Button variant="outline">Try demo meal submit (WIP)</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
				<div className="container px-4 md:px-6 mx-auto">
					<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
						Features That&apos;ll Make You Cry
					</h2>
					<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
						<Card className="flex flex-col items-center text-center">
							<CardHeader className="flex flex-col items-center">
								<Scale className="h-14 w-14 mb-4 text-primary" />
								<CardTitle>Brutal Honesty</CardTitle>
								<CardDescription>
									No sugarcoating. That just adds more calories.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="flex flex-col items-center text-center">
							<CardHeader className="flex flex-col items-center">
								<Flame className="h-14 w-14 mb-4 text-primary" />
								<CardTitle>Calorie Cremation</CardTitle>
								<CardDescription>
									Burn your excuses and your love handles.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="flex flex-col items-center text-center">
							<CardHeader className="flex flex-col items-center">
								<Carrot className="h-14 w-14 mb-4 text-primary" />
								<CardTitle>Veggie Vengeance</CardTitle>
								<CardDescription>
									Ignore your greens? Prepare for mean.
								</CardDescription>
							</CardHeader>
						</Card>
					</div>
				</div>
			</section>
		</Layout>
	);
}
