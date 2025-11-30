const isPrime = (n) => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
};

const numbers = [1, 2, 3, 4, 5, 10, 13, 17, 20];

const primeNumbers = numbers.filter(num => isPrime(num));

console.log(primeNumbers);   // [2, 3, 5, 13, 17]



