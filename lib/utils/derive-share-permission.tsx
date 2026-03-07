export type SharePermission = {
  canShare: boolean
  reason?: string
}

export function deriveSharePermission(
  sharingEnabled: boolean,
  isBanned: boolean,
  ended: boolean
): SharePermission {

  if (ended) {
    return {
      canShare: false,
      reason: "Session has ended"
    }
  }

  if (!sharingEnabled) {
    return {
      canShare: false,
      reason: "Sharing is disabled by the host"
    }
  }

  if (isBanned) {
    return {
      canShare: false,
      reason: "You are banned from sharing in this session"
    }
  }

  return {
    canShare: true
  }
}