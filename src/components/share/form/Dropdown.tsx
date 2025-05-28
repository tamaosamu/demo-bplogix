import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DropdownProps {
  name: string
  data: {
    label: string
    value: string
  }[]
  value?: string
}

export function Dropdown({
  name = "Please select one",
  data,
  value,
}: DropdownProps) {
  return (
    <Select value={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={name} />
      </SelectTrigger>
      <SelectContent>
        {data.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
