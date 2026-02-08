const colorMap: Record<string, string> = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  yellow: "bg-yellow-500",
  green: "bg-green-500",
}

export default function Ping({ color }: { color: keyof typeof colorMap }) {
  return (
    <span className="relative flex h-2 w-2">
      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${colorMap[color]} opacity-75`} />
      <span className={`relative inline-flex h-2 w-2 rounded-full ${colorMap[color]}`} />
    </span>
  )
}
