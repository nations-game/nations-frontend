import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
    if(locals.user === undefined) {
        return redirect(302, "/login");
    }
    return {
        user: locals.user
    };
};