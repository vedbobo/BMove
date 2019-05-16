let BMove = function (ele, opt) {
    //1-1  元素  属性
    this.$ele = $(ele);
    this.defaults = {
        'width': 600,
        'height': 420
    };
    //1-2 定义并接受合成设置的值
    this.settings = $.extend({}, this.defaults, opt);
}
//2.方法  ===> 函数
BMove.prototype = {
    // 初始化函数  页面加载之前就要添加所有的事件
    initialize: function () {
        let _this = this;
        this.$ele.append('<div class="ebox"></div>');
        this.$ele.css({width:this.settings.width+'px',height:this.settings.height+'px'})
        this.imgWidth = $(".content img").width();
        this.imgHeight = $(".content img").height();
        $('.content').css({ width: this.imgWidth + 'px', height: this.imgHeight + 'px', marginLeft: '-' + (this.imgWidth / 2) + 'px', marginTop: '-' + (this.imgHeight / 2) + 'px' })
        this.$ele.mousemove(function () {
            _this.move(event);
        });
    },
    move: function (e) {
        let moveoffsetX = e.offsetX,
            moveoffsetY = e.offsetY,
            halfboxWidth = $('.box').width() / 2,
            halfboxHeight = $('.box').height() / 2,
            contentMarginLeft = ($('.content').width() - $('.box').width()) / 2,
            contentMarginTop = ($('.content').height() - $('.box').height()) / 2;
        let contentMoveX = contentMarginLeft * (1 - moveoffsetX / halfboxWidth),
            contentMoveY = contentMarginTop * (1 - moveoffsetY / halfboxHeight);
        $('.content').css({ 'transform': 'translate(' + contentMoveX + 'px,' + contentMoveY + 'px)' });
    },
}
//3. 类方法返回对象
$.fn.BMove = function (option) {
    var bmove = new BMove(this, option)
    return bmove.initialize();
}