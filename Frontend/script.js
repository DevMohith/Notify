const backendUrl = "http://localhost:5000";

document.getElementById("subscribeBtn").addEventListener("click", async () => {
    const email = document.getElementById("emailInput").value;
    if (!email) {
        alert("Please enter an email.");
        return;
    }

    try {
        const response = await fetch(`${backendUrl}/subscribe`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error("Subscription failed");
        }

        const result = await response.json();
        alert(result.message);

    
        launchConfetti();
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
        const response = await fetch(`${backendUrl}/add-product`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: productName }),
        });

        if (!response.ok) {
            throw new Error("Failed to add product");
        }

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to add product.");
    }
});

function launchConfetti() {
    var duration = 2 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 15,
            origin: { x: Math.random(), y: Math.random() * 0.6 },
            colors: ['#ff0000', '#00ff00', '#0000ff'],
            spread: 100,
            angle: 90,
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}
