"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

function SelectFilter({
  name,
  label,
  items,
  defaultValue,
}: {
  name: string;
  label?: string;
  items: string[];
  defaultValue?: string;
}) {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);
  return (
    <div>
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Select
        name={name}
        value={selectedValue}
        onValueChange={(value) => setSelectedValue(value)}
      >
        <SelectTrigger id={name} className="bg-background capitalize">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((item, index) => (
            <SelectItem key={index} value={item} className="capitalize">
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
export default SelectFilter;
