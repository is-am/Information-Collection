// `config` 是为请求提供的配置信息
export default {
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseUrl: {
    // 代表开发环境
    dev: "",
    // 代表生产环境
    pro: "",
  },
};
