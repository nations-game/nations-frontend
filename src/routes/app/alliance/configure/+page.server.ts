import type { PageServerLoad } from "./$types";
import type { Actions } from "@sveltejs/kit";
import { fail, redirect } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

export const actions = {
    shout: async({ request, cookies, fetch, locals }) => {
        const data = await request.formData();
        const shout = data.get("shout") as string;
        const response = await fetch("$api/alliance/admin/shout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": locals.preparedCookie
            },
            body: JSON.stringify({
                shout_text: shout
            })
        });

        if(response.ok) {
            return redirect(302, "/app/alliance/configure");
        } else {
            return fail(400, {
                error: "Invalid info!"
            });
        }
    },

    acceptJoinRequest: async({ request, cookies, fetch, locals }) => {
        const data = await request.formData();
        const id = data.get("id") as string;
        const preparedCookie = data.get("preparedCookie") as string;

        const response = await fetch("$api/alliance/admin/acceptrequest", {
            method: "POST",
            headers: {
                "Cookie": preparedCookie
            },
            body: JSON.stringify({ "id": parseInt(id) })
        });

        const responseJson = await response.json();

        if(response.ok) {
            return redirect(302, "/app/alliance/configure");
        } else {
            return fail(400, {
                error: "Invalid info!"
            });
        }
    },

    deleteAlliance: async({ request, cookies, fetch, locals }) => {
        const data = await request.formData();
        const id = data.get("id") as string;
        const preparedCookie = data.get("preparedCookie") as string;

        const response = await fetch("$api/alliance/admin/delete", {
            method: "POST",
            headers: {
                "Cookie": preparedCookie
            },
            body: JSON.stringify({ "id": parseInt(id) })
        });

        const responseJson = await response.json();

        if(response.ok) {
            return redirect(302, "/app/alliance");
        } else {
            return fail(400, {
                error: "Didn't work :("
            });
        }
    },

    kickMember: async({ request, cookies, fetch, locals }) => {
        const data = await request.formData();
        const id = data.get("nationID") as string;
        const preparedCookie = data.get("preparedCookie") as string;

        const response = await fetch("$api/alliance/admin/kick", {
            method: "POST",
            headers: {
                "Cookie": preparedCookie
            },
            body: JSON.stringify({ "id": parseInt(id) })
        });

        if(response.ok) {
            return redirect(302, "/app/alliance/configure");
        } else {
            return fail(400, {
                error: "Invalid info!"
            });
        }
    },

    promoteToAdmin: async({ request, cookies, fetch, locals }) => {
        const data = await request.formData();
        const id = data.get("nationID") as string;
        const preparedCookie = data.get("preparedCookie") as string;

        const response = await fetch("$api/alliance/admin/promote", {
            method: "POST",
            headers: {
                "Cookie": preparedCookie
            },
            body: JSON.stringify({ "id": parseInt(id) })
        });
        
        if(response.ok) {
            return redirect(302, "/app/alliance/configure");
        } else {
            return fail(400, {
                error: "Invalid info!"
            });
        }
    },

    demoteToMember: async({ request, cookies, fetch, locals }) => {
        const data = await request.formData();
        const id = data.get("nationID") as string;
        const preparedCookie = data.get("preparedCookie") as string;

        const response = await fetch("$api/alliance/admin/demote", {
            method: "POST",
            headers: {
                "Cookie": preparedCookie
            },
            body: JSON.stringify({ "id": parseInt(id) })
        });
        
        if(response.ok) {
            return redirect(302, "/app/alliance/configure");
        } else {
            return fail(400, {
                error: "Invalid info!"
            });
        }
    },

    transferOwnership: async({ request, cookies, fetch, locals }) => {
        const data = await request.formData();
        const id = data.get("nationID") as string;
        const preparedCookie = data.get("preparedCookie") as string;

        const response = await fetch("$api/alliance/admin/transfer", {
            method: "POST",
            headers: {
                "Cookie": preparedCookie
            },
            body: JSON.stringify({ "id": parseInt(id) })
        });
        
        if(response.ok) {
            return redirect(302, "/app/alliance/configure");
        } else {
            return fail(400, {
                error: "Invalid info!"
            });
        }
    }
    
} satisfies Actions;

export const load: PageServerLoad = async ({ locals, fetch }) => {
    const preparedCookie = locals.preparedCookie;
    const allianceID = locals.user.nation.allianceID;
    
    if(allianceID === "") {
        return {
            alliance: ""
        }
    }

    const response = await fetch("$api/alliance/get", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie": locals.preparedCookie
        },
        body: JSON.stringify({ "id": allianceID })
    });

    const json = await response.json();

    let alliance = json.details;

    const membersResponse = await fetch("$api/alliance/members", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie": locals.preparedCookie
        },
        body: JSON.stringify({ "id": allianceID })
    });

    const membersJson = await membersResponse.json();
    alliance.members = membersJson.details;

    let nationRole = "";

    // Check all alliance members, if the nation is in the list set nationRole to its role in the alliance
    for(let member of alliance.members) {
        if(member.nationID == locals.user.nation.nationID) {
            nationRole = member.alliance_role;
        }
    }

    const joinRequestsReponse = await fetch("$api/alliance/admin/joinrequests", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cookie": locals.preparedCookie
        }
    });

    const joinRequestsJson = await joinRequestsReponse.json();

    return {
        alliance: alliance,
        nationRole: nationRole,
        joinRequests: joinRequestsJson,
        preparedCookie: preparedCookie
    };
};