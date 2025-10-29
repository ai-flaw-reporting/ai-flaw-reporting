"use client";
import React, { useState, useRef, useCallback, useMemo } from "react";

import { X } from "lucide-react";
import { Popover, PopoverAnchor, PopoverContent } from "../popover";
import { Badge } from "../badge";
import { Input } from "../input";
import { cn } from "~/lib/utils";
import { isItemSelected, itemMatchesInput, truncateText } from "./utils";

type DataItem = {
  id?: string;
  value?: string;
  name: string;
  associatedTerm?: string;
};

type Props = {
  data: DataItem[];
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (selectedValues: string[]) => void;
  placeholder?: string;
  className?: string;
  icon?: React.ReactNode;
  maxVisible?: number;
};

export const ChipsRow: React.FC<Props> = ({
  data,
  defaultValue = [],
  value,
  onValueChange,
  placeholder = "Type to search...",
  className,
  icon,
  maxVisible = 10,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const radioGroupRef = useRef<HTMLDivElement>(null);

  const internalValue = value ?? defaultValue;

  const filteredItems = useMemo(() => {
    return data.filter((item) => {
      const isMatch = itemMatchesInput(item, inputValue);
      const isAlreadySelected = isItemSelected(item, internalValue);

      return isMatch && !isAlreadySelected;
    });
  }, [data, inputValue, internalValue]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      setHighlightedIndex(-1);

      // Only open the popover if we have matching items that aren't already selected
      const currentSelected = value ?? defaultValue;

      const hasUnselectedMatches = data.some((item) => {
        const isMatch = itemMatchesInput(item, newValue);
        const isAlreadySelected = isItemSelected(item, currentSelected);
        return isMatch && !isAlreadySelected;
      });

      setIsOpen(hasUnselectedMatches);

      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    },
    [data, internalValue],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (isOpen && filteredItems.length > 0) {
          const firstRadio = radioGroupRef.current?.querySelector(
            'input[type="radio"]',
          ) as HTMLElement | null;
          if (firstRadio) {
            firstRadio.focus();
            setHighlightedIndex(0);
          }
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  const handleRadioKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number,
  ) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (index < filteredItems.length - 1) {
          setHighlightedIndex(index + 1);
          const nextItem = radioGroupRef.current?.querySelector(
            `div:nth-child(${index + 2})`,
          ) as HTMLElement | null;
          if (nextItem) {
            nextItem.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            });
          }
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (index > 0) {
          setHighlightedIndex(index - 1);
          const prevItem = radioGroupRef.current?.querySelector(
            `div:nth-child(${index})`,
          ) as HTMLElement | null;
          if (prevItem) {
            prevItem.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            });
          }
        } else {
          inputRef.current?.focus();
          setHighlightedIndex(-1);
        }
        break;
      case "Enter":
        e.preventDefault();
        const selectedItem = filteredItems[index];
        if (selectedItem) {
          handleItemSelect(selectedItem);
          inputRef.current?.focus();
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        inputRef.current?.focus();
        break;
    }
  };

  const handleItemSelect = useCallback(
    (item: DataItem) => {
      const newSelectedPills = [...internalValue, item.name];

      setInputValue("");
      setIsOpen(false);
      setHighlightedIndex(-1);
      onValueChange?.(newSelectedPills);
    },
    [internalValue, onValueChange],
  );

  const handlePillRemove = useCallback(
    (pillToRemove: string) => {
      const newSelectedPills = internalValue.filter(
        (pill) => pill !== pillToRemove,
      );

      onValueChange?.(newSelectedPills);
    },
    [internalValue, onValueChange],
  );

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setIsOpen(false);
    }
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, []);

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <div className="flex flex-col gap-4">
        <PopoverAnchor asChild>
          <div className="relative flex-1">
            {icon && (
              <div className="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2">
                {icon}
              </div>
            )}
            <Input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={cn(icon && "pl-10", className)}
              aria-label="Search and select items"
              aria-autocomplete="list"
              aria-controls="pill-options-list"
              aria-expanded={isOpen}
            />
          </div>
        </PopoverAnchor>
        <div className="flex flex-wrap gap-2">
          {internalValue.map((pill) => (
            <Badge
              key={pill}
              variant="default"
              className="group text-gray-25 gap-1 rounded-sm px-2 py-[3px] text-xs font-medium capitalize"
              title={pill}
            >
              {truncateText(pill, maxVisible)}
              <button
                onClick={() => handlePillRemove(pill)}
                className="text-gray-25 group-hover:text-gray-25 cursor-pointer appearance-none transition-colors"
                aria-label={`Remove ${pill}`}
              >
                <X size={12} aria-hidden="true" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <PopoverContent
        onFocusOutside={(e) => {
          if (e.target === inputRef.current) {
            e.preventDefault();
          }
        }}
        onInteractOutside={(e) => {
          if (e.target === inputRef.current) {
            e.preventDefault();
          }
        }}
      >
        <div
          id="pill-options-list"
          ref={radioGroupRef}
          role="radiogroup"
          aria-label="Available options"
          onKeyDown={(e) => handleRadioKeyDown(e, highlightedIndex)}
          className="max-h-[200px] overflow-y-auto"
        >
          {filteredItems.map((item, index) => (
            <div
              key={item.id ?? item.value ?? item.name}
              className={cn(
                "hover:bg-accent/70 focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
                highlightedIndex === index && "bg-accent",
              )}
            >
              <input
                type="radio"
                id={`pill-${item.name}`}
                name="pill-selection"
                value={item.name}
                className="sr-only"
                checked={highlightedIndex === index}
                onChange={() => handleItemSelect(item)}
              />
              <label
                htmlFor={`pill-${item.name}`}
                className="flex w-full cursor-pointer items-center capitalize"
              >
                {item.name}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
