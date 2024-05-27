"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function BathroomFilter({ filter, setFilter, dataForFilter }) {
    const [open, setOpen] = React.useState(false);
    const [selectedAreas, setSelectedAreas] = React.useState();
  
    // Format dataForFilter into objects with value and label properties
    const formattedData = dataForFilter.map((area) => ({
      value: area,
      label: area,
    }));
  
    const handleSelect = (currentValue) => {
      setSelectedAreas(currentValue);
      setFilter({ ...filter, bathroom: currentValue });
      setOpen(false);
    };
  
  
    return (
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {selectedAreas
                ? `selected bathroom ${selectedAreas}`
                : "Select bathroom..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search area..." />
              <CommandEmpty>No area found.</CommandEmpty>
              <CommandGroup>
                <CommandList>
                  {formattedData.map((area) => (
                    <CommandItem
                      key={area.value}
                      value={area.value}
                      onSelect={handleSelect}
                    >
                      {/* <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedAreas ? "opacity-100" : "opacity-0"
                        )}
                      /> */}
                      {area.label}
                    </CommandItem>
                  ))}
                </CommandList>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
}