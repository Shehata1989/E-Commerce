// قائمة التنقل
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











// سلايدر الصور
const slidesContainer = document.querySelector('.slides');
const thumbnails = document.querySelectorAll('.thumbnail img');

let currentIndex = 0;

// تحديث موقع السلايدر
function updateSlider(index) {
  slidesContainer.style.transition = 'transform 0.3s ease'; // إضافة الانتقال السلس
  slidesContainer.style.transform = `translateX(${index * 100}%)`;
}

// عند الضغط على الصور المصغرة
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    currentIndex = index;
    updateSlider(currentIndex);
  });
});

// متغيرات السحب
let startX = 0;
let endX = 0;
let isSwiping = false; // تتبع حالة السحب
let translateXValue = 0; // لتخزين قيمة التحريك المؤقتة
let currentTranslateX = 0; // لتخزين الترجمة الحالية للسلايدر

// استماع لحدث اللمس عند بدء السحب
slidesContainer.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;  // مكان البداية
  isSwiping = true;  // بدأ السحب
  translateXValue = currentTranslateX;  // تخزين الترجمة الحالية لتكون مرجعية للسحب
});

// أثناء السحب
slidesContainer.addEventListener('touchmove', (e) => {
  if (isSwiping) {
    e.preventDefault(); // منع التمرير أثناء السحب
    const moveX = e.touches[0].clientX - startX; // حساب المسافة التي تم سحبها
    const newTranslateX = translateXValue + moveX; // إضافة المسافة التي تم سحبها

    // تحديث الـtransform لتحقيق الحركة
    slidesContainer.style.transition = 'none'; // إيقاف الانتقال المؤقت خلال السحب
    slidesContainer.style.transform = `translateX(${newTranslateX}px)`; // تطبيق الحركة
  }
});

// عند انتهاء السحب
slidesContainer.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  isSwiping = false; // إنهاء السحب

  // حساب المسافة الإجمالية للسحب
  if (startX < endX - 50 && currentIndex < thumbnails.length - 1) {
    // سحب لليمين: الانتقال للشريحة التالية
    currentIndex++;
  } else if (startX > endX + 50 && currentIndex > 0) {
    // سحب لليسار: الانتقال للشريحة السابقة
    currentIndex--;
  }

  // تحديث السلايدر بعد السحب
  updateSlider(currentIndex);
});
