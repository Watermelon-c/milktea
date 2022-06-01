<template>
  <div class="box">
    <div class="luckyBox">
      <div>
        <LuckyWheel
          ref="myLucky"
          width="300px"
          height="300px"
          :prizes="prizes"
          :blocks="blocks"
          :buttons="buttons"
          @start="startCallback"
          @end="endCallback"
          class="myLucky"
        />
        <span class="timeText">距离小心肝生日还有</span>
        <van-count-down
          :time="time"
          format="DD 天 HH 时 mm 分 ss 秒"
          class="timeText"
        />
        <br />
        <span class="memorialDayText">我们在一起{{memorialDay}}天啦</span>
        <br/>
        <van-icon
          name="setting-o"
          size="20px"
          color="#7232dd"
          @click="show = true"
        />
      </div>
    </div>
    <van-action-sheet v-model="show" title="编辑">
      <div class="content">
        <h4 class="nameTitle">删除</h4>
        <template v-for="(item, index) in prizes">
          <van-tag
            v-if="item.show"
            :key="index"
            closeable
            size="medium"
            type="primary"
            @close="isTrue(index)"
            class="labelName"
            color="#7232dd"
            @click.native="specificIndex(index)"
            >{{ item.fonts[0].text }}</van-tag
          >
        </template>
        <h4 class="nameTitle">添加</h4>
        <van-cell-group>
          <van-field
            v-model="text"
            label="名字"
            placeholder="请输入需要添加的名字"
          />
        </van-cell-group>
        <van-button color="#7232dd" round class="btn" @click="btn"
          >保存</van-button
        >
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { Notify } from "vant";
export default {
  name: "HelloWorld",
  props: {},
  data() {
    return {
      blocks: [{ padding: "13px", background: "#617df2" }],
      prizes: [],
      buttons: [
        { radius: "50px", background: "#617df2" },
        { radius: "45px", background: "#afc8ff" },
        {
          radius: "40px",
          background: "#869cfa",
          pointer: true,
          fonts: [{ text: "饮\n咩", top: "-20px" }],
        },
      ],
      text: "",
      show: false,
      time: new Date("2022/09/20").valueOf() - new Date().valueOf(),
      specific:'',
      memorialDay:'',
    };
  },
  created() {
    this.prizes = this.init.prizes;
    if (this.common.getLocal("prizesData")) {
      this.prizes = JSON.parse(this.common.getLocal("prizesData"));
      this.upColour();
    } else {
      this.prizes = this.init.prizes;
    }
    let day1 = new Date('2022-03-09')
    let day2 = new Date()
    this.memorialDay = Math.trunc(((day2 - day1) / (1000 * 60 * 60 * 24)) + 1)
  },
  methods: {
    // 点击抽奖按钮会触发star回调
    startCallback() {
      // 调用抽奖组件的play方法开始游戏
      this.$refs.myLucky.play();
      // 模拟调用接口异步抽奖
      setTimeout(() => {
        // 假设后端返回的中奖索引是0
        const index = this.random(1, this.prizes.length);
        // console.log(index);
        // 调用stop停止旋转并传递中奖索引
        if(this.specific != ''){
          this.$refs.myLucky.stop(this.specific);
        }else{
          this.$refs.myLucky.stop(index);
        }
      }, 2000);
    },
    // 抽奖结束会触发end回调
    endCallback(prize) {
      // console.log(prize);
      // Dialog.alert({
      //   message: "恭喜抽到" + prize.fonts[0].text,
      // }).then(() => {
      //   // on close
      // });
      Dialog.alert({
        message: "恭喜抽到" + prize.fonts[0].text,
        theme: "round-button",
        confirmButtonColor: "#7232dd",
      }).then(() => {
        // on close
        this.specific = ''
      });
    },
    random(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    // 添加
    btn: function () {
      if (this.text != "") {
        if (!this.common.duplicateChecking(this.prizes, this.text)) {
          if (this.prizes.length % 2 == 0) {
            this.prizes.push({
              fonts: [{ text: this.text, top: "10%" }],
              background: "#e9e8fe",
              show: "true",
            });
            this.text = "";
          } else {
            this.prizes.push({
              fonts: [{ text: this.text, top: "10%" }],
              background: "#b8c5f2",
              show: "true",
            });
            this.text = "";
          }
          this.upColour();
          this.common.setLocal("prizesData", JSON.stringify(this.prizes));
          Notify({
            message: "添加成功",
            color: "#fff",
            background: "#7232dd",
          });
        } else {
          Dialog.alert({
            message: "已存在该名称",
          }).then(() => {
            // on close
            this.text = "";
          });
        }
      }
    },
    // 删除
    isTrue: function (index) {
      Dialog.confirm({
        message: "是否确认删除",
        overlay: true,
        height: "60px",
      })
        .then(() => {
          // on confirm
          this.prizes[index].show = false;
          this.prizes = this.prizes.filter((item) => {
            return item.show;
          });
          this.upColour();
          this.common.setLocal("prizesData", JSON.stringify(this.prizes));
        })
        .catch(() => {
          // on cancel
        });
    },
    // 重新更换颜色
    upColour: function () {
      for (let i = 0; i < this.prizes.length; i++) {
        if (i % 2 == 0) {
          this.prizes[i].background = "#e9e8fe";
        } else {
          this.prizes[i].background = "#b8c5f2";
        }
      }
    },
    // 指定
    specificIndex:function(index){
      this.specific = index
    }
  },
};
</script>

<style scoped lang='less'>
.box {
  height: 100vh;
  .luckyBox {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .labelName {
    margin: 5px;
  }
  .content {
    padding: 16px 16px 20px;
  }
  .nameTitle {
    margin: 5px 0px;
    text-align: left;
  }
  .btn {
    width: 100%;
    height: 30px;
    margin: 10px 0px;
  }
  .timeText {
    display: inline-block;
    color: #7232dd;
    font-size: 14px;
    // margin-bottom: 20px;
    font-weight: 600;
    margin-top: 20px;
  }
  .memorialDayText{
    display: inline-block;
    color: #7232dd;
    font-size: 14px;
    margin-bottom: 20px;
    font-weight: 600;
    margin-top: 20px;
  }
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
