import { Loader } from "./utils/loader.js";
import { requestApi } from "./utils/api.js";

document.getElementById("resume-btn").addEventListener("click", () => {
  const container = document.getElementById("container");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting
      .executeScript({
        target: { tabId: tabs[0].id },
        function: findBody,
      })
      .then((results) => {
        if (!results || !results[0]?.result) {
          container.textContent = "Aucun résumé dispo";
          return;
        }
        Loader(container);
        requestApi("resume", results[0].result, "Résume moi cette page: ")
          .then((data) => (container.innerHTML = data.response))
          .catch(() => (container.textContent = "Erreur API"));
      });
  });
});
document.getElementById("translate-btn").addEventListener("click", () => {
  const container = document.getElementById("container");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting
      .executeScript({
        target: { tabId: tabs[0].id },
        function: findBody,
      })
      .then((results) => {
        if (!results || !results[0]?.result) {
          container.textContent = "Aucun résumé dispo";
          return;
        }
        Loader(container);
        requestApi(
          "resume",
          results[0].result,
          "Traduis moi le contenue de cette page: "
        )
          .then((data) => (container.innerHTML = data.response))
          .catch(() => (container.textContent = "Erreur API"));
      });
  });
});

function findBody() {
  const body = document.body.innerText || null;
  if (body == null) {
    throw new Error("Aucun corps trouvé");
  }
  return body;
}
