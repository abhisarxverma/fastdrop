export class TransportError extends Error {
  readonly source: "backend";
  readonly kind: "network" | "invalid-response";

  constructor(kind: TransportError["kind"], message: string, cause?: unknown) {
    super(message);
    this.source = "backend";
    this.kind = kind;
    this.cause = cause;
  }
}
