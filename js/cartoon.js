/* 默认显示第一组图片 */
var firstCha = document.querySelector('.characters').firstElementChild;
firstCha.style.display = 'flex';

// 给第一组图片添加动画
var firstItem = firstCha.querySelector('.item');
// 需要延时，不然无动画
setTimeout(function () {
    firstItem.classList.add('active')
}, 100);


/* 切换内容 */
var menus = document.getElementById('menu').children;
var games = document.getElementById('games').children;

for (var i = 0; i < menus.length; i++) {
    menus[i].setAttribute('data-index', i);
    games[i].setAttribute('data-index', i);

    // 获取二级内容
    var btns = menus[i].querySelectorAll('li');
    var characters = games[i].firstElementChild.children;

    for (var j = 0; j < btns.length; j++) {
        // 为二级内容添加对应的自定义属性和id，一一绑定
        btns[j].setAttribute('data-index', i * 10 + j);
        characters[j].id = i * 10 + j;

        btns[j].onclick = function () {
            // 切换内容
            var index = this.getAttribute('data-index');
            var curCha = document.getElementById(index);

            disappearAll();
            curCha.style.display = 'flex';

            // 恢复当前内容初始状态
            var curItems = curCha.querySelectorAll('.item');
            curItems.forEach((item) => {
                item.classList.remove('active');
            })
            console.log(curItems);

            // 给第一组图片添加动画
            var firstItem = curCha.querySelector('.item');
            setTimeout(function () {
                firstItem.classList.add('active')
            }, 100);
        }
    }
}

function disappearAll() {
    var games = document.querySelectorAll('.characters');

    games.forEach((game) => {
        var chas = game.children;
        chas = Array.from(chas);

        chas.forEach((cha) => {
            cha.style.display = 'none';
        })
    })
}


/* 设置图片动画 */
var allItems = document.querySelectorAll('.item');

// 为所有item元素注册点击事件
allItems.forEach((item) => {
    item.addEventListener('click', setActive);
})

function setActive() {
    // 获取当前点击的一组图片(返回的是类数组对象)
    var curItems = this.parentNode.children;

    // 将类数组对象转换成真正的数组，不然没办法通过forEach遍历
    curItems = Array.from(curItems);

    curItems.forEach((item) => {
        item.classList.remove('active');
    })

    this.classList.add('active');
}