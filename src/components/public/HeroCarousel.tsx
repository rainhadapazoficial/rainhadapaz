"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface Banner {
    title: string;
    subtitle: string;
    image_url: string;
    button1_text?: string;
    button1_link?: string;
    button2_text?: string;
    button2_link?: string;
}

interface HeroCarouselProps {
    banners: Banner[];
}

export function HeroCarousel({ banners }: HeroCarouselProps) {
    const [current, setCurrent] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, [banners.length]);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    };

    useEffect(() => {
        if (banners.length <= 1) return;
        const timer = setInterval(nextSlide, 7000);
        return () => clearInterval(timer);
    }, [nextSlide, banners.length]);

    if (!banners || banners.length === 0) return null;

    return (
        <section className="relative h-[600px] w-full overflow-hidden bg-brand-blue">
            {banners.map((banner, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100 z-20" : "opacity-0 z-10"
                        }`}
                >
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[7000ms] ease-linear"
                        style={{
                            backgroundImage: `url('${banner.image_url}')`,
                            transform: index === current ? 'scale(1.1)' : 'scale(1)'
                        }}
                    />

                    <div className="relative z-20 h-full flex items-center justify-center text-white text-center px-4">
                        <div className="max-w-5xl">
                            <h1 className="text-4xl md:text-6xl font-bold italic mb-6 animate-in fade-in slide-in-from-bottom duration-1000">
                                {banner.title}
                            </h1>
                            <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto font-medium animate-in fade-in slide-in-from-bottom delay-300 duration-1000">
                                {banner.subtitle}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom delay-500 duration-1000">
                                {banner.button1_text && (
                                    <Link href={banner.button1_link || "/quem-somos"}>
                                        <Button size="lg" className="bg-brand-gold hover:bg-brand-gold/90 text-white text-lg h-14 px-8 shadow-lg shadow-brand-gold/20">
                                            {banner.button1_text}
                                        </Button>
                                    </Link>
                                )}
                                {banner.button2_text && (
                                    <Link href={banner.button2_link || "/eventos"}>
                                        <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-brand-blue text-lg h-14 px-8">
                                            {banner.button2_text}
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {banners.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current ? "bg-brand-gold w-8" : "bg-white/50 hover:bg-white"
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}
