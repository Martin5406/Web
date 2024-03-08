document.addEventListener("DOMContentLoaded", function() {
    let lastSearchTerm = ''; 
    function searchAndHighlight() {
        const searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();

        if (searchTerm === "" && lastSearchTerm !== "") {
            clearHighlights();
            lastSearchTerm = '';
            return;
        }
        if (searchTerm === lastSearchTerm) {
            return;
        }

        clearHighlights();

        const contentSections = document.querySelectorAll("main, footer *");

        contentSections.forEach(section => {
            const sectionContent = section.textContent.toLowerCase();
            if (sectionContent.includes(searchTerm)) {
                const regex = new RegExp(searchTerm, "gi");
                section.innerHTML = section.innerHTML.replace(regex, match => `<span class="highlight">${match}</span>`);
                section.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });

        lastSearchTerm = searchTerm;
    }

    function clearHighlights() {
        const highlightedElements = document.querySelectorAll('.highlight');
        highlightedElements.forEach(element => {
            element.outerHTML = element.innerHTML;
        });
    }
    document.getElementById("searchButton").addEventListener("click", searchAndHighlight);
    document.getElementById("searchInput").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            searchAndHighlight();
        }
    });
});
