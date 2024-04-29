import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const AddSalaries = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div style={{ overflow: "hidden" }}>
      <h1 className="text-2xl font-bold mb-3">Salary</h1>
      <form className="border p-5 rounded">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          <label htmlFor="Month" className="md:col-span-1">
            Month
            <Input type="date" id="month" required />
          </label>
          <label htmlFor="Type" className="md:col-span-1">
            Type
            <Input type="text" id="type" required placeholder="Type" />
          </label>
          <label htmlFor="Teacher ID" className="md:col-span-1">
            Teacher ID
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {value
                    ? frameworks.find((framework) => framework.value === value)
                        ?.label
                    : "Select framework..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search framework..." />
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === framework.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </label>
        </div>
        <Button size="sm" className="h-8 gap-1 mt-5">
          Add Salary
        </Button>
      </form>
    </div>
  );
};

export default AddSalaries;
