<template>
  <div class="index">
    <div class="header">
      <div class="sanjiao"></div>
      <div class="datetime">
        <span>{{ curTime }}</span>
      </div>
      <div class="title">
        <img src="../../public/Snipaste_2021-07-08_11-32-34.jpg" alt="" />
        <p>充电大数据管理平台</p>
      </div>
      <div class="sanjiao2"></div>
    </div>
    <div class="content">
      <div class="left">
        <div class="cur-num">
          <div style="padding-left: 20px">
            <span class="num">{{ in_face_num > out_face_num ? in_face_num - out_face_num : 0 }}</span
            ><span class="unit">人</span>
          </div>
          <div class="text">当前在场人数</div>
        </div>
        <div class="cur-num">
          <div style="padding-left: 20px">
            <span class="num">{{ in_car_num > out_car_num ? in_car_num - out_car_num : 0 }}</span
            ><span class="unit">辆</span>
          </div>
          <div class="text">当前在场电动车数</div>
        </div>
        <div class="statistics">
          <div class="count-title">
            <img src="jiao.png" />出入场数量统计
            <hr style="margin: 10px 0" />
          </div>
          <div class="count-num">
            <div class="img"><img src="renru.png" /></div>
            <div class="info">
              <div
                class="count"
                style="
                  background-image: linear-gradient(
                    to right,
                    rgba(90, 173, 182, 1),
                    rgba(90, 173, 182, 0)
                  );
                "
              >
                <span class="num">{{ in_face_num }}</span
                ><span class="unit">人</span>
              </div>
              <div class="text">入场总人数</div>
            </div>
          </div>
          <div class="count-num">
            <div class="img"><img src="cheru.png" /></div>
            <div class="info">
              <div
                class="count"
                style="
                  background-image: linear-gradient(
                    to right,
                    rgba(125, 60, 50, 1),
                    rgba(16, 33, 106, 0)
                  );
                "
              >
                <span class="num">{{ in_car_num }}</span
                ><span class="unit">辆</span>
              </div>
              <div class="text">入场总电动车数</div>
            </div>
          </div>
          <div class="count-num">
            <div class="img"><img src="renchu.png" /></div>
            <div class="info">
              <div
                class="count"
                style="
                  background-image: linear-gradient(
                    to right,
                    rgba(137, 108, 22, 1),
                    rgba(137, 108, 22, 0)
                  );
                "
              >
                <span class="num">{{ out_face_num }}</span
                ><span class="unit">人</span>
              </div>
              <div class="text">出场总人数</div>
            </div>
          </div>
          <div class="count-num">
            <div class="img"><img src="chechu.png" /></div>
            <div class="info">
              <div
                class="count"
                style="
                  background-image: linear-gradient(
                    to right,
                    rgba(66, 162, 130, 1),
                    rgba(16, 33, 106, 0)
                  );
                "
              >
                <span class="num">{{ out_car_num }}</span
                ><span class="unit">辆</span>
              </div>
              <div class="text">出场总电动车数</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="camera">
          <div class="video">
            <div class="count-title">
              <div class="count-tit-">
                <img src="jiao.png" />
                <p>摄像机1 - 入</p>
              </div>
              <hr style="margin: 5px 0" />
            </div>
            <iframe class="shipin" style="margin:0px;padding:0px;" id="entryIframe" src=''></iframe>
          </div>
          <div class="video2">
            <div class="count-title">
              <div class="count-tit-">
                <img src="jiao.png" />
                <p>入场抓拍</p>
              </div>
              <hr style="margin: 5px 0" />
            </div>
            <div class="in_box">
              <div class="in_box_heng">
                <div class="in_box_item" v-for="(v, i) in in_face" :key="i">
                  <div class="in_box_item_div">
                    <img
                      :src="'data:image/jpeg;base64,' + v.imageData.chipImage"
                      alt=""
                    />
                  </div>
                  <div class="in_box_bottom">
                    <span class="in_box_bottom_ico">入</span>
                    <span class="in_box_bottom_text">{{ v.time }}</span>
                  </div>
                </div>
              </div>
              <div class="in_box_heng">
                <div class="in_box_item" v-for="(v, i) in in_car" :key="i">
                  <div class="in_box_item_div">
                    <img
                      :src="'data:image/jpeg;base64,' + v.imageData.chipImage"
                      alt=""
                    />
                  </div>
                  <div class="in_box_bottom">
                    <span class="in_box_bottom_ico">入</span>
                    <span class="in_box_bottom_text">{{ v.time }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="camera" style="margin-top: 0.7%; height: 49.7%">
          <div class="video">
            <div class="count-title">
              <div class="count-tit-">
                <img src="jiao.png" />
                <p>摄像机2 - 出</p>
              </div>
              <hr style="margin: 5px 0" />
            </div>
            <iframe class="shipin" style="margin:0px;padding:0px;" id="exitIframe" src=''></iframe>
          </div>
          <div class="video2">
            <div class="count-title">
              <div class="count-tit-">
                <img src="jiao.png" />
                <p>出场抓拍</p>
              </div>
              <hr style="margin: 5px 0" />
            </div>
            <div class="in_box">
              <div class="in_box_heng">
                <div class="in_box_item" v-for="v in out_face" :key="v.id">
                  <div class="in_box_item_div">
                    <img
                      :src="'data:image/jpeg;base64,' + v.imageData.chipImage"
                      alt=""
                    />
                  </div>
                  <div class="in_box_bottom">
                    <span
                      class="in_box_bottom_ico"
                      style="background: #307b26; color: #b5eab5"
                      >出</span
                    >
                    <span class="in_box_bottom_text">{{ v.time }}</span>
                  </div>
                </div>
              </div>
              <div class="in_box_heng">
                <div class="in_box_item" v-for="v in out_car" :key="v.id">
                  <div class="in_box_item_div">
                    <img
                      :src="'data:image/jpeg;base64,' + v.imageData.chipImage"
                      alt=""
                    />
                  </div>
                  <div class="in_box_bottom">
                    <span
                      class="in_box_bottom_ico"
                      style="background: #307b26; color: #b5eab5"
                      >出</span
                    >
                    <span class="in_box_bottom_text">{{ v.time }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, monitoring, non_motor, pedestrian, livestream } from "../request/api";
export default {
  name: "Index",
  data: () => {
    return {
      in_videoItem: null,
      out_videoItem: null,
      websock: null,

      in_face: [],
      out_face: [],
      in_car: [],
      out_car: [],
      curTime: "",

      // 入/出 场人数
      in_face_num: 0,
      out_face_num: 0,
      // 入/出 场车辆
      in_car_num: 0,
      out_car_num: 0,
    };
  },
  //离开路由之后断开websocket连接
  destroyed() {
    this.websock.close();
  },
  async created() {
    if (!sessionStorage.getItem("token")) {
      await this.getLogin();
    }
    this.initWebSocket();
  },
  mounted() {
    // this.getVideo(0); // 监控 入场
    // this.getVideo(1); // 监控  出场

    this.getFace("entry", null); // 入口 人脸
    this.getFace("exit", null); // 出口 人脸

    this.getnon_motor("entry", null); // 入口 车辆
    this.getnon_motor("exit", null); // 出口 车辆

    this.getPedestrian("entry", null); // 入口 行人
    this.getPedestrian("exit", null); // 出口 行人

    this.curTime = setInterval(() => {
      this.curTime = new Date(); // 修改数据date
      let Y = this.curTime.getFullYear();
      let M = this.curTime.getMonth() + 1;
      let D = this.curTime.getDate();

      let h = this.checkTime(this.curTime.getHours());
      let m = this.checkTime(this.curTime.getMinutes());
      let s = this.checkTime(this.curTime.getSeconds());

      this.curTime = `${Y}年${M}月${D}日 ${h}:${m}:${s}`;
    }, 1000);

    this.getLivestream('entry')
    this.getLivestream('exit')
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  methods: {
    // 获取车辆(出入)
    getnon_motor(direction, id) {
      non_motor({
        pageNumber: 0,
        pageSize: 4,
        location: direction,
        contentId: id,
      }).then((res) => {
        if (res.status == 200 && res.data.list) {

          if (this.in_car.length == 0 || this.out_car.length == 0) {
            res.data.list.forEach((v) => {
              if (direction == "exit" && this.out_car.length < 4) {
                  this.out_car.push(v)
              } else if (direction == "entry" && this.in_car.length < 4) {
                  this.in_car.push(v);
              }
            });

            direction == "entry"
            ? (this.in_car_num = res.data.total)
            : (this.out_car_num = res.data.total);

          } else if (this.in_car.length > 0 || this.out_car.length > 0) {
            direction == "exit"
              ? this.out_car.push(res.data.list[0])
              : this.in_car.push(res.data.list[0]);

            this.in_car.length > 4 ? this.in_car.splice(0, 1) : this.in_car;
            this.out_car.length > 4 ? this.out_car.splice(0, 1) : this.out_car;

            direction == "entry"
            ? (this.in_car_num += 1)
            : (this.out_car_num += 1);
          }
        }
      });
    },
    // 获取人脸(出入)
    getFace(direction, id) {
      monitoring({
        pageNumber: 0,
        pageSize: 4,
        location: direction,
        contentId: id,
      }).then((res) => {
        if (res.status == 200 && res.data.list) {
          if (this.in_face.length == 0 || this.out_face.length == 0) {
            res.data.list.forEach((v) => {
              if (direction == "exit" && this.out_face.length < 4) {
                  this.out_face.push(v)
              } else if (direction == "entry" && this.in_face.length < 4) {
                  this.in_face.push(v);
              }
            });

            direction == "entry"
            ? (this.in_face_num = res.data.total)
            : (this.out_face_num = res.data.total);

          } else if (this.in_face.length > 0 || this.out_face.length > 0) {

            direction == "exit"
              ? this.out_face.push(res.data.list[0])
              : this.in_face.push(res.data.list[0]);

            this.in_face.length > 4 ? this.in_face.splice(0, 1) : this.in_face;
            this.out_face.length > 4 ? this.out_face.splice(0, 1) : this.out_face;

            direction == "entry"
            ? (this.in_face_num += 1)
            : (this.out_face_num += 1);
          }
        }
      });
    },
    getPedestrian(direction, id) {
      pedestrian({
        pageNumber: 0,
        pageSize: 4,
        location: direction,
        contentId: id,
      }).then((res) => {
        if (res.status == 200 && res.data.list) {
          if (this.in_face.length == 0 || this.out_face.length == 0) {
            res.data.list.forEach((v) => {
              if (direction == "exit" && this.out_face.length < 4) {
                  this.out_face.push(v)
              } else if (direction == "entry" && this.in_face.length < 4) {
                  this.in_face.push(v);
              }
            });

            direction == "entry"
            ? (this.in_face_num = res.data.total)
            : (this.out_face_num = res.data.total);

          } else if (this.in_face.length > 0 || this.out_face.length > 0) {
            direction == "exit"
              ? this.out_face.push(res.data.list[0])
              : this.in_face.push(res.data.list[0]);

            this.in_face.length > 4 ? this.in_face.splice(0, 1) : this.in_face;
            this.out_face.length > 4 ? this.out_face.splice(0, 1) : this.out_face;

            direction == "entry"
            ? (this.in_face_num += 1)
            : (this.out_face_num += 1);
          }
        }
      });
    },
    // 实时视频流
    getLivestream(location) {
      livestream({
        location: location,
      }).then((res) => {
          console.log("open " + location + " livestream")
          var ifr = document.getElementById(location + 'Iframe');
          ifr.srcdoc = res.data;
          ifr.onload = function() {
            console.log("Location " + location + " livestrame started");
            var exitIframe = document.getElementById('exitIframe');
            var entryIframe = document.getElementById('entryIframe');
            var exitVideo = exitIframe.contentWindow.document.getElementById('videoElem');
            var entryVideo = entryIframe.contentWindow.document.getElementById('videoElem');
            exitVideo.setAttribute("style", "margin:0px;padding:0px;width:" + exitIframe.clientWidth + "px;height:" + exitIframe.clientHeight + "px;object-fit:fill;");
            entryVideo.setAttribute("style", "margin:0px;padding:0px;width:" + entryIframe.clientWidth + "px;height:" + entryIframe.clientHeight + "px;object-fit:fill;");
          };
      });
    },
    checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    },
    initWebSocket() {
      //初始化weosocket
      let wsuri = `ws://${location.hostname}:8080/ws/event`;
      // let wsuri = `ws://192.168.22.192:8080/ws/event`;
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      // this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    // websocketonopen() {
    //   //连接建立之后执行send方法发送数据
    //   let actions = { test: "12345" };
    //   this.websocketsend(JSON.stringify(actions));
    // },
    websocketonerror() {
      //连接建立失败重连
      console.log("websocket连接失败");
    },
    websocketonmessage(e) {
      //数据接收
      let websocketData = JSON.parse(e.data).data;
      if (websocketData) {
        console.log("event->" + websocketData.type)
        if (
          websocketData.type == "face" &&
          websocketData.location == "exit"
        ) {
          // 人脸出口
          this.getFace("exit", websocketData.contentId);
        } else if (
          websocketData.type == "face" &&
          websocketData.location == "entry"
        ) {
          // 人脸入口
          this.getFace("entry", websocketData.contentId);
        } else if (
          websocketData.type == "pedestrian" &&
          websocketData.location == "exit"
        ) {
          // 行人出口
          this.getPedestrian("exit", websocketData.contentId);
        } else if (
          websocketData.type == "pedestrian" &&
          websocketData.location == "entry"
        ) {
          // 行人入口
          this.getPedestrian("entry", websocketData.contentId);
        } else if (
          websocketData.type == "non-motor" &&
          websocketData.location == "entry"
        ) {
          // 非机动车入口
          this.getnon_motor("entry", websocketData.contentId); // 入口 车辆
        } else if (
          websocketData.type == "non-motor" &&
          websocketData.location == "exit"
        ) {
          // 非机动车出口
          this.getnon_motor("exit", websocketData.contentId); // 出口 车辆
        } else {
          console.log("unknow type "+ websocketData.type)
        }
      }
    },
    // websocketsend(Data) {
    //   //数据发送
    //   this.websock.send(Data);
    // },
    //关闭
    websocketclose() {
      console.log("websocket断开连接");
      setTimeout(()=> {
        console.log("reload page");
        location.reload();
        sessionStorage.removeItem("token");
      }, 10000)
    },

    getLogin() {
      login({
        userName: "admin",
        password: "abc123",
      }).then((res) => {
        if (res.status == 200) {
          sessionStorage.setItem("token", `Bearer ${res.data.token}`);
          location.reload();
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
