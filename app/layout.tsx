import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Link from "next/link";
import NavList from "@/components/nav-list";
import ThemeSwitcher from "@/components/theme-switcher";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import PhoneNav from "@/components/phone-nav";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})
export const metadata: Metadata = {
    title: {
        template: '%s | Video tools',
        default: "Video tools",
    },
    description: "A set of tools for converting video and audio.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(
                "min-h-svh font-sans antialiased flex flex-col",
                fontSans.variable
            )}>
                <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem={true}
                disableTransitionOnChange={true}
                >
                    <div className="w-full sticky top-0 bg-background border-b border-border">
                        <nav className="w-full max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
                            <Link href="/" className="text-2xl font-bold text-foreground">Video tools</Link>
                            <NavList />
                            <PhoneNav />
                        </nav>
                    </div>
                    {children}
                    <footer className="w-full max-w-5xl mx-auto px-6 py-12 border-t border-border mt-auto flex items-center flex-wrap gap-4">
                        <div className="flex gap-2 items-center flex-wrap">
                            <a href="https://github.com/JoarM/video-tools">
                                <GitHubLogoIcon
                                className="size-5"
                                />
                                <span className="sr-only">Source code</span>
                            </a>
                            <p className="text-sm font-medium">Video tools developed by <a href="https://joar.vercel.app" className="underline underline-offset-4">Joar Maltesson</a></p>
                        </div>
                        <ThemeSwitcher 
                        className="ml-auto hidden md:block"
                        />
                    </footer>
                </ThemeProvider>
            </body>
        </html>
    );
}