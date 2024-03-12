import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals, fetch }) => {
    const allianceID = locals.user.nation.allianceID;
    
    if(allianceID === "") {
        return {
            alliance: ""
        }
    }

    const response = await fetch("$api/alliance/get", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie": locals.preparedCookie
        },
        body: JSON.stringify({ "id": allianceID })
    });

    const json = await response.json();
    console.log(json)

    return {
        alliance: json.details
    };
};