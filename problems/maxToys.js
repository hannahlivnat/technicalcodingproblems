function maximumToys(prices, k) {
    //base cases
    if (prices.length === 0) {
        return 0;
    }

    if (prices.length > 1) {
        prices.sort((a, b) => {
            return a - b;
        }); //ascending order
    }

    let counter = 0;
    let toys = 0;
    let amountSpent = k;

    while (amountSpent >= prices[counter]) {
        amountSpent -= prices[counter];
        toys++;
        counter++;
    }

    return toys;
}
