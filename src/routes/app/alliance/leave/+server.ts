import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ fetch, request }) => {
	const { preparedCookie } = await request.json();
    const response = await fetch("$api/alliance/leave", {
        method: "POST",
        headers: {
            "Cookie": preparedCookie
        }
    });

    const responseData = await response.json();

    if(response.ok) {
        return json(responseData.details);
    } else {
        return json(responseData.details)
    }
};