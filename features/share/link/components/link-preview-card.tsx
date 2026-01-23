"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MetadataResponse } from "../types"

export function LinkPreviewCard({ response, isValidating }: { response: MetadataResponse | null, isValidating: boolean }) {

  if (isValidating) return (
    <Card className="mt-4 border bg-secondary animate-pulse h-full">
      <CardContent className="flex flex-col gap-2 h-full">
        <div className="h-40 w-full bg-muted rounded mb-3" />
        <div className="space-y-2">
          <div className="h-4 w-2/3 bg-muted rounded" />
          <div className="h-3 w-1/2 bg-muted rounded" />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Validating your link…</p>
      </CardContent>
    </Card>
  )

  if (!response) return (
    <Card className="mt-4 border bg-muted/30 h-full">
      <CardContent className="flex flex-col items-center justify-center h-full">
        <p className="font-semibold">No preview available</p>
        <p className="text-sm text-muted-foreground">
          Paste a valid link to see its details.
        </p>
      </CardContent>
    </Card>
  )

  switch (response.status) {

    case "unsafe":
      return (
        <Card className="mt-4 border bg-destructive/20 h-full">
          <CardContent className="flex flex-col items-center justify-center h-full">
            <p className="font-semibold text-destructive">Unsafe link</p>
            <p className="text-sm text-muted-foreground">{response.message}</p>
          </CardContent>
        </Card>
      )

    case "blocked":
      return (
        <Card className="mt-4 border bg-destructive/20 h-full">
          <CardContent className="flex flex-col items-center justify-center h-full">
            <p className="font-semibold text-destructive">Blocked link</p>
            <p className="text-sm text-muted-foreground">{response.message}</p>
          </CardContent>
        </Card>
      )

    case "error":
      return (
        <Card className="mt-4 border bg-destructive/20 h-full">
          <CardContent className="flex flex-col items-center justify-center h-full">
            <p className="font-semibold">Error fetching metadata</p>
            <p className="text-sm text-muted-foreground">{response.message}</p>
          </CardContent>
        </Card>
      )

    case "ok":
      if (response.data) return (
        <Card className="mt-4 border bg-primary/10 h-full">
          <CardContent className="flex flex-col gap-2 h-full">
            <p className="text-sm text-muted-foreground">Link preview</p>
            {response?.data?.image && (
              <img
                src={response.data.image}
                alt={response.data.title}
                className="w-full h-40 object-cover rounded"
              />
            )}
            <h3 className="mt-2 font-semibold">{response?.data?.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {response?.data?.description}
            </p>
          </CardContent>
        </Card>
      )
      else return (
        <Card className="mt-4 border bg-accent/20 h-full">
          <CardContent className="flex flex-col items-center justify-center h-full">
            <p className="font-semibold">No metadata found</p>
            <p className="text-sm text-muted-foreground">
              You can still share this link, but no preview is available.
            </p>
          </CardContent>
        </Card>
      )
  }
}
