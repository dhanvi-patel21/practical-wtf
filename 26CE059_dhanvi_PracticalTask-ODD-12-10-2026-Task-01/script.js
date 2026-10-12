// Format amounts in Indian Rupees
function formatCurrency(amount) {
    return amount.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2
    });
}

// M6: Calculate the scholarship discount amount
function calculateDiscount(amount, percentage) {
    return amount * percentage / 100;
}

// D1: Return the scholarship rate
function getRate(type) {
    if (type === "Merit") {
        return 20;
    } else if (type === "Sports") {
        return 10;
    } else {
        return 0;
    }
}

// D2: Calculate the final semester fee
function calculateTotal(subtotal, discount, adminCharge) {
    return subtotal - discount + adminCharge;
}

// D3: Build the cumulative semester breakdown
function buildBreakdown(payable, count) {
    const items = [];

    for (let semester = 1; semester <= count; semester++) {
        const cumulative = payable * semester;

        items.push(
            `Semester ${semester}: ${formatCurrency(payable)} | ` +
            `Cumulative fee: ${formatCurrency(cumulative)}`
        );
    }

    return items;
}

// Calculate fees when the form is submitted
document.getElementById("fee-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // S5: Convert input strings to numbers
    const tuition = Number(document.getElementById("tuition").value);
    const lab = Number(document.getElementById("lab").value);
    const semesters = Number(document.getElementById("semesters").value);

    const scholarship = document.getElementById("scholarship").value;

    // Validate input values
    if (
        !Number.isFinite(tuition) ||
        !Number.isFinite(lab) ||
        tuition < 0 ||
        lab < 0 ||
        !Number.isInteger(semesters) ||
        semesters < 1 ||
        semesters > 100
    ) {
        alert("Enter valid non-negative fees and between 1 and 100 semesters.");
        return;
    }

    const subtotal = tuition + lab;

    const rate = getRate(scholarship);
    const discount = calculateDiscount(subtotal, rate);

    // S6: Administration charge is 5% of subtotal
    const adminCharge = subtotal * 0.05;

    const payable = calculateTotal(
        subtotal,
        discount,
        adminCharge
    );

    // Display the results
    document.getElementById("subtotal").textContent =
        formatCurrency(subtotal);

    document.getElementById("discount").textContent =
        formatCurrency(discount);

    document.getElementById("admin").textContent =
        formatCurrency(adminCharge);

    document.getElementById("payable").textContent =
        formatCurrency(payable);

    // Display semester-wise cumulative fees
    const breakdownList = document.getElementById("breakdown");
    breakdownList.replaceChildren();

    const breakdown = buildBreakdown(payable, semesters);

    for (const item of breakdown) {
        const li = document.createElement("li");
        li.textContent = item;
        breakdownList.appendChild(li);
    }
});

// Automatically display the default test case
document.getElementById("fee-form").requestSubmit();