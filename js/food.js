// 自调用函数，开启一个新的作用域，避免命名冲突
(function () {
    // 记录上一次生成的食物，为删除做准备
    var elements = [];

    function Food(options) {
        options = options || {};
        this.x = options.x || 0;
        this.x = options.x || 0;
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.color = options.color || "green";
    }
    Food.prototype.render = function (map) {
        //删除之前创建的食物
        remove();


        //随机设置坐标 offWidth offHeight  w和h一定要大写
        this.x = Tools.getRandom(0, map.offsetWidth / this.width - 1) * this.width;
        this.y = Tools.getRandom(0, map.offsetHeight / this.height - 1) * this.height;
        // 动态创建div， 页面上显示的食物
        var div = document.createElement("div");
        //放入父容器
        map.appendChild(div);
        // 把数组push进div里
        elements.push(div);

        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
        div.style.position = "absolute";
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;
    }

    function remove() {
        for (var i = elements.length - 1; i >= 0; i--) {
            //删除div
            // removeChild方法 移除子元素 parentNode 父元素
            elements[i].parentNode.removeChild(elements[i]);
            //删除数组中的元素
            elements.splice(i, 1);
        }
    }

    // 使food构造函数 外部可以访问
    window.Food = Food;
})()
// 测试
// map = document.getElementById("map");
// food = new Food();
// food.render(map);