(function () {
    var position = "absolute";
    var elements = [];
    function Snake(options) {
        // 定义一个options 不然默认为undefined 获取不到宽高等属性
        options = options || {};
        this.width = options.width || 20;
        this.height = options.height || 20;
        // 记录蛇的移动方向
        this.direction = options.direction || "right";
        // 蛇的身体
        this.body = [
            { x: 3, y: 2, color: "red" },
            { x: 2, y: 2, color: "blue" },
            { x: 1, y: 2, color: "blue" }
        ];
    }

    Snake.prototype.render = function (map) {
        // 删除之前的蛇
remove();
        // 循环数组 把每一个蛇节渲染到map里
        for (var i = 0; i < this.body.length; i++) {
            var obj = this.body[i];
            // 动态创建div
            var div = document.createElement("div");
            map.appendChild(div);
// 记录蛇节
            elements.push(div);
            // 设置样式
            div.style.position = position;
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.left = obj.x * this.width + "px";
            div.style.top = obj.y * this.height + "px";
            div.style.backgroundColor = obj.color;
        }
    }
    // 删除
    function remove(){
        for(var i = elements.length - 1;i>=0;i--){
            // 删除div removeChild 移除子元素
            elements[i].parentNode.removeChild(elements[i]);
            // 删除数组元素
            elements.splice(i,1);
        }
    }
    // 蛇的移动方法
    Snake.prototype.move = function (food,map) {
        // 控制蛇的身体移动 当前蛇节到上一个的位置
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        // 控制蛇头的移动
        // 判断设移动的方向
        var head = this.body[0];
        switch (this.direction) {
            case "right":
                head.x = head.x + 1;
                break;
            case "left":
                head.x = head.x - 1;
                break;
            case "top":
                head.y = head.y - 1;
                break;
            case "bottom":
                head.y = head.y + 1;
                break;
        }
        // 判断蛇是否和食物重合
        var headx = head.x * this.width;
        var heady = head.y * this.height;
if(headx ===food.x && heady ===food.y){
    //让蛇增加一节
    var last = this.body[this.body.length -1];
    this.body.push({
        x :last.x,
        y : last.y,
        color : last.color
    })
    // 随机生成食物
    food.render(map)
}
    }
    window.Snake = Snake;
})()
// 测试
// var map = document.getElementById("map");
// var snake = new Snake();
// snake.rander(map);