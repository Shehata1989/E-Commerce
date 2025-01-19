const accordions = document.querySelectorAll(".accordion-element");

accordions.forEach((accordion) => {
  accordion.addEventListener("click", () => {
    const content = accordion.querySelector(".accordion-content");
    const icon = accordion.querySelector("i"); // استهداف الأيقونة داخل العنصر المحدد

    // إغلاق جميع العناصر الأخرى قبل فتح العنصر الجديد
    accordions.forEach((item) => {
      const otherContent = item.querySelector(".accordion-content");
      const otherIcon = item.querySelector("i");

      if (otherContent !== content) {
        otherIcon.classList.add("icon-plus");
        otherIcon.classList.remove("icon-minus");
        otherContent.style.height = "0px"; // إغلاق العناصر الأخرى
        otherContent.style.padding = "0px";
      }
    });

    // تبديل الأيقونة والفتح/الإغلاق بسلاسة
    if (content.style.height === "0px" || !content.style.height) {
      icon.classList.remove("icon-plus");
      icon.classList.add("icon-minus");
      content.style.height = content.scrollHeight + 10 + "px";
      content.style.paddingTop = "10px";
    } else {
      icon.classList.add("icon-plus");
      icon.classList.remove("icon-minus");
      content.style.height = "0px";
      content.style.paddingTop = "0px";
    }
  });
});
