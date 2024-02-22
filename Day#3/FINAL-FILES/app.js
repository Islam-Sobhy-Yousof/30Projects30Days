const allKeys = document.querySelectorAll(".key");
const getActiveKey = function () {
  for (let i = 0; i < allKeys.length; i++) {
    if (allKeys[i].classList.contains("jiggle")) {
      return allKeys[i];
    }
  }
};
document.addEventListener("keyup", function (event) {
  const keyPressed = event.key;
  const activeKey = getActiveKey();
  if (
    keyPressed.toUpperCase() ===
    activeKey.getAttribute("data-key").toUpperCase()
  ) {
    activeKey.classList.remove("jiggle");
    const randomKey = Math.trunc(Math.random() * allKeys.length);
    allKeys[randomKey].classList.add("jiggle");
  }
});
