import { FormField, FormItem } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control, FieldValues } from "react-hook-form";

type SearchProps = {
    control: Control<FieldValues>;
    name: string;
    placeholder: string;
    label: string;
    selectItem: {
        value: string;
        title: string;
    }[];
    disabled?: boolean;
    onValueChange?: (value: string) => void;
}

export default function Search({ control, name, placeholder, label, selectItem, disabled, onValueChange }: SearchProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="w-full">
                    <Select
                        onValueChange={(value) => {
                            field.onChange(value);

                            if (onValueChange) {
                                onValueChange(value);
                            }
                        }}
                        value={field.value || ""}
                        disabled={disabled}
                    >
                        <SelectTrigger className="w-full rounded-full border-gray-500 cursor-pointer">
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>{label}</SelectLabel>
                                {
                                    selectItem.map(item => (
                                        <SelectItem key={item.value} value={item.value}>
                                            {item.title}
                                        </SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </FormItem>
            )}
        />
    );
}