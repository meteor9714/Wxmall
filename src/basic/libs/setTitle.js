const SetTitle = {}

function setMetaTitle (title) {
  document.title = title
  let mobile = navigator.userAgent.toLowerCase()
  if (/iphone|ipad|ipod/.test(mobile)) {
    // IOS webview中网页标题只加载一次，动态改变是无效的，无法通过document.title改变
    let iframe = document.createElement('iframe')
    iframe.style.visibility = 'hidden'
    // 替换成站标favicon路径或者任意存在的较小的图片即可
    // iframe.setAttribute('src', 'static/img/blank.png') should need? TODO
    let iframeCallback = function () {
      setTimeout(function () {
        iframe.removeEventListener('load', iframeCallback)
        document.body.removeChild(iframe)
      }, 0)
    }
    iframe.addEventListener('load', iframeCallback)
    document.body.appendChild(iframe)
  }
}

SetTitle.install = function (Vue) {
  Vue.directive('title', {
    inserted: function (el, binding) {
      setMetaTitle(binding.value)
    }
  })
}

export default SetTitle
