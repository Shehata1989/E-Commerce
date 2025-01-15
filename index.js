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

const mainSwiper = new Swiper(".slider", {
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
