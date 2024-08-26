import { error } from "@sveltejs/kit";

export async function load({ params, fetch, locals }) {
    const preparedCookie = locals.preparedCookie;
    const allianceID = params.id;
    const allianceResponse = await fetch("$api/alliance/get", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie": `${preparedCookie}`
        },
        body: JSON.stringify({ "id": parseInt(allianceID) })
    });

    const allianceJson = await allianceResponse.json();
    let alliance = allianceJson.details;

    const membersResponse = await fetch("$api/alliance/members", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie": `${preparedCookie}`
        },
        body: JSON.stringify({ "id": parseInt(allianceID) })
    });

    const membersJson = await membersResponse.json();
    alliance.members = membersJson.details;
    
    return {
        preparedCookie: preparedCookie,
        alliance: alliance
    }
}