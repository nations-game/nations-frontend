export const getIconFromCommodity = (commodity: string) => {
    switch(commodity) {
        case "money":
            return "/icons/money_icon.png";
        case "food":
            return "/icons/food_icon.png";
        case "power":
            return "/icons/power_icon.png";
        case "building_materials":
            return "/icons/bm_icon.png";
        case "metal":
            return "/icons/metal_icon.png";
        case "consumer_goods":
            return "/icons/cg_icon.png";
        case "unused_land":
            return "/icons/land_icon.png";
    }
}


export const formatNumber = (num: number) => {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + "k";
    } else {
        return num.toString();
    }
}