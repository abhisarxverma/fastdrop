"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { SingleShare } from "@/types";

type SingleShareCardProps = {
  share: SingleShare
};

export default function SingleShareCard({ share }: SingleShareCardProps) {
  return (
    <Card className="w-full max-w-sm mx-auto shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {share.title ?? "Untitled"}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {share.share_type} • {new Date(share.created_at).toLocaleDateString()}
        </p>
      </CardHeader>

      <CardContent>
        {share.content_text && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {share.content_text}
          </p>
        )}
        {share.file_name && (
          <p className="text-xs text-muted-foreground mt-2">
            📎 {share.file_name}
          </p>
        )}
      </CardContent>

      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Created by {share.created_by}
        </p>
      </CardFooter>
    </Card>
  );
}
