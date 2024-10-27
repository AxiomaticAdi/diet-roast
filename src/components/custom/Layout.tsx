import { ReactNode } from "react";
import { Flame } from "lucide-react";
import Link from "next/link";
interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<div className="flex flex-col min-h-screen">
			<header className="px-4 lg:px-6 h-14 flex items-center justify-center">
				<Link href="/" className="flex items-center">
					<Flame className="h-6 w-6 text-primary" />
					<span className="ml-2 text-2xl font-bold">DietRoast</span>
				</Link>
				{/* <nav className="ml-auto flex gap-4 sm:gap-6">
					<Button variant="ghost" className="text-md font-medium">
						Features
					</Button>
					<Button variant="ghost" className="text-md font-medium">
						Testimonials
					</Button>
					<Button variant="ghost" className="text-md font-medium">
						Pricing
					</Button>
				</nav> */}
			</header>

			<main className="flex-1">{children}</main>

			<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6 border-t">
				<p className="text-xs text-gray-500 dark:text-gray-400">
					© 2024 DietRoast. All rights reserved.
				</p>
				<nav className="sm:ml-auto flex gap-4 sm:gap-6">
					<a className="text-xs hover:underline underline-offset-4" href="#">
						Terms of Service
					</a>
					<a className="text-xs hover:underline underline-offset-4" href="#">
						Privacy
					</a>
				</nav>
			</footer>
		</div>
	);
}
