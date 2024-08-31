import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals, fetch }) => {

    const upgradesResp = await fetch("$api/nation/upgrades", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cookie": locals.preparedCookie
        }
    });
    const nationJson = await upgradesResp.json();
    const upgrades = nationJson.details;
    
    return {
        upgrades: upgrades
    };
};