import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals, fetch }) => {
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
        console.log(member.nationID, locals.user.nation.nationID)
        if(member.nationID == locals.user.nation.nationID) {
            nationRole = member.alliance_role;
        }
    }

    return {
        preparedCookie: locals.preparedCookie,
        alliance: alliance,
        nationRole: nationRole
    };
};