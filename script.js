let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

function addCart(name, price) {
    if (!name || name.trim() === "") {
        alert("Invalid chocolate name");
        return;
    }

    if (isNaN(price) || price <= 0) {
        alert("Invalid chocolate price");
        return;
    }

    cart.push({ name: name, price: Number(price) });
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty");
        return;
    }

    window.location.href = "order.html";
}

function showCart() {
    let list = document.getElementById("cart-list");

    if (list === null) {
        return;
    }

    list.innerHTML = "";
    total = 0;

    for (let i = 0; i < cart.length; i++) {
        if (!cart[i].name || isNaN(cart[i].price)) {
            alert("Invalid cart item detected");
            return;
        }

        let item = document.createElement("li");
        item.textContent = cart[i].name + " - RM" + cart[i].price.toFixed(2);
        list.appendChild(item);

        total += cart[i].price;
    }

    document.getElementById("count").textContent = cart.length;
    document.getElementById("total").textContent = total.toFixed(2);
}

function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
    showCart();
}

function saveOrder(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let phoneNum = document.getElementById("phoneNum").value.trim();
    let address = document.getElementById("address").value.trim();

    if (cart.length === 0) {
        alert("Please add at least one chocolate");
        return;
    }
    else if (name === "" || phoneNum === "" || address === "") {
        alert("Please fill in all required fields");
        return;
    }
    else if (!isNaN(name)) {
        alert("Please enter a valid name");
        return
    }
    else if (!/^[0-9]{10,11}$/.test(phoneNum)) {
        alert("Please enter a valid phone number");
        return;
    }

    let order = {
        type: "cart",
        name: name,
        phoneNum: phoneNum,
        address: address,
        items: cart
    };

    try {
        localStorage.setItem("order", JSON.stringify(order));
        localStorage.removeItem("cart");
        window.location.href = "confirmOrder.html";
    } catch (error) {
        alert("Unable to save your order. Please try again.");
    }
}

function saveCustomOrder(event) {
    event.preventDefault();

    let name = document.getElementById("customName").value.trim();
    let phoneNum = document.getElementById("customPhoneNum").value.trim();
    let address = document.getElementById("customAddress").value.trim();
    let flavor = document.getElementById("customFlavor").value;
    let topping = document.getElementById("customTopping").value;
    let shape = document.getElementById("customShape").value;
    let size = document.getElementById("customSize").value;

    if (name === "" || phoneNum === "" || address === "" || flavor === "" || topping === "" || shape === "" || size === "") {
        alert("Please fill in all required fields");
        return;
    }
    else if (!isNaN(name)) {
        alert("Please enter a valid name");
        return
    }
    else if (!/^[0-9]{10,11}$/.test(phoneNum)) {
        alert("Please enter a valid phone number");
        return;
    }

    let order = {
        type: "custom",
        name: name,
        phoneNum: phoneNum,
        address: address,
        flavor: flavor,
        topping: topping,
        shape: shape,
        size: size,
        event: document.getElementById("customEvent").value,
        message: document.getElementById("customMessage").value
    };

    try {
        localStorage.setItem("order", JSON.stringify(order));
        window.location.href = "confirmOrder.html";
    } catch (error) {
        alert("Unable to save your custom order. Please try again.");
    }
}

function contact(event) {

    event.preventDefault();

    let name = document.getElementById("customerName").value.trim();
    let email = document.getElementById("customerEmail").value.trim();
    let phone = document.getElementById("customerPhone").value.trim();
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || phone === "" || subject === "" || message === "") {
        alert("Please fill in all fields!");
    }
    else if (!isNaN(name)) {
        alert("Please enter a valid name");
        return;
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address!");
        return;
    }
    else if (!/^[0-9]{10,11}$/.test(phone)) {
        alert("Please enter a valid phone number!");
        return
    }
    else {
        alert("Thank you, " + name + "! Your message has been submitted.");
        document.getElementById("contactForm").reset();
    }

};

window.onload = function () {
    try {
        let savedCart = localStorage.getItem("cart");

        cart = savedCart ? JSON.parse(savedCart) : [];

        if (!Array.isArray(cart)) {
            cart = [];
        }

        if (document.getElementById("cart-list") !== null) {
            showCart();
        }
    } catch (error) {
        cart = [];
        localStorage.removeItem("cart");
        alert("Unable to load cart data");
    }
};