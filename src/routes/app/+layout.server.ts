import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
    if(locals.user === undefined) {
        return redirect(302, "/login");
    }

    if(locals.user.nation === undefined) {
        return redirect(302, "/createNation");
    }

    return {
        user: locals.user,
        preparedCookie: locals.preparedCookie
    };
};