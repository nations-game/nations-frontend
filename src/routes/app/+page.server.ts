import type { Actions } from "@sveltejs/kit";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
    collectTaxes: async({ request, cookies, fetch, locals }) => {
        const response = await fetch("$api/nation/collecttaxes", {
            method: "POST",
            headers: {
                "Cookie": locals.preparedCookie
            }
        });

        const responseData = await response.json();

        return { user: { nation: responseData } }
    }
} satisfies Actions;