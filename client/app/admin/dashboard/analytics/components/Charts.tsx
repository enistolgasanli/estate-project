"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { month: "Ocak", desktop: 186, mobile: 80 },
    { month: "Şubat", desktop: 305, mobile: 200 },
    { month: "Mart", desktop: 200, mobile: 100 },
    { month: "Nisan", desktop: 73, mobile: 190 },
    { month: "Mayıs", desktop: 200, mobile: 100 },
    { month: "Haziran", desktop: 200, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Masaüstü",
        color: "#ffd200",
    },
    mobile: {
        label: "Mobil",
        color: "#fe9a00",
    },
} satisfies ChartConfig

export default function Charts() {
    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
        </ChartContainer>
    )
}
