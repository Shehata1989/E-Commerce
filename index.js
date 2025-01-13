const menu = document.getElementById("menu");
const close = document.getElementById("close");
const nav = document.getElementById("nav");

menu.addEventListener("click", (event) => {
  event.stopPropagation();
  nav.classList.remove("hidden");  // إزالة الفئة hidden لعرض القائمة
  nav.classList.add("show");  // إضافة الفئة show لعرض القائمة مع الأنيميشن
});

close.addEventListener("click", (event) => {
  event.stopPropagation();
  nav.classList.remove("show");  // إزالة الفئة show لإخفاء القائمة مع الأنيميشن
  nav.classList.add("hidden");  // إضافة الفئة hidden لإخفاء القائمة مع الأنيميشن
});

// إغلاق القائمة عند النقر خارجها
document.addEventListener("click", (event) => {
  if (
    !nav.contains(event.target) &&
    event.target !== menu &&
    event.target !== close
  ) {
    nav.classList.remove("show");  // إزالة الفئة show لإخفاء القائمة مع الأنيميشن
    nav.classList.add("hidden");  // إضافة الفئة hidden لإخفاء القائمة مع الأنيميشن
  }
});








const slidesContainer = document.querySelector('.slides');
const thumbnails = document.querySelectorAll('.thumbnail img');

let currentIndex = 0;

// تحديث موقع السلايدر
function updateSlider(index) {
  slidesContainer.style.transform = `translateX(${index * 100}%)`;
}

// عند الضغط على الصور المصغرة
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    currentIndex = index;
    updateSlider(currentIndex);
  });
});

// إضافة دعم السحب للأجهزة المحمولة
let startX = 0;
let endX = 0;

slidesContainer.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

slidesContainer.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;

  if (startX < endX - 50 && currentIndex < thumbnails.length - 1) {
    // السحب لليمين: الانتقال للشريحة التالية
    currentIndex++;
  } else if (startX > endX + 50 && currentIndex > 0) {
    // السحب لليسار: الانتقال للشريحة السابقة
    currentIndex--;
  }

  updateSlider(currentIndex);
});
