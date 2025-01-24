"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { PriceMetricsResponse } from "@/types/api";

interface DepartmentSelectorProps {
  departments: PriceMetricsResponse[];
  selectedDepartments: number[];
  onSelectionChange: (selectedIds: number[]) => void;
}

export function DepartmentSelector({
  departments,
  selectedDepartments,
  onSelectionChange,
}: DepartmentSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDepartment = (departmentId: number) => {
    const newSelection = selectedDepartments.includes(departmentId)
      ? selectedDepartments.filter((id) => id !== departmentId)
      : [...selectedDepartments, departmentId];
    onSelectionChange(newSelection);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">Vælg afdelinger</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <h4 className="font-medium leading-none">Afdelinger</h4>
          <div className="grid gap-2">
            {departments.map((dept) => (
              <label
                key={dept.department_id}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  checked={selectedDepartments.includes(dept.department_id)}
                  onCheckedChange={() => toggleDepartment(dept.department_id)}
                />
                <span>{dept.department_name}</span>
              </label>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
