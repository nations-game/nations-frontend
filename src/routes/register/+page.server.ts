import type { Actions } from "@sveltejs/kit";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
    default: async({ request, cookies, fetch, locals }) => {
        const data = await request.formData();
        const username = data.get("username") as string;
        const email = data.get("email") as string;
        const password = data.get("password") as string;
        const confirm_password = data.get("confirmPassword") as string;
        const accepted_tos = data.get("acceptedTos") as string == "on" ? true : false;

        const response = await fetch("$api/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Cookie": locals.preparedCookie
            },
            body: JSON.stringify({
                username,
                email,
                password,
                confirm_password,
                accepted_tos
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