import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ fetch, request }) => {
	const { buildingID, preparedCookie } = await request.json();
    const response = await fetch("$api/buildings/build/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie": preparedCookie
        },
        body: JSON.stringify({ "building_id": buildingID })
    });
    
    const respJson = await response.json();
    if(response.ok) {
	    return json(respJson);
    } else {
        return new Response(JSON.stringify({ message: "Couldn't build building!", details: respJson }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 400
        });
    }
};