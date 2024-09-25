// Dialog Components
function Dialog(children, isOpen, onClose) {
  if (!isOpen) return null;

  const dialog = document.createElement("div");
  dialog.className = "fixed inset-0 z-50 overflow-y-auto";
  dialog.innerHTML = `
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        ${children.map((child) => child.outerHTML).join("")}
      </div>
    </div>
  `;

  dialog.querySelector(".fixed.inset-0").addEventListener("click", onClose);
  return dialog;
}

function DialogHeader(children) {
  const header = document.createElement("div");
  header.className = "bg-gray-50 px-4 py-3";
  children.forEach((child) => header.appendChild(child));
  return header;
}

function DialogTitle(content) {
  const title = document.createElement("h3");
  title.className = "text-lg font-medium leading-6 text-gray-900";
  title.textContent = content;
  return title;
}

function DialogContent(children) {
  const content = document.createElement("div");
  content.className = "bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4";
  children.forEach((child) => content.appendChild(child));
  return content;
}

function DialogFooter(children) {
  const footer = document.createElement("div");
  footer.className = "bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse";
  children.forEach((child) => footer.appendChild(child));
  return footer;
}

export { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter };
