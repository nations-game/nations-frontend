import type { Actions } from "@sveltejs/kit";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
    default: async({ request, cookies, fetch, locals }) => {
        const data = await request.formData();
        const name = data.get("name") as string;
        const icon = data.get("icon") as string;
        const isAlliancePublic = data.get("public") as string == "on" ? true : false;


        const response = await fetch("$api/alliance/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": locals.preparedCookie
            },
            body: JSON.stringify({
                name,
                icon,
                public: isAlliancePublic
            })
        });

        console.log(await response.json());

        if(response.ok) {
            throw redirect(302, "/app/alliance");
        } else {
            return fail(400, {
                error: "Invalid info!"
            });
        }
    }
} satisfies Actions;