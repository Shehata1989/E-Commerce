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