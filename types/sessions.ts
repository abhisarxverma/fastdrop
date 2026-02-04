import { Tables } from "./utils";

export type Session = Omit<Tables<"sessions">, "join_code" | "location">;