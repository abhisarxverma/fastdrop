export default function RateLimitPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Too Many Requests</h1>
        <p className="text-muted-foreground">
          You’re doing that too fast. Please wait a moment.
        </p>
      </div>
    </div>
  )
}