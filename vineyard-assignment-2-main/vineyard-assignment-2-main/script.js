const contactForm = document.getElementById("contact-form");
const benefitForm = document.getElementById("benefit-form");
const benefitsList = document.getElementById("benefits-list");
const footerTime = document.getElementById("footer-time");
const benefitTitleInput = document.getElementById("benefit-title");
const benefitDescriptionInput = document.getElementById("benefit-description");

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit);
}

if (benefitForm && benefitsList) {
    benefitForm.addEventListener("submit", handleBenefitSubmit);
    benefitsList.addEventListener("click", handleBenefitDelete);
}

function handleContactSubmit(event) {
    event.preventDefault();
    alert("Thank you for your message! Your form has been submitted successfully.");
    contactForm.reset();
}

function handleBenefitSubmit(event) {
    event.preventDefault();

    const title = benefitTitleInput.value.trim();
    const description = benefitDescriptionInput.value.trim();

    if (!title || !description) {
        return;
    }

    benefitsList.appendChild(buildBenefitItem(title, description));
    benefitForm.reset();
    benefitTitleInput.focus();
}

function handleBenefitDelete(event) {
    const removeButton = event.target.closest(".delete-btn");

    if (!removeButton) {
        return;
    }

    const listItem = removeButton.closest(".benefit-item");

    if (listItem) {
        listItem.remove();
    }
}

function buildBenefitItem(title, description) {
    const listItem = document.createElement("li");
    listItem.className = "benefit-item";

    const shell = document.createElement("div");
    shell.className = "benefit-shell";

    const copy = document.createElement("span");
    copy.className = "benefit-copy";

    const strong = document.createElement("strong");
    strong.textContent = `${title}:`;

    copy.append(strong, ` ${description}`);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "delete-btn";
    button.textContent = "Remove";
    button.setAttribute("aria-label", `Remove ${title} benefit`);

    shell.append(copy, button);
    listItem.appendChild(shell);

    return listItem;
}

function updateFooterTime() {
    if (!footerTime) {
        return;
    }

    const now = new Date();
    const day = dayNames[now.getDay()];
    const date = String(now.getDate()).padStart(2, "0");
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    footerTime.textContent = `${day}, ${date} ${month} ${year}, ${hours}:${minutes}:${seconds}`;
}

updateFooterTime();
setInterval(updateFooterTime, 1000);
