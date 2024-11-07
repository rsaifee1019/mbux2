import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function DataTableFilter({ filters, onFilterChange, onResetFilters }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center mb-6">
      <div className="flex-1 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filters.map((filter) => (
            <div key={filter.id} className="relative">
              {filter.type === 'text' && (
                <>
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={filter.placeholder}
                    value={filter.value}
                    onChange={(e) => onFilterChange(filter.id, e.target.value)}
                    className="pl-8"
                  />
                </>
              )}
              {filter.type === 'select' && (
                <Select
                  value={filter.value}
                  onValueChange={(value) => onFilterChange(filter.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={filter.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {filter.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {filter.type === 'date' && (
                <Input
                  type="date"
                  value={filter.value}
                  onChange={(e) => onFilterChange(filter.id, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={onResetFilters} variant="outline">Reset</Button>
      </div>
    </div>
  );
} 