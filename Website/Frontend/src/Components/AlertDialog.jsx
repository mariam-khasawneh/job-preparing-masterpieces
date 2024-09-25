// AlertDialog Components
function AlertDialog(children, isOpen, onClose) {
  if (!isOpen) return null;

  const alertDialog = document.createElement("div");
  alertDialog.className = "fixed inset-0 z-50 overflow-y-auto";
  alertDialog.innerHTML = `
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

  alertDialog
    .querySelector(".fixed.inset-0")
    .addEventListener("click", onClose);
  return alertDialog;
}

function AlertDialogTrigger(content, onClick) {
  const trigger = document.createElement("button");
  trigger.textContent = content;
  trigger.addEventListener("click", onClick);
  return trigger;
}

function AlertDialogContent(children) {
  const content = document.createElement("div");
  content.className = "bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4";
  children.forEach((child) => content.appendChild(child));
  return content;
}

function AlertDialogHeader(children) {
  const header = document.createElement("div");
  header.className = "sm:flex sm:items-start";
  children.forEach((child) => header.appendChild(child));
  return header;
}

function AlertDialogTitle(content) {
  const title = document.createElement("h3");
  title.className = "text-lg leading-6 font-medium text-gray-900";
  title.textContent = content;
  return title;
}

function AlertDialogDescription(content) {
  const description = document.createElement("div");
  description.className = "mt-2";
  description.innerHTML = `<p class="text-sm text-gray-500">${content}</p>`;
  return description;
}

function AlertDialogFooter(children) {
  const footer = document.createElement("div");
  footer.className = "bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse";
  children.forEach((child) => footer.appendChild(child));
  return footer;
}

function AlertDialogAction(content, onClick) {
  const action = document.createElement("button");
  action.className =
    "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm";
  action.textContent = content;
  action.addEventListener("click", onClick);
  return action;
}

function AlertDialogCancel(content, onClick) {
  const cancel = document.createElement("button");
  cancel.className =
    "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm";
  cancel.textContent = content;
  cancel.addEventListener("click", onClick);
  return cancel;
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
};
