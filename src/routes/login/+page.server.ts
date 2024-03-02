import type { Actions } from "@sveltejs/kit";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
    default: async({ request, cookies, fetch, locals }) => {
        const data = await request.formData();
        const username = data.get("username") as string;
        const password = data.get("password") as string;

        const response = await fetch("$api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Cookie": locals.preparedCookie
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const loginData = await response.json();

        if(response.ok) {
            cookies.set("sessionID", loginData.details.sessionID, {
                path: "/",
                maxAge: loginData.details.maxAge
            });
            throw redirect(302, "/app");
        } else {
            return fail(400, {
                error: "Invalid username or password!"
            });
        }
    }
} satisfies Actions;