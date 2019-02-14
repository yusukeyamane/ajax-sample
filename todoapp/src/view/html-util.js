export function escapeSpecialChars(str) {
  return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}

export function htmlToElement(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content.firstElementChild;
}

export function element(strings, ...values) {
  const htmlString = strings.reduce((result, string, i) => {
      const value = values[i - 1];
      if (typeof value === "string") {
          return result + escapeSpecialChars(value) + string;
      } else {
          return result + String(value) + string;
      }
  });
  return htmlToElement(htmlString);
}

export function render(bodyElement, containerElement) {
  // rootElementの中身を空にする
  containerElement.innerHTML = "";
  // rootElementの直下にbodyElementを追加する
  containerElement.appendChild(bodyElement);
}
