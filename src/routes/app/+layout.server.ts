import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
    if(locals.user === undefined) {
        return redirect(302, "/login");
    }

    if(locals.user.nation === undefined) {
        return redirect(302, "/createNation");
    }

    const userResponse = await fetch("$api/user/@me/info", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cookie": locals.preparedCookie
        }
    });

    const json = await userResponse.json();
    const user = json.details;
    if(user.id) {
        locals.user = user;

        const nationId = user.nation_id;
        if(nationId !== null) {
            const nationResponse = await fetch(`$api/nation/info`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": locals.preparedCookie
                }
            });

            const factoryResponse = await fetch("$api/nation/factories", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": locals.preparedCookie
                }
            });

            const nationJson = await nationResponse.json();
            user.nation = nationJson.details;

            const factoryJson = await factoryResponse.json();
            user.nation.factories = factoryJson.details;
        }
    }

    return {
        user: locals.user,
        preparedCookie: locals.preparedCookie
    };
};