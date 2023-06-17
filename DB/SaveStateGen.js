





function generateGameSave(playerName, mode, items, money, score, storyDone) {
    let gameSave = {
        playerName: playerName,
        mode: mode,
        items: [],
        money: money,
        score: score,
        storyDone: storyDone
    };

    for (let i = 0; i < items.length; i++) {
        let item = {
            itemName: items[i].itemName,
            itemDurability: items[i].itemDurability,
            itemMaxDurability: items[i].itemMaxDurability,
            itemStats: {
                additionalHealth: items[i].itemStats.additionalHealth,
                jumpIncrease: items[i].itemStats.jumpIncrease,
                pushResistance: items[i].itemStats.pushResistance,
                special: items[i].itemStats.special
            }
        };
        gameSave.items.push(item);
    }

    return JSON.stringify(gameSave);
}

// Example usage:
let items = [
    {
        itemName: "Sword of Valor",
        itemDurability: 75,
        itemMaxDurability: 100,
        itemStats: {
            additionalHealth: 20,
            jumpIncrease: 1.5,
            pushResistance: 30,
            special: "Fire Damage"
        }
    },
    {
        itemName: "Shield of Aegis",
        itemDurability: 50,
        itemMaxDurability: 100,
        itemStats: {
            additionalHealth: 50,
            jumpIncrease: 0,
            pushResistance: 70,
            special: "Damage Reflection"
        }
    }
];

let gameSaveJson = generateGameSave("JohnDoe", "Story", items, 500, 1500, false);
console.log(gameSaveJson);