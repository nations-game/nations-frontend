import { error } from "@sveltejs/kit";

export async function load({ params, fetch, locals }) {
    const preparedCookie = locals.preparedCookie;
    const nationId = params.id;
    const nationResponse = await fetch("$api/nation/get", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie": `sessionid=${preparedCookie}`
        },
        body: JSON.stringify({ "id": parseInt(nationId) })
    });

    let nation: any = {};
    const nationJson = await nationResponse.json();
    console.log(nationJson.details)
    nation = nationJson.details;

    return {
        "id": nationId,
        "nation": nation,
        "preparedCookie": preparedCookie
    }
}