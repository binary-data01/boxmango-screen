<template>
  <div class="index">
    <!-- 头部 -->
    <div class="header">
      <div class="title">
        <p>花果山地铁站智能充电大中台</p>
      </div>
      <div class="datetime">
        <span>{{ curTime }}</span>
      </div>
    </div>

    <div class="content">
      <div class="left">
        <!-- 左边顶部盒子 -->
        <div class="cur-num">
          <div class="cur_num_left">
            <div class="all_num">
              <div class="img_box">
                <img src="../../public/组 273.png" alt="" />
              </div>
              <div class="content_text_r">
                <p style="color: #3869f9">{{ data_list.use_user }}</p>
                <span>在充用户数</span>
              </div>
            </div>
            <div class="all_num">
              <div class="img_box">
                <img src="../../public/组 274.png" alt="" />
              </div>
              <div class="content_text_r">
                <p style="color: #ffa41e">{{ data_list.free_port }}</p>
                <span>剩余接口数</span>
              </div>
            </div>
          </div>
          <div class="cur_num_right">
            <div class="all_num">
              <div class="img_box">
                <img src="../../public/组 269.png" alt="" />
              </div>
              <div class="content_text_r">
                <p style="color: #56c1f6">{{ data_list.device }}</p>
                <span>总设备数</span>
              </div>
            </div>
            <div class="all_num">
              <div class="img_box">
                <img src="../../public/组 275.png" alt="" />
              </div>
              <div class="content_text_r">
                <p style="color: #4acd41">{{ data_list.device_port }}</p>
                <span>总接口数</span>
              </div>
            </div>
            <div class="all_num">
              <div class="img_box">
                <img src="../../public/组 271.png" alt="" />
              </div>
              <div class="content_text_r">
                <p style="color: #02c0b1">{{ data_list.all_user }}</p>
                <span>总用户数</span>
              </div>
            </div>
            <div class="all_num">
              <div class="img_box">
                <img src="../../public/组 272.png" alt="" />
              </div>
              <div class="content_text_r">
                <p style="color: #ff7858">{{ data_list.all_order }}</p>
                <span>总订单数</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 左边中间监控盒子 -->
        <div class="statistics">
          <div class="camera">
            <div class="p_text">
              <p>入场摄像头</p>
            </div>
            <div class="iframe_box">
              <iframe class="shipin" style="margin:0px;padding:0px;" id="entryIframe" src=''></iframe>
            </div>
          </div>
          <div class="camera">
            <div class="p_text">
              <p>出场摄像头</p>
            </div>
            <div class="iframe_box">
              <iframe class="shipin" style="margin:0px;padding:0px;" id="exitIframe" src=''></iframe>
            </div>
          </div>
        </div>

        <!-- 左边底部图表盒子 -->
        <div class="chart_b">
          <div class="chart_box">
            <div class="chart_content">
              <div class="content_title">
                <p>近一个月充电用户曲线</p>
              </div>
              <div class="content_mes">
                <span style="margin-right: 13px"
                  >最高充电用户数: <i>{{ max_data }}人</i></span
                >
                <!-- <span>出现时间: <i>{{ max_time[0] }}月{{ max_time[1] }}日</i></span> -->
                <span
                  >出现时间: <i>{{ max_time }}</i></span
                >
              </div>
            </div>
            <div id="quxian" style="width: 100%; height: 95%"></div>
          </div>
          <div class="chart_box">
            <div class="chart_content">
              <div class="content_title">
                <p>异常订单功率曲线图</p>
              </div>
              <div class="content_mes">
                <span style="margin-right: 13px"
                  >最高功率数: <i>{{ abnormal_max_data || "-" }}W</i></span
                >
                <span
                  >出现时间: <i>{{ abnormal_max_time || '-' }}</i></span
                >
              </div>
            </div>
            <div
              v-if="show == '0'"
              style="width: 100%; height: 95%"
              id="abnormal"
            ></div>
            <div v-else class="zanwu">暂无充电异常订单</div>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="car_pai">
          <p>电动车抓拍</p>
        </div>

        <div class="in_box_heng">
          <div class="in_box_item_l">
            <div style="margin-bottom: 12px" v-for="(v, i) in in_car" :key="i">
              <div class="in_box_item_div">
                <img
                  :src="'data:image/jpeg;base64,' + v.imageData.chipImage"
                  alt=""
                />
              </div>
              <div class="in_box_bottom">
                <span class="in_box_bottom_ico2">入</span>
                <span class="in_box_bottom_text">{{ v.time }}</span>
              </div>
            </div>
          </div>
          <div class="in_box_item_r">
            <div style="margin-bottom: 12px" v-for="(v, i) in out_car" :key="i">
              <div class="in_box_item_div">
                <img
                  :src="'data:image/jpeg;base64,' + v.imageData.chipImage"
                  alt=""
                />
              </div>
              <div class="in_box_bottom">
                <span class="in_box_bottom_ico">出</span>
                <span class="in_box_bottom_text">{{ v.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  login,
  // monitoring,
  non_motor,
  boxDevice,
  dayDevice,
  abnormalOrder,
  livestream,
} from "../request/api";
import * as echarts from "echarts";
export default {
  name: "Index",
  data: () => {
    return {
      in_videoItem: null,
      out_videoItem: null,
      websock: null,

      // in_face: [],
      // out_face: [],
      in_car: [],
      out_car: [],
      curTime: "",

      // // 入/出 场人数
      // in_face_num: 0,
      // out_face_num: 0,
      // // 入/出 场车辆
      // in_car_num: 0,
      // out_car_num: 0,

      data_list: {},
      max_data: 0,
      max_time: "",

      abnormal_max_data: 0,
      abnormal_max_time: "",
      show: "",
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
    this.getBoxDevice(); // 场地日情况

    // this.getVideo(0); // 监控 入场
    // this.getVideo(1); // 监控  出场

    // this.getFace("entry", null); // 入口 人脸
    // this.getFace("exit", null); // 出口 人脸

    this.getnon_motor("entry", null); // 入口 车辆
    this.getnon_motor("exit", null); // 出口 车辆

    this.curTime = setInterval(() => {
      this.curTime = new Date(); // 修改数据date
      let Y = this.curTime.getFullYear();
      let M = this.curTime.getMonth() + 1;
      let D = this.curTime.getDate();

      let h = this.checkTime(this.curTime.getHours());
      let m = this.checkTime(this.curTime.getMinutes());
      let s = this.checkTime(this.curTime.getSeconds());

      let week = this.curTime.getDay();
      week =
        week == 1
          ? "一"
          : week == 2
          ? "二"
          : week == 3
          ? "三"
          : week == 4
          ? "四"
          : week == 5
          ? "五"
          : week == 6
          ? "六"
          : "日";

      this.curTime = `${Y}年${M}月${D}日 周${week} ${h}:${m}:${s}`;
    }, 1000);

    this.getChartChongDian();
    this.getChartGongLv();

    this.getLivestream('entry')
    this.getLivestream('exit')
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  methods: {
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

    // 异常功率曲线
    getChartGongLv() {
      abnormalOrder({
        buildname: "花都花果山公园地铁口",
      }).then((res) => {
        res.data.data.length > 0 ? (this.show = "0") : (this.show = "1");
        if (res.data.max_data) {
          this.abnormal_max_data = res.data.max_data;
        }
        if (res.data.max_time) {
          this.abnormal_max_time = res.data.max_time;
        }

        setTimeout(() => {
          var chartDom = document.getElementById("abnormal");
          var myChart = echarts.init(chartDom);
          let option = {
            tooltip: {
              trigger: "axis",
            },
            grid: {
              left: 0,
              right: 0,
              bottom: "3%",
              top: 10,
              containLabel: true,
            },
            xAxis: {
              type: "category",
              /* -----------这鬼地方是需要改变的值(时间戳)------------ */
              data: res.data.time,
              axisLine: {
                lineStyle: {
                  color: "rgba(0, 0, 0, .7)", // x轴颜色
                },
              },
            },
            yAxis: {
              type: "value",
              axisLine: {
                show: false, // 取消显示y轴
              },
              axisTick: {
                show: false, // 取消显示y轴刻度线
              },
              axisLabel: {
                inside: false, // 文字在坐标轴内显示
                margin: 2, // 文字距离y轴的距离
                formatter: function (value) {
                  return value + "W";
                }, // 格式化y轴文字显示
                verticalAlign: "top",
                lineHeight: 0, // 文字距离顶部的距离
                color: "rgba(0, 0, 0, .7)",
              },
              interval: 200,
              splitLine: {
                lineStyle: {
                  color: ["rgba(221, 221, 221, 1)"],
                },
              },
            },
            series: [
              {
                name: "功率",
                type: "line",
                smooth: true,
                /* -------------这鬼地方也是需要改变的值(x轴的值)---------------- */
                data: res.data.data,
                lineStyle: {
                  color: "rgba(255, 147, 39, 1)",
                },
                areaStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "rgba(255, 147, 39, 1)", // 0% 处的颜色
                      },
                      {
                        offset: 0.5,
                        color: "rgba(255, 147, 39, 0.5)", // 50% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "rgba(255, 147, 39, 0)", // 100% 处的颜色
                      },
                    ],
                    global: false, // 缺省为 false
                  },
                },
                // symbol: 'none', // 圆点形状
                // showSymbol: false, // 隐藏圆点
                itemStyle: {
                  color: "rgba(255, 147, 39, 1)", // 拐点颜色
                },
              },
            ],
          };
          myChart.setOption(option);
        }, 100);
      });
    },

    // 近月充电曲线图
    getChartChongDian() {
      dayDevice({
        buildname: "花都花果山公园地铁口",
      }).then((res) => {
        this.max_data = res.data.max_data;
        // this.max_time = res.data.max_time.split('-')
        this.max_time = res.data.max_time;

        var chartDom = document.getElementById("quxian");
        var myChart = echarts.init(chartDom);
        let option = {
          tooltip: {
            trigger: "axis",
          },
          grid: {
            left: 0,
            right: 0,
            bottom: "3%",
            top: 10,
            containLabel: true,
          },
          xAxis: {
            type: "category",
            /* -----------这鬼地方是需要改变的值(时间戳)------------ */
            data: res.data.time,
            axisLine: {
              lineStyle: {
                color: "rgba(0, 0, 0, .7)", // x轴颜色
              },
            },
          },
          yAxis: {
            type: "value",
            axisLine: {
              show: false, // 取消显示y轴
            },
            axisTick: {
              show: false, // 取消显示y轴刻度线
            },
            axisLabel: {
              inside: false, // 文字在坐标轴内显示
              margin: 2, // 文字距离y轴的距离
              formatter: function (value) {
                return value + "人";
              }, // 格式化y轴文字显示
              verticalAlign: "top",
              lineHeight: 0, // 文字距离顶部的距离
              color: "rgba(0, 0, 0, .7)",
            },
            interval: 1,
            splitLine: {
              lineStyle: {
                color: ["rgba(221, 221, 221, 1)"],
              },
            },
          },
          series: [
            {
              name: "充电人数",
              type: "line",
              smooth: true,
              /* -------------这鬼地方也是需要改变的值(x轴的值)---------------- */
              data: res.data.data,
              lineStyle: {
                color: "rgba(58, 135, 218, 1)",
              },
              areaStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(35, 115, 255, 1)", // 0% 处的颜色
                    },
                    {
                      offset: 0.5,
                      color: "rgba(35, 115, 255, 0.5)", // 50% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(35, 115, 255, 0)", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
              // symbol: 'none', // 圆点形状
              // showSymbol: false, // 隐藏圆点
              itemStyle: {
                color: "rgba(58, 135, 218, 1)", // 拐点颜色
              },
            },
          ],
        };
        myChart.setOption(option);
      });
    },

    // 场地日情况
    getBoxDevice() {
      boxDevice({
        buildname: "花都花果山公园地铁口",
      }).then((res) => {
        this.data_list = res.data;
      });
    },

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
              direction == "entry"
                ? this.in_car.unshift(v)
                : this.out_car.unshift(v);
              this.in_car.length > 5 ? this.in_car.splice(5, 1) : this.in_car;
              this.out_car.length > 5
                ? this.out_car.splice(5, 1)
                : this.out_car;
            });
            // direction == "entry"
            //   ? (this.in_car_num = res.data.total)
            //   : (this.out_car_num = res.data.total);
          } else if (this.in_car.length > 0 || this.out_car.length > 0) {
            direction == "entry"
              ? this.in_car.unshift(res.data.list[0])
              : this.out_car.unshift(res.data.list[0]);
            this.in_car.length > 5 ? this.in_car.splice(5, 1) : this.in_car;
            this.out_car.length > 5 ? this.out_car.splice(5, 1) : this.out_car;
            // direction == "entry"
            //   ? (this.in_car_num += 1)
            //   : (this.out_car_num += 1);
          }
        }
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
      let that = this;
      //连接建立失败重连
      setTimeout(() => {
        that.initWebSocket();
      }, 5000);
    },
    websocketonmessage(e) {
      //数据接收
      let websocketData = JSON.parse(e.data).data;
      if (websocketData) {
        if (
          websocketData.type == "pedestrian" &&
          websocketData.location == "exit"
        ) {
          // 人脸出口
          // this.getFace("exit", websocketData.contentId);
        } else if (
          websocketData.type == "pedestrian" &&
          websocketData.location == "entry"
        ) {
          // 人脸入口
          // this.getFace("entry", websocketData.contentId);
        } else if (
          websocketData.type == "non-motor" &&
          websocketData.location == "entry"
        ) {
          // 电鸡入口
          this.getnon_motor("entry", websocketData.contentId); // 入口 车辆
        } else {
          // 电鸡出口
          this.getnon_motor("exit", websocketData.contentId); // 出口 车辆
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
