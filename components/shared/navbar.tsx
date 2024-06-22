'use client'

import Link from 'next/link'
import React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from '../ui/button'
import { CircleUser, Menu, Package2, Search } from 'lucide-react'
import { Input } from '../ui/input'
import { ModeToggle } from './modeToggle'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { logout } from '@/lib/actions/auth/logout'
import { useCurrentUser } from '@/hooks/authHooks'

const navLinks = [
  {
    route: "/dashboard",
    label: "Dashboard"
  },
  {
    route: "/trade",
    label: "Trade"
  },
  {
    route: "/orders",
    label: "Orders"
  },
  {
    route: "/store",
    label: "Store"
  },
  {
    route: "/analytics",
    label: "Analytics"
  },
]

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const user = useCurrentUser();
  const name = user?.name
  const userImage = user?.image

  const onClick = () => {
    logout();
  }

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-primary px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Image src={"/assets/images/logo1.png"} alt='logo' height={40} width={40} />
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Krishi Bazaar</span>
        </Link>

        {navLinks.map((link) => {
          const isActive = (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              className={cn("text-secondary transition-colors hover:text-foreground",
                isActive && "text-foreground transition-colors hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Image src={"/assets/images/logo1.png"} alt='logo' height={40} width={40} />
              {/* <Package2 className="h-6 w-6" /> */}
              <span className="sr-only">Krishi Bazaar</span>
            </Link>
            {navLinks.map((link) => {
              const isActive = (pathname.includes(link.route) && link.route.length > 1) ||
                pathname === link.route;

              return (
                <Link
                  href={link.route}
                  className={cn("text-muted-foreground transition-colors hover:text-foreground",
                    isActive && "text-foreground transition-colors hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              {userImage ? (
                <Image
                  src={userImage}
                  alt='user'
                  height={50}
                  width={50}
                  className=' rounded-2xl'
                />
              ) : (
                <CircleUser className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel> {name} </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/settings/general")}
            >Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onClick}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Navbar