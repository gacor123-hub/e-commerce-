// ===============================
// PENGATURAN TOKO
// ===============================

// Ganti dengan nomor WhatsApp kamu
const nomorWhatsApp = "6281234567890";


// ===============================
// DATA PRODUK
// ===============================

const products = [
    {
        id: 1,
        name: "mikrotik",
        price: 250000,
        image: "https://mikrotik.co.id/images/produk/301/besar2.jpg"
    },

    {
        id: 2,
        name: "switch",
        price: 1500000,
        image: "https://www.netgearstore.id/cdn/shop/files/MS308_Left_688x688.jpg?v=1746414533"
    },

    {
        id: 3,
        name: "router",
        price: 250000,
        image: "https://kost-net.com/wp-content/uploads/TL-WR840N_UN_6.20_01_large_1533102945398q-1-768x768.jpg"
    },

    {
        id: 4,
        name: "kabelan 1roll",
        price: 3200000,
        image: "https://mdp.co.id/_next/image?url=https%3A%2F%2Fapi.mdp.co.id%2Fupload%2Fpictures%2Fproduct%2FLN2891.jpg&w=256&q=75"
    },

    {
        id: 5,
        name: "Jam Tangan",
        price: 25000,
        image: "https://www.klikgalaxy.com/image-product/img24936-1603097812.jpg"
    },

    {
        id: 6,
        name: "Headphone",
        price: 220000,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    }
];


// ===============================
// KERANJANG
// ===============================

let cart = [];


// ===============================
// FORMAT RUPIAH
// ===============================

function formatRupiah(number) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);

}


// ===============================
// TAMPILKAN PRODUK
// ===============================

function displayProducts(data = products) {

    const productList =
        document.getElementById("productList");

    productList.innerHTML = "";

    data.forEach(product => {

        productList.innerHTML += `

            <div class="product">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div class="product-content">

                    <h3>${product.name}</h3>

                    <div class="price">
                        ${formatRupiah(product.price)}
                    </div>

                    <button
                        class="add-btn"
                        onclick="addToCart(${product.id})"
                    >
                        + Tambah ke Keranjang
                    </button>

                </div>

            </div>

        `;

    });

}


// ===============================
// TAMBAH PRODUK
// ===============================

function addToCart(id) {

    const product = products.find(
        product => product.id === id
    );

    const existing =
        cart.find(item => item.id === id);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCart();

}


// ===============================
// UPDATE KERANJANG
// ===============================

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    cartItems.innerHTML = "";


    let total = 0;
    let count = 0;


    cart.forEach(item => {

        total += item.price * item.quantity;
        count += item.quantity;


        cartItems.innerHTML += `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-info">

                    <strong>
                        ${item.name}
                    </strong>

                    <p>
                        ${formatRupiah(item.price)}
                    </p>

                    <div class="quantity">

                        <button
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            -
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                        <button
                            class="remove"
                            onclick="removeFromCart(${item.id})"
                        >
                            Hapus
                        </button>

                    </div>

                </div>

            </div>

        `;

    });


    cartCount.textContent = count;

    cartTotal.textContent =
        formatRupiah(total);

}


// ===============================
// UBAH JUMLAH
// ===============================

function changeQuantity(id, amount) {

    const item =
        cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(item => item.id !== id);

    }


    updateCart();

}


// ===============================
// HAPUS PRODUK
// ===============================

function removeFromCart(id) {

    cart =
        cart.filter(item => item.id !== id);

    updateCart();

}


// ===============================
// BUKA CART
// ===============================

function openCart() {

    document.getElementById(
        "cartModal"
    ).style.display = "block";

}


// ===============================
// TUTUP CART
// ===============================

function closeCart() {

    document.getElementById(
        "cartModal"
    ).style.display = "none";

}


// ===============================
// CHECKOUT WHATSAPP
// ===============================

function checkoutWhatsApp() {

    if (cart.length === 0) {

        alert("Keranjang masih kosong!");

        return;

    }


    let pesan =
        "Halo, saya ingin memesan:%0A%0A";


    let total = 0;


    cart.forEach(item => {

        const subtotal =
            item.price * item.quantity;

        total += subtotal;


        pesan +=
            `• ${item.name} x${item.quantity} - ${formatRupiah(subtotal)}%0A`;

    });


    pesan +=
        `%0ATotal: ${formatRupiah(total)}%0A%0A`;

    pesan +=
        "Mohon informasi untuk proses selanjutnya. Terima kasih.";


    const url =
        `https://wa.me/${nomorWhatsApp}?text=${pesan}`;


    window.open(url, "_blank");

}


// ===============================
// PENCARIAN
// ===============================

document
    .getElementById("searchInput")
    .addEventListener("input", function () {

        const keyword =
            this.value.toLowerCase();


        const filtered =
            products.filter(product =>
                product.name
                    .toLowerCase()
                    .includes(keyword)
            );


        displayProducts(filtered);

    });


// ===============================
// JALANKAN WEBSITE
// ===============================

displayProducts();
updateCart();