import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CategorySearchBar() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3">
      <div className="grid gap-3 md:grid-cols-[1fr_180px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input className="pl-9" placeholder="Search guides and categories..." />
        </div>
        <Select defaultValue="latest">
          <SelectTrigger className="w-full border-slate-200 text-sm text-slate-600">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="latest">Sort by: Latest</SelectItem>
            <SelectItem value="popular">Sort by: Most Popular</SelectItem>
            <SelectItem value="az">Sort by: A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
