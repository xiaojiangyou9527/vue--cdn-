/**
 * 指令loading
 */
Vue.prototype.$loading = {
  show: function () {
    if (document.querySelector('#vue-loading')) return
    var LoadingTip = Vue.extend({
      template: `<div id="vue-loading" style="position: fixed;top: 0;right: 0;bottom:0;left: 0;z-index: 99999;display: flex;justify-content: center;align-items: center;padding-bottom: 120px;background: rgba(0,0,0,.08);"><img src="/resources/img/loading.gif" style="height: 50px"></div>`
    })
    var tpl = new LoadingTip().$mount().$el
    document.body.appendChild(tpl)
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
Vue.prototype.$toast = function ({iconType , msg, ...other}) {
  if (toastVMStatus) return
  toastVMStatus = true
  var toastTpl = Vue.extend({
    template: `<div id="vue-taost" style="z-index: 99999; position: fixed;top: 0;right: 0;bottom: 0;left: 0;background: rgba(0, 0, 0, .2);display: flex;justify-content: center;align-items: center;">
      <div style="padding: 10px;background: #ffffff;border-radius: 8px; width: 270px;display:flex;flex-direction: column;align-items: center;">
        <div style="padding-bottom: 15px;display:flex;justify-content: space-between;width: 100%">
          <span></span>
          <img style="width: 15px;height: 15px;display:block" src="/resources/img/close.png" @click="toastClick">
        </div>
        <img style="height:125px;display:block" :src="'/resources/img/' + iconType + '.png'">
        <p style="text-align: center;color: #333;padding: 30px 0 15px 0;">{{msg}}</p>
      </div>
    </div>`,
    data: function () {
      return {
        msg: msg || '',
        iconType: iconType || 'success'
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
  var toastVM = new toastTpl();
  var tpl = toastVM.$mount().$el;
  document.body.appendChild(tpl);
  document.querySelector('#vue-taost').addEventListener('touchmove', function (e) {
    e.stopPropagation()
    e.preventDefault()
  })
}

// 还款计划
Vue.component('yl-refund-plan', {
  template: '#yl-refund-plan-template',
  props: {
    repaymentPlan: {
      type: Object,
      default: {}
    }
  }
});
// 页面银行卡列表
Vue.component('yl-back-card', {
  template: '#yl-back-card-template',
  props: {
    backCard: {
      type: Object,
      default: {}
    }
  }
});
// 借款用途
Vue.component('yl-borrow-use', {
  template: '#yl-borrow-use-template',
  props: {
    borrowUse: {
      type: Object,
      default: {}
    }
  },
  data:function () {
    return {
      list: [
        { id: "PL03", name: '国内教育' }, 
        { id: "PL05", name: '装修' }, 
        { id: "PL07", name: '旅游' }, 
        { id: "PL14", name: '医疗' }, 
        { id: "PL30", name: '日常生活消费' }
      ]
    }
  },
  methods: {
    clickBorrowUse(val) {
      var self = this
      this.list.forEach(function(item) {
        if (val.id == item.id) {
          self.$emit('editBorrowUse', item)
        }
      })
    }
  }
});
// 借款期限
Vue.component('yl-borrow-time', {
  template: '#yl-borrow-time-template',
  props: {
    borrowTime: {
      type: Object,
      default: {}
    }
  },
  data:function () {
    return {
      list: [
        { id: "PL03", name: '3个月' }, 
        { id: "PL05", name: '6个月' }, 
        { id: "PL07", name: '9个月' }, 
        { id: "PL14", name: '12个月' }, 
        { id: "PL30", name: '24个月' }
      ]
    }
  },
  methods: {
    clickBorrowTime(val) {
      var self = this
      this.list.forEach(function(item) {
        if (val.id == item.id) {
          self.$emit('editBorrowTime', item)
        }
      })
    }
  }
});
// 发送验证码
Vue.component('yl-send-code', {
  template: '#yl-send-code-template',
  props: {
    sendCode: {
      type: Object,
      default: {}
    }
  },
  data:function () {
    return {
      btnText: '发送验证码',
      disabled: false,
      code: ''
    }
  },
  methods: {
    getSendCode () {
      this.disabled = true
      var timer = null;
      var count = 5;
      if (this.btnText == '发送验证码' || this.btnText == '重新发送') {
        var _self = this
        timer = setInterval(function(){
          console.log(count)
          count--;
          _self.btnText = '重新发送' + count + 's';
          if (count <=0) {
            clearInterval(timer);
            _self.btnText = '重新发送';
            _self.disabled = false
          }
        },1000);
      }
    },
    saveSendCode () {
      if (this.btnText == 'btnText' ) {
        this.$toast({
          type: 'error',
          msg: '请获取验证码！'
        })
        return
      }
      if (!this.code) {
        this.$toast({
          type: 'error',
          msg: '请填写验证码！'
        })
        return
      }
      this.$emit('saveSendCode')
    }
  }
});

// 业务功能页面
window.onload = function() {
  'use strict';
  var jumpPage = {
    template: '#jump-template',
    data: function() {
      return {
      }
    },
    methods: {
    },
    mounted: function() {
      this.$loading.show()
      var _self = this
      setTimeout(function () {
        _self.$router.replace('/apply')
      }, 2000)
    },
    destroyed: function() {
      this.$loading.hide()
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
        this.$router.push('/borrow')
        // this.$toast({
        //   type: 'success',
        //   msg: '成功！'
        // })

        // ajax.post('HYDSndMsgCd', {
        //   TRANS_CODE: 'SI_LON10001',
        //   CHNL_ID: '02',
        //   PLATFORM: 'HZ',
        //   VERSION: "1.5.0",
        //   TERMINAL_TYPE: "200002",
        //   CUST_TYPE: ''
        // }, function () {
        //   console.log('123')
        // })
      }
    },
    created: function() {
    }
  };

  var borrowPage = {
    template: '#borrow-template',
    data: function() {
      return {
        withDrawamt: '',
        understandRate: { //了解年化利率
          visible: false,
        },
        repaymentPlan: { // 还款计划
          visible: false,
        },
        backCard: {
          visible: false
        },
        borrowUse: {
          visible: false,
          id: null,
          name: '选择' 
        },
        borrowTime: {
          visible: false,
          id: null,
          name: '' 
        },
        sendCode: {
          visible: false,
        },
        signChecked: false //签署勾选
      }
    },
    watch: {
      withDrawamt (val) {
        // console.log(val)
      }
    },
    methods: {
      // 下一步操作
      saveAgain () {
        this.sendCode.visible = true
      },
      editBorrowUse (item) {
        this.borrowUse.visible = false
        this.borrowUse.id = item.id
        this.borrowUse.name = item.name
      },
      editBorrowTime (item) {
        this.borrowTime.visible = false
        this.borrowTime.id = item.id
        this.borrowTime.name = item.name
      },
      blurWithDrawamt () {
        var val = String(this.withDrawamt)
        if (val) {
          if (!isNumeric(val)) {
            this.$toast({
              type: 'error',
              msg: '请输入合法的借款金额！'
            })
            this.withDrawamt = ''
            return
          }
          if (val && val % 100 != 0) {
            this.$toast({
              type: 'error',
              msg: '请输入100的整数倍金额！'
            })
            return
          }
          if (val && !Number(500) || val && val < Number(500)) {
            this.$toast({
              type: 'error',
              msg: '最低借款金额500元起！'
            })
            return
          }
        }
      },
      delWithDrawamt () {
        this.withDrawamt = ''
      },
      saveSendCode () {
        this.sendCode.visible = false
      }
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
      component: jumpPage,
      meta:{
        title: '合意贷'
      }
      // redirect: '/404'
    },{
      path: '/apply',
      component: applyPage,
      meta:{
        title: '借款额度'
      }
    },{
      path: '/borrow',
      component: borrowPage,
      meta:{
        title: '借款'
      }
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
    if (to.meta.title) {
      document.title = to.meta.title
    }
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

  // 创建vue实例
  var createVue = function () {
    new Vue({
      delimiters: ['[[', ']]'],
      router: _router,
      componentName: 'app'
    }).$mount('#app');

    Vue.use(vant.Lazyload);
  };
  createVue();
};
