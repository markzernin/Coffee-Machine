const input = require('sync-input')

let info = (available) => {
    return `The coffee machine has:
${available.water} ml of water
${available.milk} ml of milk
${available.beans} g of coffee beans
${available.smallCups} small disposable cups
${available.mediumCups} medium disposable cups
${available.largeCups} large disposable cups
$${available.money} of money`;
}

let buyCoffee = (available) => {
    let water, milk, beans;
    let ingredients = [
        {
            name: "espresso",
            water: 250,
            beans: 16,
            cost: 4
        },
        {
            name: "latte",
            water: 350,
            milk: 75,
            beans: 20,
            cost: 7
        },
        {
            name: "cappuccino",
            water: 200,
            milk: 100,
            beans: 12,
            cost: 6
        }
    ];
    let errorMessage = "I have enough resources, making you a coffee!";
    let buyChoice = Number(input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino:\n"));
    let cupChoice = input("Select cup size: small, medium, large\n");
    if (cupChoice === "small") {
        if (available.smallCups === 0) {
            console.log("This size is not available");
            return available;
        }
    } else if (cupChoice === "medium") {
        if (available.mediumCups === 0) {
            console.log("This size is not available");
            return available;
        }
    } else if (cupChoice === "large") {
        if (available.largeCups === 0) {
            console.log("This size is not available");
            return available;
        }
    }
    if (buyChoice === 1) {
        water = ingredients[0].water;
        beans = ingredients[0].beans;
        if (available.water >= water && available.beans >= beans) {
            available.water -= ingredients[0].water;
            available.beans -= ingredients[0].beans;
            available[cupChoice + "Cups"] -= 1;
            available.money += ingredients[0].cost;
        } else {
            console.log(errorMessage);
        }
    } else if (buyChoice === 2) {
        water = ingredients[1].water;
        beans = ingredients[1].beans;
        milk = ingredients[1].milk;
        if (available.water >= water && available.beans >= beans) {
            if (available.milk >= milk) {
                available.water -= water;
                available.milk -= milk;
                available.beans -= beans;
                available[cupChoice + "Cups"] -= 1;
                available.money += ingredients[1].cost;
            } else {
                console.log(errorMessage);
            }
        } else {
            console.log(errorMessage);
        }
    } else if (buyChoice === 3) {
        water = ingredients[2].water;
        beans = ingredients[2].beans;
        milk = ingredients[2].milk;
        if (available.water >= water && available.beans >= beans) {
            if (available.milk >= milk) {
                available.water -= water;
                available.milk -= milk;
                available.beans -= beans;
                available[cupChoice + "Cups"] -= 1;
                available.money += ingredients[2].cost;
            } else {
                console.log(errorMessage);
            }
        } else {
            console.log(errorMessage);
        }
    }
    return available;
}
let fillIngredients = (available) => {
    let userChoice = input("What would you like to add?\n" +
        "You can add water, milk, coffee beans, different cup sizes " +
        "(from small to large)\n" +
        "To exit to the main menu, type \"menu\".\n");
    if (userChoice === "cups") {
        let cupsChoice = input("Select cup size: small, medium, large\n");
        if (cupsChoice === "small") available.smallCups += Number(input("Write how many small cups you want to add:\n"));
        if (cupsChoice === "medium") available.mediumCups += Number(input("Write how many medium cups you want to add:\n"));
        if (cupsChoice === "large") available.largeCups += Number(input("Write how many large cups you want to add:\n"));
    } else if (userChoice === "water") {
        available.water += Number(input("Write how many ml of water you want to add:\n"));
    } else if (userChoice === "milk") {
        available.milk += Number(input("Write how many ml of milk you want to add:\n"));
    } else if (userChoice === "beans") {
        available.beans += Number(input("Write how many grams of coffee beans you want to add:\n"));
    } else if (userChoice === "menu") {
        coffeeMachine();
    }
    return available;
}
let takeMoney = (money) => {
    let userChoice = Number(input("How much money do you want to withdraw from the cash register?\n"));
    if (userChoice > money) {
        console.log("Not enough money");
        return money;
    } else {
        console.log(`I gave you $${userChoice};`);
        return money - userChoice;
    }
}

let coffeeMachine = () => {
    let available = {
        water: 400,
        milk: 540,
        beans: 120,
        smallCups: 9,
        mediumCups: 5,
        largeCups: 2,
        money: 550
    };
    let userChoice = "";
    while (userChoice !== "exit") {
        userChoice = input("Write action (buy, fill, take, remaining, exit):\n");
        if (userChoice === "buy") {
            available = buyCoffee(available);
        } else if (userChoice === "fill") {
            available = fillIngredients(available);
        } else if (userChoice === "take") {
            available.money = takeMoney(available.money);
        } else if (userChoice === "remaining") {
            console.log(info(available));
        }
    }
}
coffeeMachine();
