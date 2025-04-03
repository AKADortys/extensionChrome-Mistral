import { Loader } from "./utils/loader.js";
import { requestApi } from "./utils/api.js";

function getActiveTab(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    callback(tabs[0]);
  });
}

function handleButtonClick(prompt) {
  const container = document.getElementById("container");
  getActiveTab((tab) => {
    chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        function: findBody,
      })
      .then((results) => {
        if (!results || !results[0]?.result) {
          container.textContent = "Aucun corps disponible sur cette page !";
          return;
        }
        Loader(container);
        requestApi("resume", results[0].result, prompt)
          .then((data) => (container.innerHTML = data.response))
          .catch((e) => (container.textContent = e.message));
      });
  });
}

document.getElementById("resume-btn").addEventListener("click", () => {
  handleButtonClick("Résume moi cette page sans phrase d'introduction: ");
});

document.getElementById("translate-btn").addEventListener("click", () => {
  handleButtonClick(
    "Traduis moi le contenu de cette page en évitant header et footer: "
  );
});

document.getElementById("search-btn").addEventListener("click", () => {
  const prompt = document.getElementById("searchInput").value.trim();
  handleButtonClick(prompt + " sois le plus court possible");
});

function findBody() {
  const body = document.body.innerText || null;
  if (body == null) {
    throw new Error("Aucun corps trouvé");
  }
  return body;
}
