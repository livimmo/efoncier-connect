import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  separator?: React.ReactNode
}

export interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<"li"> {}

export interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  asChild?: boolean
  href?: string
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="breadcrumb"
      {...props}
    >
      <ol className="flex items-center gap-2">{props.children}</ol>
    </nav>
  )
)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn("inline-flex items-center gap-2", className)}
      {...props}
    >
      {props.children}
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </li>
  )
)
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "text-sm font-medium underline-offset-4 hover:underline text-muted-foreground hover:text-foreground transition-colors",
        className
      )}
      {...props}
    >
      {props.children}
    </a>
  )
)
BreadcrumbLink.displayName = "BreadcrumbLink"

export { Breadcrumb, BreadcrumbItem, BreadcrumbLink }