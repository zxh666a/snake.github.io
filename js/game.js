(function () {
    var that;
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }

    Game.prototype.start = function () {
        // 1.把食物和蛇渲染到map上
        this.food.render(this.map);
        this.snake.render(this.map);
        //2.开始游戏的逻辑
        // 2.1 让蛇移动起来
        run();
        // 2.2 当蛇碰到边界 游戏结束

        // 2.3 当蛇碰到食物 做出处理
        // 2.4  通过键盘控制蛇的方向
        bindKey();
    }

     // 通过键盘控制蛇的方向 
    function bindKey() {
        // 注册事件
        document.addEventListener("keydown", function (e) {
            // 获取上下左右的键盘码
            //  top -- 38 
            //  bottom -- 40
            //  left -- 37
            //  right -- 39
            console.log(e.keyCode);
            switch (e.keyCode) {
                case 37:
                    that.snake.direction = "left";
                    break;
                case 38:
                    that.snake.direction = "top";
                    break;
                case 39:
                    that.snake.direction = "right";
                    break;
                case 40:
                    that.snake.direction = "bottom";
                    break;
            }
        }, false)
    }


    // 2.1 让蛇移动起来
    function run() {
        var time = setInterval(function () {
            // 让蛇走一格
            // 获取游戏对象中的蛇对象
            that.snake.move(that.food,that.map);
            that.snake.render(that.map);
            // 当蛇碰到边界 游戏结束
            var maxX = that.map.offsetWidth / that.snake.width;
            var maxY = that.map.offsetHeight / that.snake.height;
            var headx = that.snake.body[0].x;
            var heady = that.snake.body[0].y;
            if (headx < 0 || headx >= maxX) {
                alert("game over");
                clearInterval(time);
            }
            if (headx < 0 || heady >= maxY) {
                alert("game over");
                clearInterval(time);
            }
        }, 150);
    }


    window.Game = Game;
})();
// map = document.getElementById("map");
// var game = new Game(map);
// game.start();