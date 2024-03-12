import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals, fetch }) => {

    const nationBuildingsResp = await fetch("$api/nation/buildings", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cookie": locals.preparedCookie
        }
    });
    const nationJson = await nationBuildingsResp.json();
    const nationBuildings = nationJson.details;

    const buildingsResp = await fetch("$api/buildings/all", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cookie": locals.preparedCookie
        }
    });

    const json = await buildingsResp.json();
    const buildings = json.details;

    return {
        buildings: buildings,
        nationBuildings: nationBuildings
    };
};