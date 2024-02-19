document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".sermon-carousel section, .events-carousel section");

    sections.forEach((section) => {
        const scrollImages = section.querySelector(".scroll-images");
        const leftButton = section.querySelector(".left");
        const rightButton = section.querySelector(".right");

        setupScrolling(scrollImages, leftButton, rightButton);
    });

    function setupScrolling(scrollImages, leftButton, rightButton) {
        if (!scrollImages || !leftButton || !rightButton) {
            return;
        }

        const scrollLength = scrollImages.scrollWidth - scrollImages.clientWidth;

        function checkScroll() {
            const currentScroll = scrollImages.scrollLeft;
            leftButton.removeAttribute("disabled");
            rightButton.removeAttribute("disabled");

            if (currentScroll === 0) {
                leftButton.setAttribute("disabled", "true");
            } else if (currentScroll === scrollLength) {
                rightButton.setAttribute("disabled", "true");
            }
        }

        scrollImages.addEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkScroll);
        checkScroll();

        function scroll(direction) {
            const amount = direction === "left" ? -200 : 200;
            scrollImages.scrollBy({
                left: amount,
                behavior: "smooth",
            });
        }

        leftButton.addEventListener("click", () => scroll("left"));
        rightButton.addEventListener("click", () => scroll("right"));
    }
});
