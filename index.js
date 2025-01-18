
// قائمة التنقل
const menu = document.getElementById("menu");
const close = document.getElementById("close");
const nav = document.getElementById("nav");

menu.addEventListener("click", (event) => {
  event.stopPropagation();
  nav.classList.remove("hidden"); // إزالة الفئة hidden لعرض القائمة
  nav.classList.add("show"); // إضافة الفئة show لعرض القائمة مع الأنيميشن
});

close.addEventListener("click", (event) => {
  event.stopPropagation();
  nav.classList.remove("show"); // إزالة الفئة show لإخفاء القائمة مع الأنيميشن
  nav.classList.add("hidden"); // إضافة الفئة hidden لإخفاء القائمة مع الأنيميشن
});

// إغلاق القائمة عند النقر خارجها
document.addEventListener("click", (event) => {
  if (
    !nav.contains(event.target) &&
    event.target !== menu &&
    event.target !== close
  ) {
    nav.classList.remove("show"); // إزالة الفئة show لإخفاء القائمة مع الأنيميشن
    nav.classList.add("hidden"); // إضافة الفئة hidden لإخفاء القائمة مع الأنيميشن
  }
});

// ######################################################################

const isLargeScreen = window.matchMedia("(min-width: 768px)").matches;

const thumbnailSwiper = new Swiper(".thumbnail-swiper", {
  slidesPerView: 3,
  speed: 5000,
});

const mainSwiper = new Swiper(".mySwiper-1", {
  loop: true,
  spaceBetween: 10,
  effect: "cube",
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  thumbs: {
    swiper: thumbnailSwiper,
  },
  simulateTouch: !isLargeScreen,
});

// #############################################################

// الحصول على الوقت الحالي
const now = new Date();

let targetDate = localStorage.getItem("targetDate");
if (!targetDate) {
  targetDate = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  localStorage.setItem("targetDate", targetDate);
} else {
  targetDate = new Date(targetDate);
}

// دالة لتحديث العداد
function updateTimer() {
  const now = new Date();
  const diff = targetDate - now;

  // التحقق إذا انتهى الوقت
  if (diff <= 0) {
    document.getElementById("timer").innerHTML = "انتهى الوقت !";

    new Promise((resolve) => {
      setTimeout(resolve, 5000);
    }).then(() => {
      localStorage.removeItem("targetDate");
      updateTimer();
      window.location.reload();
    });
    return;
  }

  // حساب الوقت المتبقي
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // تحديث القيم في HTML
  document.getElementById("days").textContent = days
    .toString()
    .padStart(2, "0");
  document.getElementById("hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").textContent = seconds
    .toString()
    .padStart(2, "0");
}

// تحديث العداد كل ثانية
setInterval(updateTimer, 1000);

// استدعاء أولي لتحديث العرض
updateTimer();

// ######################################################################

const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const quantityInput = document.getElementById("quantity-input");
const totalPrice = document.getElementById("total");

plus.addEventListener("click", () => {
  let currentValue = parseInt(quantityInput.value);
  quantityInput.value = currentValue + 1;
  totalPrice.textContent = quantityInput.value * 2500;
});

minus.addEventListener("click", () => {
  let currentValue = parseInt(quantityInput.value);

  if (currentValue > 1) {
    quantityInput.value = currentValue - 1;
  } else {
    quantityInput.value = 1;
  }

  totalPrice.textContent = quantityInput.value * 2500;
});

// ######################################################################

document.addEventListener("DOMContentLoaded", function () {
  const inputName = document.getElementById("inputName");
  const inputPhone = document.getElementById("inputPhone");
  const inputAddress = document.getElementById("inputAddress");
  const submit = document.getElementById("submit");

  function showErrorMessage(input, message) {
    let error = input.nextElementSibling;

    if (!error || !error.classList.contains("error-message")) {
      error = document.createElement("p");
      error.classList.add("error-message", "text-red-500", "text-sm", "mt-1");
      input.parentNode.appendChild(error);
    }

    error.textContent = message;
  }


  function clearErrorMessage(input) {
    let error = input.nextElementSibling;
    if (error && error.classList.contains("error-message")) {
      error.remove();
    }
  }

  function validateInput(input) {
    if (input === inputName) {
      // تحقق من الاسم
      if (input.value.length < 3) {
        showErrorMessage(input, "يجب أن يكون الاسم على الأقل 3 حروف");
      } else {
        clearErrorMessage(input);
      }
    } else if (input === inputPhone) {
      // تحقق من رقم الهاتف
      const phoneValue = input.value.trim();

      if (!/^\d+$/.test(phoneValue)) {
        showErrorMessage(input, "يجب إدخال أرقام فقط");
      } else if (phoneValue.length !== 11) {
        showErrorMessage(input, "يجب أن يكون الرقم مكونًا من 11 رقمًا");
      } else {
        clearErrorMessage(input);
      }
    } else if (input === inputAddress) {
      // تحقق من العنوان
      if (input.value.length < 3) {
        showErrorMessage(input, "يجب أن يكون العنوان على الأقل 3 حروف");
      } else {
        clearErrorMessage(input);
      }
    }
  }

  // إضافة مستمع الحدث للتحقق عند التركيز (focus) أو عند الكتابة (input)
  [inputName, inputPhone, inputAddress].forEach((input) => {
    input.addEventListener("focus", function () {
      validateInput(input);
    });

    input.addEventListener("input", function () {
      validateInput(input);
      checkFormValidity();
    });
  });

  function checkFormValidity() {
    const isFormValid =
      inputName.value.length >= 3 &&
      /^\d{11}$/.test(inputPhone.value) && // تأكد أن الرقم يحتوي على 11 رقمًا فقط
      inputAddress.value.length >= 3;

    if (isFormValid) {
      submit.removeAttribute("disabled");
      submit.classList.remove("disabled");
    } else {
      submit.setAttribute("disabled", true);
      submit.classList.add("disabled");
    }
  }

  checkFormValidity();
});

// ######################################################################

const swiper = new Swiper('.mySwiper-2', {
  slidesPerView: 1,
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next', // الزر التالي
    prevEl: '.swiper-button-prev'  // الزر السابق
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
});

// ######################################################################
