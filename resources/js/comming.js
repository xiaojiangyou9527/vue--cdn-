
// 请求出理
var ajax = {
  post: function (url, data, callback, complete) {
    var headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      // 'clientId': window.version,
      // 'jwt': jwt
    }
    // if (url.indexOf(gatewayUrl) === -1) {
    //   data.uid = storage.getItem('account.uid');
    //   headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    // }
    $.ajax({
      type: 'POST',
      timeout: 10000,
      url: url,
      data: data,
      headers: headers,
      dataType: 'json',
      success: function (res) {
        callback && callback(res);
      },
      error: function (xhr, errorType, err) {
        if (errorType == 'timeout') {
          overlay({
            icon: 'warn',
            text: '请求超时'
          });
        }
        console.error(err);
      },
      complete: function (xhr, status) {
        complete && complete();
      }
    })
  },
  get: function (url, callback) {
    var headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      // 'clientId': window.version,
      // 'jwt': jwt
    }
    // if (url.indexOf(gatewayUrl) === -1) {
    //   data.uid = storage.getItem('account.uid');
    //   headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    // }
    $.ajax({
      type: 'GET',
      timeout: 5000,
      url: url,
      headers: headers,
      dataType: 'json',
      success: function (res) {
        callback && callback(res);
      },
      error: function (xhr, errorType, err) {
        if (errorType == 'timeout') {
          overlay({
            icon: 'warn',
            text: '请求超时'
          });
        }
        console.error(err);
      }
    })
  }
};

/**
 * 指令loading
 */
Vue.prototype.$loading = {
  show: function () {
    // 如果页面有loading则不继续执行
    if (document.querySelector('#vue-loading')) return
    // 1、创建构造器，定义loading模板
    var LoadingTip = Vue.extend({
      template: `<div id="vue-loading" style="position: fixed;top: 0;right: 0;bottom:0;left: 0;z-index: 1000;display: flex;justify-content: center;align-items: center;padding-bottom: 120px;background: rgba(0,0,0,.08);"><img src="/resources/img/loading.gif" style="height: 50px"></div>`
    })
    // 2、创建实例，挂载到文档以后的地方
    var tpl = new LoadingTip().$mount().$el
    // 3、把创建的实例添加到body中
    document.body.appendChild(tpl)
    // 阻止遮罩滑动
    document.querySelector('#vue-loading').addEventListener('touchmove', function (e) {
      e.stopPropagation()
      e.preventDefault()
    })
  },
  hide: function() {
    var tpl = document.querySelector('#vue-loading')
    if (!tpl) return
    document.body.removeChild(tpl)
  }
}
/**
 * 指令toast
 */
var toastVMStatus = false
Vue.prototype.$toast = function ({type, msg, ...other}) {
  // 如果页面有loading则不继续执行
  if (toastVMStatus) return
  toastVMStatus = true
  // 1、创建构造器，定义loading模板
  var toastTpl = Vue.extend({
    template: `<div id="vue-taost" style="z-index: 1000; position: fixed;top: 0;right: 0;bottom: 0;left: 0;background: rgba(0, 0, 0, .08);display: flex;justify-content: center;align-items: center;">
      <div style="padding: 10px;background: #ffffff;border-radius: 8px; width: 270px;display:flex;flex-direction: column;align-items: center;">
        <div style="padding-bottom: 15px;display:flex;justify-content: space-between;width: 100%">
          <span></span>
          <img style="width: 15px;display:block" src="/resources/img/close.png" @click="toastClick">
        </div>
        <img style="height:125px;display:block" :src="'/resources/img/' + iconType + '.png'">
        <p style="text-align: center;color: #333;padding: 30px 0 15px 0;">{{msg}}</p>
      </div>
    </div>`,
    data: function () {
      return {
        msg: msg || '',
        iconType: type || 'success'
      }
    },
    methods: {
      toastClick () {
        var tpl = document.querySelector('#vue-taost')
        if (!tpl) return
        toastVMStatus = false
        document.body.removeChild(tpl)
      }
    }
  })
  // 2、创建实例，挂载到文档以后的地方
  var toastVM = new toastTpl();
  var tpl = toastVM.$mount().$el;
  document.body.appendChild(tpl);
  // 阻止遮罩滑动
  document.querySelector('#vue-taost').addEventListener('touchmove', function (e) {
    e.stopPropagation()
    e.preventDefault()
  })
}
// 业务功能页面
window.onload = function() {
  'use strict';
  
  var jumpPage = {
    template: '#jump-template',
    data: function() {
      return {
        invest: 'Hellow World!'
      }
    },
    methods: {
    },
    created: function() {
    }
  };

  var applyPage = {
    template: '#apply-template',
    data: function() {
      return {
        invest: 'Hellow World!'
      }
    },
    methods: {
      btnClick() {
        // this.$router.push('/borrow')
        this.$toast({
          type: 'success',
          msg: '成功！'
        })
      }
    },
    created: function() {
    }
  };

  var borrowPage = {
    template: '#borrow-template',
    data: function() {
      return {
      }
    },
    methods: {
    },
    created: function() {
    }
  }

  var errorPage = {
    template: '#error-template',
    data: function() {
      return {
      }
    },
  };
  // 路由配置
  var _routes = [
    {
      path: '/',
      component: jumpPage
      // redirect: '/404'
    },{
      path: '/apply',
      component: applyPage
    },{
      path: '/borrow',
      component: borrowPage
    },
    
    
    {
      path: '/404',
      component: errorPage
      // redirect: '/404'
    }
  ];
  // 创建路由
  var _router = new VueRouter({
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
    routes: _routes
  });

  _router.beforeEach (function (to, from, next) {
    next();
    // if (!to.meta.skipAuth) {
    //   if (!jwt) {
    //     location.reload()
    //   } else {
    //     next();
    //   }
    // } else {
    //   next();
    // }
  });

  Vue.prototype.$appName = 'My App'
  // 创建vue实例
  var createVue = function () {
    new Vue({
      delimiters: ['[[', ']]'],
      router: _router,
      componentName: 'app'
    }).$mount('#app');
  };
  createVue();
};
