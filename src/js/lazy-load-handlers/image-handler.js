// Check for IntersectionObserver support
if ('IntersectionObserver' in window) {
    document.addEventListener("DOMContentLoaded", function () {
        const handleIntersection = (entries) => {
            entries.map((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.backgroundImage = "url('" + entry.target.dataset.bgimage + "')";
                    observer.unobserve(entry.target);
                }
            });
        }

        const items = document.querySelectorAll('.lazyLoad');
        const observer = new IntersectionObserver(
            handleIntersection,
            { rootMargin: "200px" }
        );
        items.forEach(item => observer.observe(item));
    });
} else {
    // No interaction support? Load all background images automatically
    const items = document.querySelectorAll('.lazyLoad');
    items.forEach(item => {
        item.style.backgroundImage = "url('" + item.dataset.bgimage + "')";
    });
}
