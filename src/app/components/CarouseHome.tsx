import * as React from "react";

import {Card, CardContent} from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {useRouter} from "next/navigation";
import {CarouselData} from "@/models/CarouselData";

interface CarouselHomeProps {
    carouselCardList: CarouselData[];
}

export function CarouselHome({carouselCardList}: CarouselHomeProps) {
    const router = useRouter();

    return (
        <Carousel className="w-full max-w-xs">
            <CarouselContent>
                {carouselCardList.map((card) => (
                    <CarouselItem key={card.cardName}>
                        <div className="p-1" onClick={() => router.push(card.hyperLink)}>
                            <Card>
                                <CardContent
                                    className="flex aspect-square items-center justify-center p-6 bg-amber-200 cursor-pointer"
                                >
                                    <span className="text-4xl font-semibold">{card.cardName}</span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>
    );
}
