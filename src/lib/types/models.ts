export type Nation = {
    // Basic info
    name: string;
    population: number;
    flag: string | null;
    happiness: number;
    system: number;
    nationID: number;
    leaderID: number;

    // Commodities
    money: number;
    food: number;
    power: number;
    buildingMaterials: number;
    metal: number;
    consumerGoods: number;
    land: number;
    unusedLand: number;

    pendingTaxes: number;

    leader: User;

    factories: any;

    allianceID: string;
}

export type User = {
    username: string;
    email: string;
    nation: Nation;
}