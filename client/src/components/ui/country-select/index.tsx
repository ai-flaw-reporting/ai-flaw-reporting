"use client";

import { useState } from "react";
import { CheckIcon, ChevronDown, Globe } from "lucide-react";
import { CircleFlag } from "react-circle-flags";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { cn } from "~/lib/utils";

import { COUNTRIES, type Country } from "./countries";

type CountrySelectProps = {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  slim?: boolean;
  className?: string;
};

export function CountrySelect({
  value,
  onChange,
  disabled = false,
  placeholder = "Select a country",
  slim = false,
  className,
}: CountrySelectProps) {
  const [open, setOpen] = useState(false);

  const options = COUNTRIES;

  const selectedCountry = value
    ? options.find((country) => country.name === value)
    : undefined;

  const handleSelect = (country: Country) => {
    onChange?.(country.name);
    setOpen(false);
  };

  const triggerClasses = cn(
    "dark:border-gray-300 dark:bg-white text-md flex w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 ring-offset-background focus:ring-ring focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:bg-gray-800",
    slim && "w-20",
    className,
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={triggerClasses}
        disabled={disabled}
        type="button"
      >
        {selectedCountry ? (
          <div className="flex w-0 flex-grow items-center gap-2 overflow-hidden">
            <div className="inline-flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full">
              <CircleFlag
                countryCode={selectedCountry.alpha2.toLowerCase()}
                height={20}
              />
            </div>
            {!slim && (
              <span className="overflow-hidden text-ellipsis whitespace-nowrap dark:text-white">
                {selectedCountry.name}
              </span>
            )}
          </div>
        ) : (
          <span className="placeholder">
            {!slim ? placeholder : <Globe size={20} />}
          </span>
        )}
        <ChevronDown size={16} className="text-gray-500" />
      </PopoverTrigger>
      <PopoverContent
        collisionPadding={10}
        side="bottom"
        className="min-w-[--radix-popper-anchor-width] p-0"
      >
        <Command className="max-h-[200px] w-full sm:max-h-[270px]">
          <CommandList>
            <div className="bg-popover sticky top-0 z-10">
              <CommandInput placeholder="Search country..." />
            </div>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {options
                .filter((x) => x.name)
                .map((option, key: number) => (
                  <CommandItem
                    className="flex w-full items-center gap-2"
                    key={key}
                    onSelect={() => handleSelect(option)}
                  >
                    <div className="flex w-0 flex-grow space-x-2 overflow-hidden">
                      <div className="inline-flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full">
                        <CircleFlag
                          countryCode={option.alpha2.toLowerCase()}
                          height={20}
                        />
                      </div>
                      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                        {option.name}
                      </span>
                    </div>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4 shrink-0",
                        option.name === selectedCountry?.name
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
