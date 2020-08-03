// Fibonnaci Sequence

function fib(n) {
    const series = [0, 1];
    // Compute the nth Fibonacci number
    if (n > 0) {
        if (n == 1) {
            return 1;
        }
        for (i = 2; i <= n; i++) {
            const sum = parseInt(series[i - 1]) + parseInt(series[i - 2]);
            series.push(sum);
            console.log(series);
        }
        return series[series.length - 1];
    }

    return 0;
}