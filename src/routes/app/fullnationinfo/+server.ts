import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ fetch, request, cookies }) => {
	const preparedCookie = cookies.get("sessionID") as string;
    const userResponse = await fetch("$api/user/@me/info", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cookie": `sessionid=${preparedCookie}`
        }
    });

    const jsonBody = await userResponse.json();
    const user = jsonBody.details;
    if(user.id) {
        const nationId = user.nation_id;
        if(nationId !== null) {
            const nationResponse = await fetch("$api/nation/info", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `sessionid=${preparedCookie}`
                }
            });

            const factoryResponse = await fetch("$api/nation/factories", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `sessionid=${preparedCookie}`
                }
            });

            const nationJson = await nationResponse.json();
            user.nation = nationJson.details;

            const factoryJson = await factoryResponse.json();
            user.nation.factories = factoryJson.details;
        }
    }

    // console.log(user)
    return json({ user: user });
};