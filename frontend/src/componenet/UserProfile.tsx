"use client"
import { Link, useNavigate } from "react-router-dom"
import {
  CreditCard,
  Calendar,
  CircleDollarSign,
  User,
  LogOut,
  Bookmark,
  History,
  MessageSquare,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./drop-down-menu"

const ProfileDropdown = () => {
  const navigate = useNavigate()

  // Define menu items
  const menuItemLinks = [
    {
      href: "/user-profile",
      icon: <History className="size-4" />,
      label: "Your Profile",
    },
    {
      href: "/user-posts",
      icon: <Bookmark className="size-4" />,
      label: "Your Posts",
    },
    {
      href: "/billing",
      icon: <CreditCard className="size-4" />,
      label: "Billing",
    },
    {
      href: "/messages",
      icon: <MessageSquare className="size-4" />,
      label: "Messages",
    },
  ]

  // Sign Out Logic
  const signOut = () => {
    // Clear authentication (e.g., remove JWT token or cookie)
    localStorage.removeItem("token") // If using localStorage for JWT
    document.cookie =
      "jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;" // If using cookies

    // Redirect to the login page
    navigate("/sign-in")
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-b from-blue-400 to-blue-700">
          <User color="white" className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[99999] m-2 min-w-44 bg-neutral-100 dark:bg-neutral-900">
        {/* User Menu Items */}
        <DropdownMenuGroup>
          {menuItemLinks.map(({ href, label, icon }) => (
            <DropdownMenuItem key={href} asChild>
              <Link to={href} className="flex gap-2 text-base">
                {icon}
                <span>{label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        {/* Separator */}
        <DropdownMenuSeparator />

        {/* External Links Section */}
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <a
              href="https://example.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 text-base"
            >
              <CircleDollarSign className="size-4" />
              <span>Terms & Conditions</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a
              href="https://example.com/support"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 text-base"
            >
              <MessageSquare className="size-4" />
              <span>Support</span>
            </a>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {/* Separator */}
        <DropdownMenuSeparator />

        {/* Logout Button */}
        <DropdownMenuItem
          onClick={signOut}
          className="flex items-center gap-2 text-base transition-all duration-300 hover:text-red-500"
        >
          <LogOut className="size-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropdown
