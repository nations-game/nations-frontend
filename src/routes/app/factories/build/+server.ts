import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ fetch, request }) => {
	const { factoryID, preparedCookie } = await request.json();
    const response = await fetch("$api/factories/build/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie": preparedCookie
        },
        body: JSON.stringify({ "factory_id": factoryID })
    });
    const respJson = await response.json();
	return json(respJson);
};