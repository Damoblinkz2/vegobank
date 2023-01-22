"use strict";

/////////////////////////////////////////////////
///////////////////////////////////////////////
//THINGS TO IMPLEMENT LATER
//proper login and sign up page
//moment.js for the date and time
// money rate convertion
//backend script to save and implement data
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  usdRate: 0.92,
  locale: "en-GB", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  usdRate: 1,
  locale: "en-US",
};
const account3 = {
  owner: "Usain Bolt",
  movements: [5000, 3400, -150, -500, -3000, -1000, 8900, -30],
  interestRate: 1.5,
  pin: 3333,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2023-01-17T12:01:20.894Z",
  ],
  currency: "GBP",
  usdRate: 0.81,
  locale: "en-US",
};

const account4 = {
  owner: "Adedamola Olatomide",
  movements: [50000, 34000, -1500, -5000, -3000, -1000, 89000, -3000],
  interestRate: 1.8,
  pin: 4444,

  movementsDates: [
    "2021-11-01T13:15:33.035Z",
    "2021-11-30T09:48:16.867Z",
    "2022-12-25T06:04:23.907Z",
    "2022-01-25T14:18:46.235Z",
    "2022-02-05T16:33:06.386Z",
    "2022-04-10T14:43:26.374Z",
    "2023-01-12T18:49:59.371Z",
    "2023-01-17T12:01:20.894Z",
  ],
  currency: "NGN",
  usdRate: 454.56,
  locale: "en-US",
};

const account5 = {
  owner: "Adedamola Olatomide",
  movements: [50000, 5300, -1500, -5000, -700, -1000, 89000, -15000],
  interestRate: 1.8,
  pin: 5555,

  movementsDates: [
    "2021-11-01T13:15:33.035Z",
    "2021-11-30T09:48:16.867Z",
    "2022-12-25T06:04:23.907Z",
    "2022-01-25T14:18:46.235Z",
    "2022-02-05T16:33:06.386Z",
    "2022-04-10T14:43:26.374Z",
    "2023-01-10T18:49:59.371Z",
    "2023-01-11T12:01:20.894Z",
  ],
  currency: "NGN",
  usdRate: 454.56,
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4, account5];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
// Functions

// FUNCTION FOR NUMBER INTERNATIONALIZATION ACCORDING TO USERS LOCATION
const allNUmINt = (userObject, value) => {
  return new Intl.NumberFormat(userObject.locale, {
    style: "currency",
    currency: userObject.currency,
  }).format(value);
};

// DISPLAY MOVEMENT
const displayMovements = (acc, sort = false) => {
  // containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);
    const displayDate = `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${allNUmINt(
          acc,
          Math.abs(mov.toFixed(2))
        )}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// CALCULATE BALANCE
const calcDisplayBalance = (acc) => {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = allNUmINt(acc, acc.balance.toFixed(2));
};

// CALCULATE THE MONEY FLOW
const calcDisplaySummary = (acc) => {
  // calc all money in
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = allNUmINt(acc, incomes.toFixed(2));

  // calc all money out
  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = allNUmINt(acc, Math.abs(out).toFixed(2));

  // calc interest flow
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = allNUmINt(acc, interest.toFixed(2));
};

// ADD USERNAME FROM OWNERS INITIALS TO THE OBJECT
const createUsernames = (accs) => {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// FUNCTION FOR INACTIVE TIMEOUT

const inactiveTimeOut = () => {
  // set timer
  let time = 300;

  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // print timer to the UI
    labelTimer.textContent = `${min}:${sec}`;

    // when 0 sec,log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    // decrease every sec
    time--;
  };

  // call timer every sec
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// DATE AS AT LOGIN TIME
const now = new Date();
// internationalizing date format
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  weekday: "long",
  month: "long",
  year: "numeric",
};

const locale = navigator.language;
labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

// LOGIN IMPLEMENTATION
btnLogin.addEventListener("click", (e) => {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // countdown
    if (timer) clearInterval(timer);
    timer = inactiveTimeOut();

    // Update UI
    updateUI(currentAccount);
  }
});

// TRANSFER IMPLEMENTATION
btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // currency rate convertion
    if (currentAccount.currency === "NGN" && receiverAcc.currency === "USD") {
      // Doing the transfer
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(
        (amount / currentAccount.usdRate) * receiverAcc.usdRate
      );
    } else if (
      currentAccount.currency === "USD" &&
      receiverAcc.currency === "NGN"
    ) {
      // Doing the transfer
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(
        (amount / currentAccount.usdRate) * receiverAcc.usdRate
      );
    } else if (
      currentAccount.currency === "EUR" &&
      receiverAcc.currency === "NGN"
    ) {
      // Doing the transfer
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(
        (amount / currentAccount.usdRate) * receiverAcc.usdRate
      );
    } else if (
      currentAccount.currency === "NGN" &&
      receiverAcc.currency === "EUR"
    ) {
      // Doing the transfer
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(
        (amount * currentAccount.usdRate) / receiverAcc.usdRate
      );
    } else if (
      currentAccount.currency === "GBP" &&
      receiverAcc.currency === "USD"
    ) {
      // Doing the transfer
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(
        (amount / currentAccount.usdRate) * receiverAcc.usdRate
      );
    } else if (
      currentAccount.currency === "USD" &&
      receiverAcc.currency === "GBP"
    ) {
      // Doing the transfer
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(
        (amount * currentAccount.usdRate) / receiverAcc.usdRate
      );
    } else if (
      currentAccount.currency === "GBP" &&
      receiverAcc.currency === "EUR"
    ) {
      // Doing the transfer
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(
        (amount / currentAccount.usdRate) * receiverAcc.usdRate
      );
    } else {
      // Doing the transfer
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(
        (amount * currentAccount.usdRate) / receiverAcc.usdRate
      );
    }

    // add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // reset timer
    clearInterval(timer);
    timer = inactiveTimeOut();
  }
});

// LOAN IMPLEMENTATION
btnLoan.addEventListener("click", (e) => {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(() => {
      // Add movement
      currentAccount.movements.push(amount);

      // add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 3000);
  }
  inputLoanAmount.value = "";

  // reset timer
  clearInterval(timer);
  timer = inactiveTimeOut();
});

// CLOSING CURRENT ACCOUNT
btnClose.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

// SORTING OF THE MOVEMENT

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
