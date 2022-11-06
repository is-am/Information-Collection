function Mine(tr, td, mineNum) {
  this.tr = tr; //行数
  this.td = td; //列数
  this.mineNum = mineNum; //雷数

  this.squares = []; //存储所有方块的信息，它是一个二维数组，按行与列的循序排列，存储都使用行列的形式
  this.tds = []; //存储所有单元格的DOM
  this.surplusMine = mineNum; //剩余雷量的数目
  this.allRight = []; //点击标的小红旗是否都是地雷，用来判断是否游戏成功

  this.parent = document.querySelector(".gameBox");
}

//生成n个不重复的数字
Mine.prototype.randomNum = function () {
  var square = new Array(this.tr * this.td); //生成一个有长度的空数组，长度为格子数量
  for (let i = 0; i < square.length; i++) {
    square[i] = i + 1; //为数组赋值
  }
  square.sort(function () {
    return 0.5 - Math.random();
  }); //按照函数进行排序，这是随机排序
  // console.log(square);
  return square.slice(0, this.mineNum); //按照雷的数量截取数组
};
Mine.prototype.init = function () {
  //创建雷
  var rn = this.randomNum(); //雷在格子里的位置
  var n = 0; //用来找到格子对应的索引，for循环里i和j都只有28次循环，所以要用n来累加
  for (let i = 0; i < this.tr; i++) {
    this.squares[i] = [];
    for (let j = 0; j < this.td; j++) {
      n++; //累计循环次数
      //取一个方块在数组里的数据要使用行与列的形式去取。找方块周围的方块的时候有使用坐标的形式去取。行与列的形式跟坐标的形式x,y是刚好相反的
      if (rn.indexOf(n) != -1) {
        //如果这个条件成立，说明现在循环到的这个索引在雷的数组里找到了，那就表示这个索引对应的是一个雷
        this.squares[i][j] = { type: "mine", x: j, y: i }; //表示雷
      } else {
        this.squares[i][j] = {
          type: "number",
          x: j,
          y: i,
          value: 0,
        }; //表示数字，value表示周围格子雷的数量
      }
      /*
        {
          type: "mine",
           x: 列, 
           y: 行
        }
        {
          type: "number", 
          x: 列, 
          y: 行, 
          value: 表示周围格子雷的数量
        }
      */
    }
  }

  //阻止鼠标右键默认事件
  this.parent.oncontextmenu = function () {
    return false;
  };

  // console.log(this.squares);
  this.updateNum();
  this.createDom();

  this.mineNumDom = document.querySelector(".mineNum");
  this.mineNumDom.innerHTML = this.surplusMine;
};

//创建表格
Mine.prototype.createDom = function () {
  var table = document.createElement("table");
  var This = this;
  for (let i = 0; i < this.tr; i++) {
    //行
    var domTr = document.createElement("tr");
    this.tds[i] = [];
    for (let j = 0; j < this.td; j++) {
      //列
      var domTd = document.createElement("td");

      domTd.pos = [i, j]; //把格子对应的行与列存到格子身上，为了下面通过这个值去数组里取到对应的数据
      //给td添加按下鼠标按钮时触发事件
      domTd.onmousedown = function () {
        This.play(event, this); //This指的是实例对象，this指的是点击的那个tb
      };

      this.tds[i][j] = domTd;

      // if (this.squares[i][j].type == "mine") {
      //   //添加雷
      //   domTd.className = "mine";
      // }
      // if (this.squares[i][j].type == "number") {
      //   //添加数字
      //   domTd.innerHTML = this.squares[i][j].value;
      // }

      domTr.appendChild(domTd);
    }
    table.appendChild(domTr);
  }
  this.parent.innerHTML = "";
  this.parent.appendChild(table);
};

//找到某个方格周围的8个方格
Mine.prototype.getAround = function (square) {
  var x = square.x;
  var y = square.y; //格子对应的x和y
  var result = []; //把找到的格子的坐标返回出去(二维数组)

  /*
      x-1,y-1    x,y-1    x+1,y-1
      x-1,y      x,y      x+1,y
      x-1,y+1    x,y+1    x+1,y+1
  */

  //通过坐标去循环九宫格
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (
        i < 0 || //格子超出了左边的范围
        i > this.td - 1 || //格子超出了右边的范围
        j < 0 || //格子超出了上边的范围
        j > this.tr - 1 || //格子超出了下边的范围
        (i == x && j == y) || //当前循环到的格子是本身
        this.squares[j][i].type == "mine" //循环到的格子是雷
      ) {
        continue; //跳过当前循环
      }
      result.push([j, i]); //要以行与列的形式返回出去，因为到时候需要用它去取数组里的数据
    }
  }
  return result;
};

//更新所有的数字
Mine.prototype.updateNum = function () {
  for (let i = 0; i < this.tr; i++) {
    for (let j = 0; j < this.td; j++) {
      //只更新雷周围的数字
      if (this.squares[i][j].type == "number") {
        continue;
      }

      var num = mine.getAround(mine.squares[i][j]); //获取到每一个雷周围的数字
      for (let k = 0; k < num.length; k++) {
        /*
          num[k] == [1,2]
          num[k][0] == 1
          num[k][1] == 2
        */
        this.squares[num[k][0]][num[k][1]].value += 1;
      }
    }
  }
};

Mine.prototype.play = function (e, obj) {
  //点击的是左键
  if (e.which == 1 && obj.className != "flag") {
    //后面的条件是限制用户标完小红旗之后就不能再点击左键
    var This = this;
    var curSquare = this.squares[obj.pos[0]][obj.pos[1]]; //根据行列获取td对应的数据
    var cl = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
    ];
    if (curSquare.type == "number") {
      //用户点到的是数字
      obj.innerHTML = curSquare.value;
      obj.className = cl[curSquare.value];
      //判断用户点击的是数字0
      if (curSquare.value == 0) {
        /*用递归
            用户点到了数字0
              1.显示自己
              2.找四周
                  1.显示四周（如果四周值不为0，就显示到那个数字，结束递归）
                  2.如果值为0
                      1.显示自己
                      2.找四周
                          1.显示四周（如果四周值不为0，就显示到那个数字，结束递归）
                          2.如果值为0
                              1.显示自己
                              2.找四周
                              ......
        */
        obj.innerHTML = ""; //如果数字为0，就不显示数字
        function getAllZero(square) {
          var around = This.getAround(square); //调用方法，找四周格子

          for (let i = 0; i < around.length; i++) {
            //遍历四周的格子
            //around[i] = [3, 4]
            var x = around[i][0]; //行
            var y = around[i][1]; //列

            //把点击的四周的格子显示出来
            This.tds[x][y].className = cl[This.squares[x][y].value];

            if (This.squares[x][y].value == 0) {
              //如果以某个格子为中心找到的格子值为0，那就继续调用函数（递归）
              if (!This.tds[x][y].check) {
                //给对应的td添加一个属性，这条属性用于决定这个格子有没有被找过。如果找过的话，赋值为true，下次就不会再找了
                This.tds[x][y].check = true;
                //以为0的格子,再次调用递归
                getAllZero(This.squares[x][y]);
              }
            } else {
              //如果以某个格子为中心找到的四周格子的值不为0，那就把数字显示出来
              This.tds[x][y].innerHTML = This.squares[x][y].value;
            }
          }
        }
        getAllZero(curSquare);
      }
    } else {
      //用户点到的是雷
      // console.log("点到雷了");
      this.gameOver(obj);
    }
  }
  //点击的是右键
  if (e.which == 3) {
    //如果右击的是一个数字同时，className不能等于flag
    if (obj.className && obj.className != "flag") {
      return;
    }
    obj.className = obj.className == "flag" ? "" : "flag"; //class的切换

    // // 判断小红旗标的是不是都是雷
    // if (this.squares[obj.pos[0]][obj.pos[1]].type == "mine") {
    //   this.allRight.push(true); //用户标的小红旗都是雷
    //   console.log(this.allRight);
    // } else {
    //   this.allRight.push(f);
    //   console.log(this.allRight);
    // }

    //标注一个雷，剩余雷数就减一。取消一个，剩余雷数就加一
    if (obj.className == "flag") {
      this.mineNumDom.innerHTML = --this.surplusMine;
    } else {
      this.mineNumDom.innerHTML = ++this.surplusMine;
    }

    //如果剩余雷数为0，并且标注的都是雷，那么游戏胜利
    if (this.surplusMine == 0) {
      //遍历所有格子
      for (let i = 0; i < this.tr; i++) {
        for (let j = 0; j < this.td; j++) {
          if (this.tds[i][j].className == "flag") {
            if (this.squares[i][j].type != "mine") {
              alert("很遗憾，游戏失败！");
              this.gameOver();
              return;
            }
          }
        }
      }
      alert('"恭喜你，游戏胜利!"');
      // if (this.allRight >= this.mineNum) {
      //   alert("恭喜你，游戏胜利!");
      // } else {
      //   alert("很遗憾，游戏失败！");
      //   this.gameOver();
      // }
    }
  }
};

//游戏失败函数
Mine.prototype.gameOver = function (clickTd) {
  /*
    1.显示所有的雷
    2.取消所有格子的点击事件
    2.给点中的雷标红
  */

  for (let i = 0; i < this.tr; i++) {
    for (let j = 0; j < this.td; j++) {
      if (this.squares[i][j].type == "mine") {
        //显示所有的雷
        this.tds[i][j].className = "mine";
      }
      //取消所有格子的点击事件
      this.tds[i][j].onmousedown = null;
    }
  }

  if (clickTd) {
    clickTd.style.borderColor = "red";
    alert("点到雷了，游戏失败！");
  }
};

//button的功能
var btns = document.querySelectorAll(".header button");
var mine = null; //用来存储生成的实例
var ln = 0; //用来处理当前选中的状态
var arr = [
  [9, 9, 3],
  [16, 16, 40],
  [28, 28, 99],
];

for (let i = 0; i < btns.length - 1; i++) {
  btns[i].onclick = function () {
    btns[ln].className = "";
    ln = i;
    this.className = "active";
    mine = new Mine(...arr[i]);
    mine.init();
  };
}

btns[0].onclick(); //默认化一下

btns[3].onclick = function () {
  mine.init();
};

// var mine = new Mine(5, 5, 2);
// mine.init();

// console.log(mine.getAround(mine.squares[0][0]));

/*
  关于剩余格子判断胜利
    tds中储存着所有单元格信息，而为未点开的格子是td或者是td.flag，点开的格子是td.one....带有class。
      所以只要得到td加上td.flag的数量与雷数相等，就可以判断游戏胜利


    可以给每个格子的信息中加上一个isOpen的信息，未点开的是isOpen:false,点开的为isOpen:true
        只要循环所有格子得到格子信息里的isOpen为false的数量，与雷的数量相等，游戏胜利

*/
