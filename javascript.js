"use strict";

const btn = document.querySelectorAll(".button");
for (let i = 0; i < 3; i++) {
  btn[i].addEventListener("click", function () {
    btn[i].classList.add("clicked");
    setTimeout(() => {
      btn[i].classList.remove("clicked");
    }, 100);
  });
}

/* set chức năng thêm số điên thoại */

const sort = function (div, save, save_chucai) {
  for (let i = 0; i < div.length; i++) {
    section3.removeChild(div[i]);
  }

  for (let i = 0; i < save_chucai.length - 1; i++) {
    let min_index = i;
    for (let j = i + 1; j < save_chucai.length; j++) {
      if (save_chucai[min_index] > save_chucai[j]) {
        min_index = j;
      }
    }

    let temp = save_chucai[i];
    save_chucai[i] = save_chucai[min_index];
    save_chucai[min_index] = temp;

    temp = div[i];
    div[i] = div[min_index];
    div[min_index] = temp;

    temp = save[i];
    save[i] = save[min_index];
    save[min_index] = temp;
  }

  for (let i = 0; i < div.length; i++) {
    section3.appendChild(div[i]);
  }
};

const section3 = document.querySelector(".sec-3");
const form = document.querySelector(".form-1");
const ten = document.querySelector(".name");
const phone = document.querySelector(".phone");

let save = new Array();
let save_chucai = new Array();
let stt = 0;
var div = new Array();

form.addEventListener("submit", function (event) {
  event.preventDefault();

  div[stt] = document.createElement("div");
  var span1 = document.createElement("span");
  var span2 = document.createElement("span");
  span1.innerHTML = ten.value;
  span2.innerHTML = phone.value;

  div[stt].style.backgroundColor = "rgba(93, 91, 91, 0.205)";
  div[stt].style.width = "75%";
  div[stt].style.height = "100px";
  div[stt].style.borderRadius = "10px";
  div[stt].style.fontSize = "30px";
  div[stt].style.display = "grid";
  div[stt].style.gridTemplateColumns = "repeat(2,1fr)";
  div[stt].style.alignItems = "center";
  span1.style.paddingLeft = "30px";
  span2.style.justifySelf = "end";
  span2.style.paddingRight = "30px";

  div[stt].appendChild(span1);
  div[stt].appendChild(span2);
  //Viec tim kiem da xay ra ==> can khoi phuc lai list phone lúc chưa tìm kiếm
  if (danhdau >= 0) {
    section3.removeChild(div[danhdau]);
    //Tro ve lai list ban dau roi moi them
    for (let i = 0; i < div.length; i++) {
      section3.appendChild(div[i]);
    }
  }
  section3.appendChild(div[stt]);

  save[stt] = [ten.value, phone.value];
  let temp = save[stt][0].split(" ");
  temp = temp[temp.length - 1].split("");
  save_chucai[stt] = temp[0];
  stt++;

  ten.value = "";
  phone.value = "";

  //Sắp xếp theo bảng chữ cái
  if (stt >= 2) {
    sort(div, save, save_chucai);
  }
  dem = 0;
});

//Tiềm kiếm và Xóa trùng

const search_name = document.querySelector(".search");
const button_search = document.querySelector(".form-2");
const button_delete = document.querySelector(".btn-3");

//tim kiếm
let danhdau = -1;
var dem = 0;
button_search.addEventListener("submit", function (e) {
  e.preventDefault();
  if (search_name.value !== "") {
    dem = 0;

    //Neu bam tim lan 2 tro di ==> khôi phục lại list phone ban đầu để tiếp tục tìm kiếm
    if (danhdau >= 0) {
      section3.removeChild(div[danhdau]);
      for (let i = 0; i < div.length; i++) {
        section3.appendChild(div[i]);
      }
    }

    for (let i = 0; i < save.length; i++) {
      if (search_name.value !== save[i][0]) {
        section3.removeChild(div[i]);
      } else {
        dem++;
        danhdau = i;
      }
    }
    search_name.value = "";

    if (dem === 0) {
      for (let i = 0; i < div.length; i++) {
        section3.appendChild(div[i]);
      }
      alert("Tên cần tìm không tồn tại trong list");
    }
  }
});

//xóa trùng
const delete_name = function () {
  for (let i = 0; i < save.length - 1; i++) {
    for (let j = i + 1; j < save.length; j++) {
      if (save[i][1] === save[j][1] || save[i][0] === save[j][0]) {
        section3.removeChild(div[j]);
        div.splice(j, 1);
        save.splice(j, 1);
        save_chucai.splice(j, 1);
        stt--;
      }
    }
  }
};

button_delete.addEventListener("click", function () {
  if (dem === 0) {
    //không tìm thấy hoặc không thao tác tìm kiếm
    delete_name();
  }

  if (dem !== 0) {
    section3.removeChild(div[danhdau]);
    for (let i = 0; i < div.length; i++) {
      section3.appendChild(div[i]);
    }
    //tức là đang trong trạng thái tìm ra 1 thằng với chức năng tìm ==> lúc này
    // nhấn nút xóa trùng sẽ thực hiện việc xóa (nếu có trùng) và in ra lại list sau xóa
    delete_name();

    danhdau = -1; //set lại đánh dấu bởi vì nếu trong trường hợp ta tìm được
    //và thằng tìm được là thằng trùng (thằng trùng đó nằm ở vị trí cuối cùng) ==> nó bị xóa đi ==> lúc này nó đã bị xóa
    //thì việc đánh dau !=-1 ==> khi ta thêm hoặc tìm kiếm tiếp thì nó sẽ bay vào cái danhdau>=0
    //=> gọi hàm xóa cái tìm được(div[danhdau]) đi mà trong khi nó đã bị xóa ==> bản chất mảng div tại vị trí danhdau(là thằng cúi cùng)
    // đã bị xóa cho nên việc tham chiếu tới vị trí cuối cùng là bất hợp lí (vì div lúc này đã xóa đi vị trí cuối nên việc tham chiếu sẽ gây crash)
  }
});

console.log(save);
console.log(save_chucai);
console.log(div);
