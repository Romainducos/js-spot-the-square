const allTheBox = document.getElementsByTagName("button");

const boxClicked = (e) => {
  console.log(e.target.id);
};

for (let box of allTheBox) {
  box.addEventListener("click", boxClicked);
}
