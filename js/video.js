// 切换视频和背景设定
var logoLis = document.getElementById('gamelogo').querySelectorAll('img');
var videoLis = document.getElementById('gamevideo').querySelectorAll('li');

for (var i = 0; i < logoLis.length; i++) {
    // 设置索引
    logoLis[i].setAttribute('data-index', i);

    logoLis[i].onclick = function () {
        // 切换视频
        var index = this.getAttribute('data-index');

        for (var i = 0; i < videoLis.length; i++) {
            videoLis[i].style.display = 'none';

            // 切换视频时，暂停所有视频
            var video = videoLis[i].querySelector('video');
            video.pause();
        }

        videoLis[index].style.display = 'block';

        // 设置当前anim的id
        var anmi = document.getElementsByClassName('gamelogoanim');
        anmi[0].id = 'logo' + index;
    }
}