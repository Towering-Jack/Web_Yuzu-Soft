/* 默认显示第一组图片 */
var firstCha = document.querySelector('.characters').firstElementChild;
firstCha.style.display = 'block';
imgs_rotation(firstCha);

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
            curCha.style.display = 'block';

            // 轮播动画
            imgs_rotation(curCha);
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

/* 轮播动画 */
function imgs_rotation(curCha) {
    // 判断轮播动画是否正在运行
    if (curCha.getAttribute('data-ifRotating') == 'true') {
        return;
    } else {
        curCha.setAttribute('data-ifRotating', 'true');
    }

    // 初始化
    let imgs = curCha.querySelectorAll('li');
    imgs = Array.from(imgs);
    format_banner();

    // 定时轮播
    let timer = setInterval(get_next, 2000);

    // 设置按钮
    let btn = document.querySelectorAll('span');

    // 此处不能用onclick注册事件！后面的会覆盖前面的！
    // 要用addEventListener注册
    // 
    // btn[0].onclick = function () {
    //     clearInterval(timer);
    //     get_pre();
    //     timer = setInterval(get_next, 2000);
    // }
    // btn[1].onclick = function () {
    //     clearInterval(timer);
    //     get_next();
    //     timer = setInterval(get_next, 2000);
    // }
    btn[0].addEventListener('click', function () {
        clearInterval(timer);
        get_pre();
        timer = setInterval(get_next, 2000);
    })
    btn[1].addEventListener('click', function () {
        clearInterval(timer);
        get_next();
        timer = setInterval(get_next, 2000);
    })

    // 设置鼠标悬停
    imgs.forEach((img) => {
        img.onmouseenter = function () {
            clearInterval(timer);
        }
        img.onmouseleave = function () {
            timer = setInterval(get_next, 2000);
        }
    });

    /* 设置滑块跟随图片显示 */
    let slidersArr = new Array();

    let slidersDiv = document.createElement('div');
    slidersDiv.classList.add('sliders');
    curCha.appendChild(slidersDiv);

    let curLi = curCha.querySelectorAll('li');

    for (let i = 0; i < imgs.length; i++) {
        let curSlider = document.createElement('div');

        curSlider.classList.add('slider');
        curSlider.name = i;

        slidersArr.push(curSlider);
        slidersDiv.appendChild(curSlider);

        curLi[i].setAttribute('data-index', i);
    }

    /* 设置鼠标悬浮滑块 */
    for (let i = 0; i < slidersArr.length; i++) {
        slidersArr[i].onmouseenter = function () {
            clearInterval(timer);

            let len1 = imgs[0].getAttribute('data-index');
            let len2 = slidersArr[i].name;
            let dis = Math.abs(len1 - len2);

            while (dis--) {
                if (len1 > len2) {
                    get_pre();
                } else {
                    get_next();
                }
            }

            timer = setInterval(get_next, 2000);
        }
    }

    function format_banner() {
        // 设置前三张图片
        imgs[0].style.left = 0;
        imgs[0].style.opacity = 1;

        imgs[1].style.left = '35rem';
        imgs[1].style.zIndex = '40';
        imgs[1].style.transform = 'scale(1.3)';
        imgs[1].style.opacity = 1;

        imgs[2].style.left = '70rem';
        imgs[2].style.opacity = 1;

        // 将其余图片隐藏
        for (let i = 3; i < imgs.length; i++) {
            imgs[i].style.opacity = 0;
        }
    }

    function get_next() {
        let firstImg = imgs.shift();
        imgs.push(firstImg);

        for (let i = 0; i < imgs.length; i++) {
            imgs[i].style.zIndex = imgs.length - i;
            imgs[i].style.transform = 'scale(1)';
        }
        format_banner();
        sync_slider();
    }

    function get_pre() {
        let lastImg = imgs.pop();
        imgs.unshift(lastImg);

        for (let i = 0; i < imgs.length; i++) {
            imgs[i].style.zIndex = imgs.length - i;
            imgs[i].style.transform = 'scale(1)';
        }
        format_banner();
        sync_slider();
    }

    function sync_slider() {
        for (let i = 0; i < slidersArr.length; i++) {
            if (slidersArr[i].name == imgs[0].getAttribute('data-index')) {
                slidersArr[i].style.backgroundColor = '#ebc0fd';
            } else {
                slidersArr[i].style.backgroundColor = 'white';
            }
        }
    }
}