import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals, fetch }) => {
    const factoriesResponse = await fetch("$api/factories/all", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cookie": locals.preparedCookie
        }
    });

    const json = await factoriesResponse.json();
    const factories = json.details;

    return {
        factories: factories,
        preparedCookie: locals.preparedCookie
    };
};