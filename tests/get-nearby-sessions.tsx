import { getNearbySessionsAction } from "@/actions/sessions.actions";

export async function testGetNearbySessions(lat: number, lng: number){
    const sessions = await getNearbySessionsAction({lat, lng});
    console.log("Sessions: ", sessions);
    return sessions;
}