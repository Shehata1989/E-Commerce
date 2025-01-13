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



// ######################################################################


// سلايدر الصور
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


let startX = 0;
let endX = 0;
let isSwiping = false;

// دعم اللمس لتحريك السلايدر
slidesContainer.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isSwiping = true; 
});


// أثناء السحب (إيقاف التمرير)
slidesContainer.addEventListener("touchmove", (e) => {
  if (isSwiping) {
    e.preventDefault(); // منع التمرير أثناء السحب
  }
});


slidesContainer.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  isSwiping = false;
  if (startX > endX - 20 && currentIndex > 0) {
    // السحب لليمين: الانتقال للشريحة السابقة
    currentIndex--;
  } else if (startX < endX + 20 && currentIndex < thumbnails.length - 1) {
    // السحب لليسار: الانتقال للشريحة التالية
    currentIndex++;
  }
  updateSlider(currentIndex);
});

