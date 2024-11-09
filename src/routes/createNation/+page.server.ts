import type { Actions } from "@sveltejs/kit";
import type { LayoutServerLoad } from "../app/$types";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
    default: async({ request, cookies, fetch, locals }) => {
        const data = await request.formData();
        const name = data.get("name") as string;
        const authority = data.get("authority") as string;
        const economic = data.get("economic") as string;


        const response = await fetch("$api/nation/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": locals.preparedCookie
            },
            body: JSON.stringify({
                name,
                authority: Number(authority),
                economic: Number(economic)
            })
        });

        console.log(await response.json());

        if(response.ok) {
            throw redirect(302, "/app");
        } else {
            return fail(400, {
                error: "Invalid info!"
            });
        }
    }
} satisfies Actions;

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
    if(locals.user === undefined) {
        return redirect(302, "/login");
    }

    return {
        user: locals.user
    };
};