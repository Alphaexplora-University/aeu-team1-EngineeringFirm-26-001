import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils" // Standard shadcn utility

interface ActionCardProps {
  title: string
  description?: string
  content: React.ReactNode
  buttonText?: string
  onAction?: () => void
  className?: string
}

export function CardDefault({
  title,
  description,
  content,
  buttonText,
  onAction,
  className,
}: ActionCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">{content}</div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={onAction}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}
