document.getElementById("subscribeBtn").addEventListener("click", async () => {
    const email = document.getElementById("emailInput").value;
    if (!email) {
        alert("Please enter an email.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error("Error:", error);
        alert("Subscription failed.");
    }
});

document.getElementById("addProductBtn").addEventListener("click", async () => {
    const productName = document.getElementById("productInput").value;
    if (!productName) {
        alert("Please enter a product name.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/add-product", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: productName }),
        });

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to add product.");
    }
});
