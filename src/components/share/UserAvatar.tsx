import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function UserAvatar() {
  return (
    <Avatar className="w-10 h-10 rounded-md">
      <AvatarImage src="https://api.dicebear.com/9.x/personas/svg" alt="@vercel" />
      <AvatarFallback>VC</AvatarFallback>
    </Avatar>
  )
}
