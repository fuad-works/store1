// في ملف myFunctions.js
document.addEventListener("DOMContentLoaded", function () {
  const captchaContainer = document.getElementById("captcha-container");

  // قائمة المنتجات
  const products = [
    { name: "مفك كهربائي", price: 25000 },
    { name: "مكواة كهربائية", price: 18000 },
    { name: "مروحة كهربائية", price: 35000 },
    { name: "شاحن جوال", price: 12000 },
    { name: "لمبة LED ذكية", price: 28000 },
    { name: "غسالة كهربائية", price: 55000 },
    { name: "فرن كهربائي", price: 48000 },
    { name: "مروحة سقف كهربائية", price: 42000 },
    { name: "مكيف هواء", price: 85000 },
    { name: "خلاط كهربائي", price: 30000 },
  ];

  // سلة التسوق
  const cart = [];

  // جدول عرض المنتجات
  const productsTable = document.querySelector("table");

  // جدول عرض منتجات السلة
  const cartTable = document.getElementById("cart-table");
  const cartBody = document.getElementById("cart-body");
  const totalCell = document.getElementById("total-cell");
  const taxCell = document.getElementById("tax-cell");
  const grandTotalCell = document.getElementById("grand-total-cell");

  // إضافة الصفوف إلى جدول عرض المنتجات
  products.forEach((product, index) => {
    const row = productsTable.insertRow(index);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);

    cell1.textContent = product.name;
    cell2.textContent = "تفاصيل ومواصفات";
    cell3.textContent = product.price;
    cell4.innerHTML = `<img src="attached/images/product${
      index + 1
    }.jpg" alt="${product.name}" width="100" height="100">`;
    cell5.innerHTML = `<button onclick="addToCart(${index})">أضف إلى السلة</button>`;
  });

  // زر متابعة
  const continueButton = document.getElementById("continue-button");
  continueButton.addEventListener("click", showOrderForm);

  // زر إلغاء
  const cancelButton = document.getElementById("cancel-button");
  cancelButton.addEventListener("click", cancelOrder);

  // زر شراء
  const purchaseButton = document.getElementById("purchase-button");
  purchaseButton.addEventListener("click", submitOrder);

  function showOrderForm() {
    const orderForm = document.getElementById("order-form");
    orderForm.style.display = "block";
  }

  function submitOrder() {
    if (validateOrderForm()) {
      displayInvoice();
    }
  }

  function displayInvoice() {
    alert("تمت عملية الشراء بنجاح. المجموع النهائي: " + grandTotalCell.textContent);
  }

  let num1 = Math.floor(Math.random() * 10);
  let num2 = Math.floor(Math.random() * 10);

  generateCaptcha();

  // زر تحديث الCaptcha
  const refreshButton = document.getElementById("refresh-captcha");
  refreshButton.addEventListener("click", function () {
    generateCaptcha();
  });


  function generateCaptcha() {
    // إنشاء رقمين عشوائيين للCaptcha
    num1 = Math.floor(Math.random() * 10);
    num2 = Math.floor(Math.random() * 10);

    // عرض الرقمين في الواجهة

    captchaContainer.innerHTML = `<p>حل المعادلة التالية: ${num1} + ${num2} = <input type="text" id="captcha-input" required></p>`;
  }

  function validateOrderForm() {
    const captchaInput = document.getElementById("captcha-input");
    const userAnswer = parseInt(captchaInput.value, 10);

    if (userAnswer != (num1 + num2)) {
      // إذا كانت الإجابة خاطئة، أعد إنشاء Captcha وقدم تنبيه
      alert("الرجاء إدخال الإجابة الصحيحة.");
      generateCaptcha();
      return false;
    }

    const fullname = document.getElementById("fullname").value;
    const nationalId = document.getElementById("national-id").value;
    const birthdate = document.getElementById("birthdate").value;
    const mobile = document.getElementById("mobile").value;
    const email = document.getElementById("email").value;

    // التحقق من الإسم الكامل
    if (!/^[ء-ي\s]+$/.test(fullname)) {
      alert("الرجاء إدخال إسم صحيح (أحرف عربية فقط).");
      return false;
    }

    // التحقق من الرقم الوطني
    if (!/^([0-1])\d{9}$/.test(nationalId)) {
      alert("الرجاء إدخال رقم وطني صحيح.");
      return false;
    }

    // التحقق من تاريخ الولادة
    if (!/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/.test(birthdate)) {
      alert("الرجاء إدخال تاريخ صحيح (بالتنسيق dd-mm-yyyy).");
      return false;
    }

    // التحقق من رقم الموبايل
    if (!/^09\d{8}$/.test(mobile)) {
      alert("الرجاء إدخال رقم موبايل صحيح.");
      return false;
    }

    // التحقق من الإيميل (اختياري)
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      alert("الرجاء إدخال إيميل صحيح.");
      return false;
    }

    return true;
  }

  // زر إلغاء الطلب
  function cancelOrder() {
    // حذف محتويات مصفوفة السلة
    cart.length = 0;
    // تحديث جدول عرض منتجات السلة
    updateCartTable();
  }

  // إضافة المنتج إلى السلة
  window.addToCart = function (index) {
    const selectedProduct = products[index];

    // البحث عن المنتج في السلة
    const cartItem = cart.find((item) => item.name === selectedProduct.name);

    if (cartItem) {
      // إذا كان المنتج موجود في السلة، زيادة الكمية وتحديث الجدول
      cartItem.quantity += 1;
    } else {
      // إذا لم يكن المنتج موجودًا، قم بإضافته إلى السلة
      cart.push({ ...selectedProduct, quantity: 1 });
    }

    // تحديث جدول عرض منتجات السلة
    updateCartTable();
  };

  // تحديث جدول عرض منتجات السلة وحساب الأسعار
  function updateCartTable() {
    // مسح الصفوف الحالية
    while (cartBody.firstChild) {
      cartBody.removeChild(cartBody.firstChild);
    }

    let totalPrice = 0;
    let totalQuantity = 0;

    // إضافة المنتجات الجديدة
    cart.forEach((product) => {
      const row = cartBody.insertRow();
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);

      const productPrice = product.price;
      const quantity = product.quantity;

      cell1.textContent = product.name;
      cell2.textContent = productPrice;
      cell3.textContent = quantity;
      cell4.textContent = productPrice * quantity;

      totalPrice += productPrice * quantity;
      totalQuantity += quantity;
    });

    // عرض السعر الإجمالي
    totalCell.textContent = totalPrice.toFixed(2);

    // حساب الضريبة
    const taxRate = 0.05; // نسبة الضريبة 5%
    const tax = totalPrice * taxRate;
    taxCell.textContent = tax.toFixed(2);

    // حساب الإجمالي الكامل
    const grandTotal = totalPrice + tax;
    grandTotalCell.textContent = grandTotal.toFixed(2);

    // عرض الكمية الإجمالية
    const quantityCell = document.getElementById("quantity-cell");
    quantityCell.textContent = totalQuantity;
  }

  // حساب عدد حدوث المنتج في السلة
  function countOccurrences(arr, val) {
    return arr.reduce((acc, item) => (item === val ? acc + 1 : acc), 0);
  }
});
