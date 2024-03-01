export type Nation = {
    // Basic info
    name: string;
    population: number;
    flag: string | null;
    happiness: number;
    system: number;

    // Commodities
    money: number;
    food: number;
    power: number;
    buildingMaterials: number;
    metal: number;
    consumerGoods: number;

    taxesToCollect: number;

    leader: User;
}

export type User = {
    username: string;
    email: string;
    nation: Nation;
}