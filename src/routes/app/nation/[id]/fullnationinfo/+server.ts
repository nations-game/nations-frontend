import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ fetch, request, cookies, params }) => {
	const preparedCookie = cookies.get("sessionID") as string;
    const nationId = params.id;
    if(nationId !== null) {
        const nationResponse = await fetch("$api/nation/get", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `sessionid=${preparedCookie}`
            },
            body: JSON.stringify({ "id": nationId })
        });

        let nation: any = {};
        const nationJson = await nationResponse.json();
        nation = nationJson;

        return json({ nation: nation });
    }
};