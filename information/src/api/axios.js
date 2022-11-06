/* 
    将配置文件和axios进行了结合
        通过对当前项目的配置环境做判断来改变接口请求的地址
*/

import axios from "axios";
// `config` 是为请求提供的配置信息
import config from "../config";

// axios.defaults.withCredentials = true; //让ajax携带cookie

// 通过 process.env.NODE_ENV 拿到配置环境进行判断，如果是开发环境那么就取到config下面的dev,如果是生产环境那么就取pro
const baseUrl =
  process.env.NODE_ENV === "development"
    ? config.baseUrl.dev
    : config.baseUrl.pro;

//编写axios的工具类
class HttpRequest {
  constructor(baseUrl) {
    //初始化，根据不同环境响应
    this.baseUrl = baseUrl;
  }

  //这个方法用于定义axios相关的配置
  getInsideConfig() {
    //定义配置的初始值
    const config = {
      baseUrl: this.baseUrl,
      header: {
        "Content-Type": "multipart/form-data",
      }, //请求头的信息
    };
    return config;
  }
  //拦截器函数
  interceptors(axiosInstance) {
    //   axiosInstance是axios的实例
    // 添加请求拦截器
    axiosInstance.interceptors.request.use(
      function (config) {
        // 在发送请求之前做些什么
        return config;
      },
      function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );

    // 添加响应拦截器
    axiosInstance.interceptors.response.use(
      function (response) {
        // console.log(response, "response");
        // 对响应数据做点什么
        return response;
      },
      function (error) {
        // console.log(error, "error");
        // 对响应错误做点什么
        return Promise.reject(error);
      }
    );
  }
  //接口请求时调用，接收传入的相关的配置参数
  request(options) {
    //   axios实例的创建
    const axiosInstance = axios.create();
    // 调用相关的配置信息,将调用拿到的对象进行解构并将传入进来的对象进行解构
    options = { ...this.getInsideConfig(), ...options };
    // 调用拦截器
    this.interceptors(axiosInstance);
    //返回接口请求的结果
    return axiosInstance(options);
  }
}

export default new HttpRequest(baseUrl);
