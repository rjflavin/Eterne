document.addEventListener("DOMContentLoaded", function() {
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const highQualityImage = entry.target.dataset.bgimage;
                const img = new Image();
                img.src = highQualityImage;
                img.onload = () => {
                    entry.target.style.backgroundImage = `url('${highQualityImage}')`;
                    entry.target.style.filter = 'none';
                    observer.unobserve(entry.target);
                };
            }
        });
    };

    const observeLazyLoadItems = () => {
        const items = document.querySelectorAll('.lazyLoad');
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(handleIntersection, {
                rootMargin: '120px',
                threshold: [0, 0.5, 1]
            });

            items.forEach(item => observer.observe(item));
        } else {
            items.forEach(item => {
                const highQualityImage = item.dataset.bgimage;
                const img = new Image();
                img.src = highQualityImage;
                img.onload = () => {
                    item.style.backgroundImage = `url('${highQualityImage}')`;
                    item.style.filter = 'none';
                };
            });
        }
    };

    observeLazyLoadItems();

    const observer = new MutationObserver(mutationsList => {
        mutationsList.forEach(mutation => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'open') {
                observeLazyLoadItems();
            }
        });
    });

    observer.observe(document.body, { attributes: true, subtree: true });
});