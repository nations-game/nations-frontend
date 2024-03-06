import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
    return { status: 200, body: 'ok' };
};