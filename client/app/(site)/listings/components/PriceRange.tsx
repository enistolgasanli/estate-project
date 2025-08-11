"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { TfiLayoutLineSolid } from "react-icons/tfi";

const minPrice = 0;
const maxPrice = 10000000;

type PriceRangeProps = {
    value: [number, number];
    onValueChange: (value: number[]) => void;
}

export default function PriceRange({ value, onValueChange }: PriceRangeProps) {
    const handleSliderChange = (newValues: number[]) => {
        onValueChange([newValues[0], newValues[1]]);
    };

    const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number(e.target.value);
        if (!isNaN(inputValue) && inputValue >= minPrice && inputValue <= value[1]) {
            onValueChange([inputValue, value[1]]);
        }
    };

    const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number(e.target.value);
        if (!isNaN(inputValue) && inputValue <= maxPrice && inputValue >= value[0]) {
            onValueChange([value[0], inputValue]);
        }
    };

    return (
        <div className="flex flex-col gap-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Fiyat Aralığı</h3>

            <Slider
                min={minPrice}
                max={maxPrice}
                step={1}
                value={value}
                onValueChange={handleSliderChange}
                className="w-full"
            />

            <div className="flex items-center justify-between mt-2 gap-x-4">
                <div className="flex-1 flex flex-col items-center">
                    <Input
                        type="number"
                        value={value[0]}
                        onChange={handleMinInputChange}
                        className="w-full text-center border-gray-300 rounded-lg shadow-sm"
                    />
                    <span className="mt-1 text-sm text-gray-500">min</span>
                </div>

                <TfiLayoutLineSolid />

                <div className="flex-1 flex flex-col items-center">
                    <Input
                        type="number"
                        value={value[1]}
                        onChange={handleMaxInputChange}
                        className="w-full text-center border-gray-300 rounded-lg shadow-sm"
                    />
                    <span className="mt-1 text-sm text-gray-500">max</span>
                </div>
            </div>
        </div>
    );
}