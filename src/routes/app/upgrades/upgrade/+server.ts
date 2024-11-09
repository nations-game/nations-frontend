import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ fetch, request }) => {
	const { upgradeID, preparedCookie } = await request.json();
    const response = await fetch("$api/nation/upgrade", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie": preparedCookie
        },
        body: JSON.stringify({ "upgrade_id": upgradeID })
    });
    
    const respJson = await response.json();
    if(response.ok) {
	    return json(respJson);
    } else {
        return new Response(JSON.stringify({ message: "Couldn't upgrade!", details: respJson }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 400
        });
    }
};