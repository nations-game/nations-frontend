import type { Handle, HandleFetch } from "@sveltejs/kit";
import { API_URL } from "$lib";

export const handle = (async ({ event, resolve }) => {
    if(event.cookies.get("sessionID") !== undefined) {
        event.locals.sessionID = event.cookies.get("sessionID") as string;
        event.locals.preparedCookie = `sessionid=${event.locals.sessionID}`;

        const userResponse = await event.fetch("$api/user/@me/info", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": event.locals.preparedCookie
            }
        });

        const json = await userResponse.json();
        const user = json.details;
        if(user.id) {
            const nationId = user.nation_id;
            if(nationId !== null) {
                const nationResponse = await event.fetch("$api/nation/info", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Cookie": event.locals.preparedCookie
                    }
                });
    
                const factoryResponse = await event.fetch("$api/nation/factories", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Cookie": event.locals.preparedCookie
                    }
                });
    
                const nationJson = await nationResponse.json();
                user.nation = nationJson.details;
    
                const factoryJson = await factoryResponse.json();
                user.nation.factories = factoryJson.details;
            }

            event.locals.user = user;
        }
    }

    return resolve(event);
}) satisfies Handle;

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
    if (request.url.includes("$api/")) {
        let requestUrl = request.url.split("$api/")[1];
        requestUrl = `${API_URL}/${requestUrl}`;

        let options: any = {
            method: request.method,
            headers: request.headers,
            cache: request.cache,
            credentials: request.credentials,
            mode: request.mode,
            referrer: request.referrer,
            referrerPolicy: request.referrerPolicy,
            integrity: request.integrity,
            keepalive: request.keepalive,
            signal: request.signal,
            redirect: request.redirect
        };

        const isBodyAllowed = request.method === "POST"
            || request.method === "PUT"
            || request.method === "PATCH";

        if (isBodyAllowed) {
            options = {
                ...options,
                body: await request.text()
            };
        }

        return await fetch(requestUrl, options);
    }
    return await fetch(request);
};