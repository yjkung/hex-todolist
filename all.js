const list = document.querySelector(".list")
let data = []

const showList = ()=>{
  let str = ""
  data.forEach(function (item,index) {
  str += `
  <li class="list_item" data-done="false" >
    <div class="check checkbox" data-num="${index}"></div><span>${item.content}</span>
    <div class="delete_box"><img src="./cancel.jpg" alt="刪除事項" class="delete_item" data-num="${index}"></div>
  </li>
  `
})
  list.innerHTML = str
  }
showList();

// 新增待辦事項
const text = document.querySelector(".textBox")
const submit = document.querySelector(".submit")

const addList = () => {
  if(text.value === ""){
    alert('請輸入內容')
    return
  }
  let newItem = {content:text.value,done:"undone"};
  data.push(newItem);
  showList();
  list_num();
  text.value = "";
}
// 按鈕及enter都可新增
submit.addEventListener('click', addList)
text.addEventListener('keydown', function(e){
  if(e.keyCode === 13){
    addList()
  }
})

// 勾選/清除完成項目 =>outerHTML沒反應
const checkList = (e) => {
  const list_text= document.querySelectorAll('.list_item span')
  const data_num = e.target.getAttribute('data-num')
  const check = document.querySelectorAll('.check')
    if (e.target.classList.contains('checkbox')){
      list_text[data_num].classList.add('list_done')
      check[data_num].outerHTML =`<div class="check tick" data-num="${data_num}">✔</div>`
      data[data_num].done = "done"
    } else if (e.target.classList.contains('tick')){
      list_text[data_num].classList.remove('list_done')
      // 用outerHTML沒反應
      // check[data_num].outerHTML = `<div class="check checkbox" data-num="${data_num}"></div>`
      check[data_num].classList.add('checkbox')
      check[data_num].classList.remove('tick')
      check[data_num].textContent = ""
      data[data_num].done = "undone"
    }
  list_num();
}

list.addEventListener('click',checkList)

// 刪除項目
const delete_mission = (e) =>{
    if (e.target.getAttribute('class') === "delete_item"){
      let num = e.target.getAttribute('data-num');
      data.splice(+num, 1)
      showList();
      list_num();
    }
}

list.addEventListener('click',delete_mission)

// 篩選功能
const category_list = document.querySelector('.category_list')
const category = document.querySelectorAll('.category');
category_list.addEventListener('click',(e) =>　{
  // 選擇到的分類增加category_selected樣式
  if(e.target.classList.contains('category')){
    for (let i = 1; i <= 3; i++) {
      let str = ''
      str += i
      category[i - 1].classList.remove('category_selected')
      e.target.setAttribute('class', 'category category_selected')
    }
    // 篩選,用data.done判斷
    const list_item = document.querySelectorAll('.list_item')
    // 清除篩選過後的樣式(不然先按待完成，被隱藏的項目在已完成就不會出現)
    for (let i = 0; i < data.length; i++) {
      list_item[i].classList.remove('hidden')
    }
    if (e.target.getAttribute('data-category') === "1") {
      for (let i = 0; i < data.length; i++) {
          list_item[i].classList.remove('hidden')
        }
    }else if (e.target.getAttribute('data-category') === "2") {
      for(let i = 0; i < data.length; i ++){
        if(data[i].done === "done"){
          list_item[i].classList.add('hidden')
        }
      }
    }else if (e.target.getAttribute('data-category') === "3"){
      for (let i = 0; i < data.length; i++) {
        if (data[i].done === "undone") {
          list_item[i].classList.add('hidden')
        }
      }
    }
  }
})

// 待完成項目數量
const list_num = () =>{
  const count = document.querySelector(".count")
  let undone_num = 0;
  data.forEach(function (item) {
    if (item.done === "undone") {
      undone_num += 1;
    }
  })
  count.innerHTML = `<span>${undone_num}個待完成項目</span>`
}

list_num();


// 清除已完成項目
const delete_all = document.querySelector('.delete')
const deleteAlL = () =>{
  let n
  data.forEach((item, index) => {
    if (item.done === "done") {
      n = index
    }
    data.splice(index, 1)
  })
  showList()
}

delete_all.addEventListener('click',deleteAlL)

