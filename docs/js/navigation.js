const ACTIVE_CLASS = "active";

export function initNavigation() {
    const links = [...document.querySelectorAll('a[href^="#"]')];

    links.forEach((link) => {
        link.addEventListener("click", () => {
            setActiveLink(links, link);
        });
    });

    observeSections(links);
}

function setActiveLink(links, activeLink) {
    links.forEach((link) => link.classList.remove(ACTIVE_CLASS));
    activeLink.classList.add(ACTIVE_CLASS);
}

function observeSections(links) {
    const sections = [...document.querySelectorAll("main section[id]")];

    if (!("IntersectionObserver" in window) || sections.length === 0) {
        return;
    }

    const linksById = new Map(
        links
            .map((link) => [link.getAttribute("href")?.slice(1), link])
            .filter(([id, link]) => id && link)
    );

    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (!visible) return;

            const link = linksById.get(visible.target.id);
            if (link) setActiveLink(links, link);
        },
        {
            rootMargin: "-25% 0px -60% 0px",
            threshold: [0.1, 0.25, 0.5],
        }
    );

    sections.forEach((section) => observer.observe(section));
}
