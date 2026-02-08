import { createSessionAction } from "@/actions/sessions.actions";
import { getDefaultExpiry } from "@/lib/utils/formatters";

export async function testCreateSession(lat: number, lng: number, requires_code: boolean = false) {
    const createdSession = await createSessionAction({
        title: "Test Session "+ new Date().getMinutes() + new Date().getSeconds(),
        lat,
        lng,
        requires_code,
        radius_meters: 30,
        expires_at: getDefaultExpiry()
    })
    console.log("Created session : ", createdSession);
    return createdSession;
}