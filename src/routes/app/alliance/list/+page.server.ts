import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals, fetch }) => {
    const alliancesResponse = await fetch("$api/alliance/list", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cookie": locals.preparedCookie
        }
    });

    const json = await alliancesResponse.json();
    let alliances = json.details;

    for(let alliance of alliances) {
        const ownerId = alliance.owner_nation_id;
        const nationResponse = await fetch("$api/nation/get", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Cookie": locals.preparedCookie
            },
            body: JSON.stringify({ 
                "id": ownerId
            })
        });


        const nationJson = await nationResponse.json();
        alliance.nation = nationJson.details;
    }

    return {
        alliances: alliances
    };
};