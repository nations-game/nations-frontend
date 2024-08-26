import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ fetch, request }) => {
	const { allianceID, preparedCookie } = await request.json();
    const response = await fetch("$api/alliance/join", {
        method: "POST",
        headers: {
            "Cookie": preparedCookie
        },
        body: JSON.stringify({ "id": allianceID })
    });

    const responseData = await response.json();

    if(response.ok) {
        return json({ user: { nation: responseData.details } });
    } else {
        return json({ message: JSON.stringify(responseData) })
    }
};