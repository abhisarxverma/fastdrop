"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Share2, Shield } from "lucide-react";
import { AppHeader } from "@/components/web/layout/app-header";
import { FaWhatsapp, FaGithub } from "react-icons/fa";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <AppHeader />

            <section className="flex-1 flex items-center">
                <div className="max-w-5xl mx-auto px-6 py-24 text-center">
                    <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
                        No more WhatsApp
                        <span className="block text-primary">
                            for sharing to nearby systems
                        </span>
                    </h1>

                    <div className="mt-6 flex justify-center">
                        <div className="relative inline-flex items-center justify-center h-16 w-16">
                            <FaWhatsapp className="text-green-500 size-12" />
                            <span className="absolute inset-0 flex items-center justify-center">
                                <span className="w-16 h-1 bg-red-500 rotate-45"></span>
                            </span>
                        </div>
                    </div>


                    <div className="mt-8 max-w-2xl mx-auto text-center">
                        <p className="text-muted-foreground text-lg">
                            Fastdrop creates quick, ephemeral sessions that nearby systems can
                            instantly discover and join. Within these sessions you can share
                            four essentials — keeping collaboration fast and simple.
                        </p>

                    </div>


                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button asChild size="lg" className="gap-2">
                            <Link href="/web">
                                Try Fastdrop
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>

                        <Link
                            href="https://github.com/abhisarxverma/fastdrop"
                            target="_blank"
                            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition"
                        >
                            <FaGithub className="size-4" />
                            Proudly Open Source
                        </Link>
                    </div>
                </div>
            </section>

            <section className="border-t">
                <div className="max-w-5xl mx-auto px-6 py-20 grid gap-10 sm:grid-cols-3 text-center">
                    <div className="space-y-3">
                        <div className="flex justify-center">
                            <Zap className="text-primary size-6" />
                        </div>
                        <h3 className="font-semibold">Instant Sharing</h3>
                        <p className="text-sm text-muted-foreground">
                            Share files and text instantly with nearby devices using realtime sessions.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-center">
                            <Share2 className="text-primary size-6" />
                        </div>
                        <h3 className="font-semibold">Session Based</h3>
                        <p className="text-sm text-muted-foreground">
                            Join a temporary sharing session and collaborate without creating accounts.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-center">
                            <Shield className="text-primary size-6" />
                        </div>
                        <h3 className="font-semibold">Privacy First</h3>
                        <p className="text-sm text-muted-foreground">
                            Sessions are local and temporary. Your files stay in control.
                        </p>
                    </div>
                </div>
            </section>

            <footer className="border-t">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Fastdrop</p>
                    <div className="flex items-center gap-4">
                        <Link href="/web">Nearby Sessions</Link>
                        <Link href="https://github.com/abhisarxverma/fastdrop" target="_blank">
                            GitHub
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
