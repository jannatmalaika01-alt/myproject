// ================= UNIVERSAL SEARCH ==================
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".searchbar input");
    const searchResults = document.createElement("div");
    searchResults.classList.add("search-results");
    document.querySelector(".searchbar").appendChild(searchResults);

    if (searchInput) {
        searchInput.addEventListener("keyup", () => {
            const filter = searchInput.value.toLowerCase();
            searchResults.innerHTML = "";

            if (filter) {
                const filtered = products.filter(p =>
                    p.name.toLowerCase().includes(filter) ||
                    p.category.toLowerCase().includes(filter) ||
                    p.description.toLowerCase().includes(filter)
                );

                if (filtered.length === 0) {
                    searchResults.innerHTML = `<p>No products found.</p>`;
                } else {
                    filtered.forEach(p => {
                        const item = document.createElement("div");
                        item.classList.add("search-item");
                        item.innerHTML = `
                            <a href="${p.link}">
                                <img src="${p.image}" alt="${p.name}" width="50">
                                <span>${p.name} - ${p.category} - $${p.price}</span>
                            </a>
                        `;
                        searchResults.appendChild(item);
                    });
                }
            }
        });
    }

    // ================= CART ==================
    const cartTab = document.querySelector(".cart-tab");
    const cartIcon = document.querySelector(".bagitems");
    const closeBtn = document.querySelector(".close");
    const listcart = document.querySelector(".listcart");
    const addToBagBtn = document.querySelector(".add-to-bag");

    // Only initialize cart functionality if elements exist
    if (cartTab && cartIcon && closeBtn && listcart) {
        // Create subtotal element and insert it after the listcart and before the buttons
        const subtotalDiv = document.createElement("div");
        subtotalDiv.classList.add("subtotal");
        subtotalDiv.style.fontWeight = "bold";
        subtotalDiv.style.padding = "10px 0";
        subtotalDiv.style.margin = "10px 0";
        subtotalDiv.style.borderTop = "1px solid #ddd";
        
        // Insert the subtotal after the listcart and before the buttons
        const btnContainer = cartTab.querySelector(".btn");
        if (btnContainer) {
            cartTab.insertBefore(subtotalDiv, btnContainer);
        }

        cartIcon.addEventListener("click", () => {
            cartTab.style.right = "0";
        });
        
        closeBtn.addEventListener("click", () => {
            cartTab.style.right = "-400px";
        });

        function getCart() {
            return JSON.parse(localStorage.getItem("cart")) || [];
        }

        function saveCart(cart) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }

        function updateSubtotal() {
            const cart = getCart();
            const subtotal = cart.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
            subtotalDiv.textContent = "Subtotal: $" + subtotal.toFixed(2);
        }

        function renderCart() {
            const cart = getCart();
            listcart.innerHTML = "";

            cart.forEach(itemData => {
                const item = document.createElement("div");
                item.classList.add("item");
                const totalPrice = itemData.unitPrice * itemData.quantity;

                item.innerHTML = `
                    <img src="${itemData.img}" alt="${itemData.name}">
                    <div class="name">${itemData.name}</div>
                    <div class="size">Size: ${itemData.size || 'One Size'}</div>
                    <div class="quantity">
                        <span class="minus">-</span>
                        <span class="qty">${itemData.quantity}</span>
                        <span class="plus">+</span>
                    </div>
                    <div class="price">$${totalPrice.toFixed(2)}</div>
                    <div class="deleteitems"><img src="crossitems.png" alt="Delete" class="delete-icon"></div>
                `;

                const qtySpan = item.querySelector(".qty");
                const priceDiv = item.querySelector(".price");

                item.querySelector(".minus").addEventListener("click", () => {
                    if (itemData.quantity > 1) {
                        itemData.quantity--;
                        qtySpan.textContent = itemData.quantity;
                        priceDiv.textContent = "$" + (itemData.unitPrice * itemData.quantity).toFixed(2);
                        saveCart(cart);
                        updateSubtotal();
                        if (typeof renderCheckoutTable === "function") {
                            renderCheckoutTable();
                        }
                    }
                });

                item.querySelector(".plus").addEventListener("click", () => {
                    itemData.quantity++;
                    qtySpan.textContent = itemData.quantity;
                    priceDiv.textContent = "$" + (itemData.unitPrice * itemData.quantity).toFixed(2);
                    saveCart(cart);
                    updateSubtotal();
                    if (typeof renderCheckoutTable === "function") {
                        renderCheckoutTable();
                    }
                });

                item.querySelector(".deleteitems").addEventListener("click", () => {
                    const newCart = cart.filter(i => !(i.name === itemData.name && i.size === itemData.size));
                    saveCart(newCart);
                    renderCart();
                    updateSubtotal();
                    if (typeof renderCheckoutTable === "function") {
                        renderCheckoutTable();
                    }
                });

                listcart.appendChild(item);
            });

            updateSubtotal();
        }

        // Function to add product to cart from product cards
        function addProductToCart(productName, productPrice, productImg, quantity = 1, size = 'One Size') {
            const cart = getCart();
            const existingItem = cart.find(i => i.name === productName && i.size === size);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    name: productName,
                    unitPrice: productPrice,
                    img: productImg,
                    quantity,
                    size
                });
            }

            saveCart(cart);
            renderCart();
            cartTab.style.right = "0";
            if (typeof renderCheckoutTable === "function") {
                renderCheckoutTable();
            }
            
            // Show confirmation message
            //alert(`Added ${productName} to cart!`);
        }

        // Handle "Add to Bag" button on product detail page
        if (addToBagBtn) {
            addToBagBtn.addEventListener("click", () => {
                const productName = document.querySelector(".product-info h1").textContent;
                const productPrice = parseFloat(document.querySelector(".product-info p strong").nextSibling.textContent.trim().replace("$", ""));
                const productImg = document.querySelector(".product-image img").src;
                const quantity = parseInt(document.querySelector("#qty").value);
                const size = document.querySelector("#size").value;

                addProductToCart(productName, productPrice, productImg, quantity, size);
            });
        }

        // Handle cart buttons on product cards
        const cartButtons = document.querySelectorAll(".cart-btn");
        cartButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                e.preventDefault();
                
                // Find the product card
                const productCard = button.closest(".product-card");
                
                // Extract product information
                const productName = productCard.querySelector("h3").textContent;
                const productPrice = parseFloat(productCard.querySelector(".price").textContent.replace("$", ""));
                const productImg = productCard.querySelector("img").src;
                
                // Add to cart with default values
                addProductToCart(productName, productPrice, productImg);
            });
        });

        renderCart();
        updateSubtotal();
    }
});

// ================= CHECKOUT ==================
const codFee = 50;
const cartItemsContainer = document.getElementById('cartItems');
const totalAmountEl = document.getElementById('totalAmount');
const finalAmountEl = document.getElementById('finalAmount');

function renderCheckoutTable() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartTotal = 0;

    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            let html = `
                <table border="1" cellpadding="10" cellspacing="0" width="100%">
                    <tr>
                        <th>Product</th>
                        <th>Size</th>
                        <th>Quantity</th>
                        <th>Subtotal ($)</th>
                    </tr>
            `;

            cart.forEach(item => {
                const subtotal = item.unitPrice * item.quantity;
                cartTotal += subtotal;
                html += `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.size}</td>
                        <td>${item.quantity}</td>
                        <td>${subtotal.toFixed(2)}</td>
                    </tr>
                `;
            });

            html += `</table>`;
            cartItemsContainer.innerHTML = html;
        }
    }

    if (totalAmountEl) totalAmountEl.textContent = cartTotal.toFixed(2);
    if (finalAmountEl) finalAmountEl.textContent = (cartTotal + codFee).toFixed(2);
}

// ================= CHECKOUT FORM SUBMISSION ==================
const checkoutForm = document.getElementById('checkoutForm');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Prevent checkout if cart is empty
        if (cart.length === 0) {
            alert("Your cart is empty! Please add items to your cart before checking out.");
            return false;
        }
        
        try {
            // Prepare order data
            const orderData = {
                firstName: this.firstName.value,
                lastName: this.lastName.value,
                email: this.email.value,
                phone: this.phone.value,
                address: this.address.value,
                city: this.city.value,
                zipCode: this.zip.value,
                items: cart.map(item => ({
                    productName: item.name,
                    size: item.size || 'One Size',
                    quantity: item.quantity,
                    unitPrice: item.unitPrice
                }))
            };
            
            // Send order to backend
            const response = await fetch('http://localhost:8080/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });
            
            if (response.ok) {
                const orderResponse = await response.json();
                
                // Clear the cart
                localStorage.removeItem('cart');
                
                // Show success message with order number
                alert(`✅ Order placed successfully! Your order number is: ${orderResponse.orderNumber}`);
                
                // Optionally redirect to confirmation page
                // window.location.href = `order-confirmation.html?orderNumber=${orderResponse.orderNumber}`;
            } else {
                throw new Error('Failed to place order');
            }
            
        } catch (error) {
            console.error('Error placing order:', error);
            alert('❌ Failed to place order. Please try again.');
        }
    });
}

// Also update your existing checkout button handler
const checkoutBtnFinal = document.querySelector(".check-out");
if (checkoutBtnFinal) {
    checkoutBtnFinal.addEventListener("click", (e) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if(cart.length === 0){
            e.preventDefault();
            alert("Your cart is empty! Please add items to your cart before checking out.");
        }
    });
}

// Prevent direct access to checkout page with empty cart
if (window.location.pathname.includes('checkout.html')) {
    document.addEventListener("DOMContentLoaded", () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert("Your cart is empty! Redirecting to home page.");
            window.location.href = "index.html";
        }
    });
}

// Initial render
renderCheckoutTable();

// ================= SLIDER ==================
const slider = document.querySelector('.product-slider');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

if (slider && nextBtn && prevBtn) {
    const scrollAmount = 200;

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    prevBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
}
// Add this to your script.js for optional search expansion
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.searchbar input[type="text"]');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                searchInput.style.display = searchInput.style.display === 'block' ? 'none' : 'block';
                if (searchInput.style.display === 'block') {
                    searchInput.focus();
                }
            }
        });
        
        // Close search when clicking outside
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && 
                !searchBtn.contains(e.target) && 
                !searchInput.contains(e.target) &&
                searchInput.style.display === 'block') {
                searchInput.style.display = 'none';
            }
        });
    }
});
// Add this to your script.js for mobile dropdowns
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Function to close all dropdowns
    function closeAllDropdowns() {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
    
    // Mobile dropdown handling
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        
        if (dropbtn) {
            dropbtn.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && !e.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });
    
    // Close dropdowns on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllDropdowns();
        }
    });
    
    // Close dropdowns on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeAllDropdowns();
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slide");
  const nextBtn = document.querySelector(".hero-next");
  const prevBtn = document.querySelector(".hero-prev");
  let current = 0;
  let autoSlide;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      slide.querySelector("video").pause();
      if (i === index) {
        slide.classList.add("active");
        const vid = slide.querySelector("video");
        vid.currentTime = 0;
        vid.play();
      }
    });
  }

  nextBtn.addEventListener("click", () => {
    current = (current + 1) % slides.length;
    showSlide(current);
    resetAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
    resetAutoSlide();
  });

  function startAutoSlide() {
    autoSlide = setInterval(() => {
      current = (current + 1) % slides.length;
      showSlide(current);
    }, 6000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  showSlide(current);
  startAutoSlide();
});

// ================= HOME LINK FIX ==================
document.addEventListener('DOMContentLoaded', function() {
    // Fix for HOME link to ensure it works properly
    const homeLinks = document.querySelectorAll('a.dropbtn[href="index.html"], a[href="index.html"]');
    
    homeLinks.forEach(homeLink => {
        // Remove any existing click listeners that might be preventing navigation
        const newHomeLink = homeLink.cloneNode(true);
        homeLink.parentNode.replaceChild(newHomeLink, homeLink);
        
        // Add a clean click listener that allows normal navigation
        newHomeLink.addEventListener('click', function(e) {
            // Don't prevent default - allow the link to work normally
            console.log('HOME link clicked - allowing navigation to index.html');
        });
    });
    
    console.log('HOME link fix applied');
});