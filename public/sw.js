var serviceWorkerOption = {
  "assets": [
    "/style.css",
    "/application.js"
  ]
};
        
        /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/sw.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || Function(\"return this\")() || (1, eval)(\"this\");\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzP2NkMDAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDIiwiZmlsZSI6Ii4vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSwgZXZhbCkoXCJ0aGlzXCIpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/webpack/buildin/global.js\n");

/***/ }),

/***/ "./public/js/sw.js":
/*!*************************!*\
  !*** ./public/js/sw.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nvar CACHE_NAME;\nvar cacheFirstNetwork = ['slow-2g', '2g'];\nvar cacheFirstUrl = ['/about', '/singleplayer'];\n\nvar assets = _toConsumableArray(global.serviceWorkerOption.assets.map(function (asset) {\n  return '/dist' + asset;\n})).concat(['/', '/favicon.ico'], cacheFirstUrl);\n\nself.addEventListener('install', function (event) {\n  CACHE_NAME = new Date().toISOString();\n  console.log(assets);\n  event.waitUntil(global.caches.open(CACHE_NAME).then(function (cache) {\n    return cache.addAll(assets);\n  }).then(function () {\n    console.log('Added to cache: ', assets);\n  }).catch(function (err) {\n    console.log(err);\n    throw err;\n  }));\n});\nself.addEventListener('activate', function (event) {\n  event.waitUntil(global.caches.keys().then(function (cacheNames) {\n    return Promise.all(cacheNames.map(function (cacheName) {\n      if (cacheName.indexOf(CACHE_NAME) === 0) {\n        return null;\n      }\n\n      return global.caches.delete(cacheName);\n    }));\n  }));\n});\nself.addEventListener('fetch', function (event) {\n  if (event.request.method !== 'GET') {\n    return;\n  }\n\n  var url = new URL(event.request.url);\n  console.log(url);\n\n  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {\n    return;\n  }\n\n  if (url.pathname.indexOf('/api') !== -1 || url.pathname.indexOf('/storage') !== -1) {\n    return;\n  }\n\n  if (global.navigator.connection !== undefined && global.navigator.connection.effectiveType !== undefined && cacheFirstNetwork.includes(global.navigator.connection.effectiveType)) {\n    console.log('Connection:' + global.navigator.connection.effectiveType);\n    event.respondWith(global.caches.match(url.pathname).catch(function () {\n      return fetch(event.request);\n    }));\n    event.waitUntil(update(event.request));\n  } else {\n    event.respondWith(update(event.request).catch(function () {\n      return global.caches.match(url.pathname);\n    }));\n  }\n});\n\nfunction update(request) {\n  return fetch(request).then(function (resp) {\n    if (resp.ok) {\n      return global.caches.open(CACHE_NAME).then(function (cache) {\n        console.log('update cache');\n        cache.put(request, resp.clone());\n        return resp;\n      });\n    }\n  });\n}\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvc3cuanM/NDM4NyJdLCJuYW1lcyI6WyJDQUNIRV9OQU1FIiwiY2FjaGVGaXJzdE5ldHdvcmsiLCJjYWNoZUZpcnN0VXJsIiwiYXNzZXRzIiwiZ2xvYmFsIiwic2VydmljZVdvcmtlck9wdGlvbiIsIm1hcCIsImFzc2V0Iiwic2VsZiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsImNvbnNvbGUiLCJsb2ciLCJ3YWl0VW50aWwiLCJjYWNoZXMiLCJvcGVuIiwidGhlbiIsImNhY2hlIiwiYWRkQWxsIiwiY2F0Y2giLCJlcnIiLCJrZXlzIiwiY2FjaGVOYW1lcyIsIlByb21pc2UiLCJhbGwiLCJjYWNoZU5hbWUiLCJpbmRleE9mIiwiZGVsZXRlIiwicmVxdWVzdCIsIm1ldGhvZCIsInVybCIsIlVSTCIsIm1vZGUiLCJwYXRobmFtZSIsIm5hdmlnYXRvciIsImNvbm5lY3Rpb24iLCJ1bmRlZmluZWQiLCJlZmZlY3RpdmVUeXBlIiwiaW5jbHVkZXMiLCJyZXNwb25kV2l0aCIsIm1hdGNoIiwiZmV0Y2giLCJ1cGRhdGUiLCJyZXNwIiwib2siLCJwdXQiLCJjbG9uZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxJQUFJQSxVQUFKO0FBRUEsSUFBTUMsaUJBQWlCLEdBQUcsQ0FBQyxTQUFELEVBQVksSUFBWixDQUExQjtBQUNBLElBQU1DLGFBQWEsR0FBRyxDQUFDLFFBQUQsRUFBVyxlQUFYLENBQXRCOztBQUNBLElBQU1DLE1BQU0sc0JBQU9DLE1BQU0sQ0FBQ0MsbUJBQVAsQ0FBMkJGLE1BQTNCLENBQWtDRyxHQUFsQyxDQUFzQyxVQUFBQyxLQUFLO0FBQUEsU0FBSSxVQUFVQSxLQUFkO0FBQUEsQ0FBM0MsQ0FBUCxVQUF3RSxHQUF4RSxFQUE2RSxjQUE3RSxHQUFnR0wsYUFBaEcsQ0FBWjs7QUFFQU0sSUFBSSxDQUFDQyxnQkFBTCxDQUFzQixTQUF0QixFQUFpQyxVQUFBQyxL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QUFOLENBQ0k2QixNQUFNLENBQUNsQyxLQUFLLENBQUNvQixPQUFQLENBRFY7QUFHSCxHQVpELE1BWU87QUFDSHBCLFNBQUssQ0FBQytCLFdBQU4sQ0FDSUcsTUFBTSxDQUFDbEMsS0FBSyxDQUFDb0IsT0FBUCxDQUFOLENBQ0tULEtBREwsQ0FDVztBQUFBLGFBQU1qQixNQUFNLENBQUNZLE1BQVAsQ0FBYzBCLEtBQWQsQ0FBb0JWLEdBQUcsQ0FBQ0csUUFBeEIsQ0FBTjtBQUFBLEtBRFgsQ0FESjtBQUlIO0FBQ0osQ0FqQ0Q7O0FBbUNBLFNBQVNTLE1BQVQsQ0FBaUJkLE9BQWpCLEVBQTBCO0FBQ3RCLFNBQU9hLEtBQUssQ0FBQ2IsT0FBRCxDQUFMLENBQ0ZaLElBREUsQ0FDRyxVQUFDMkIsSUFBRCxFQUFVO0FBQ1osUUFBSUEsSUFBSSxDQUFDQyxFQUFULEVBQWE7QUFDVCxhQUFPMUMsTUFBTSxDQUFDWSxNQUFQLENBQWNDLElBQWQsQ0FBbUJqQixVQUFuQixFQUNGa0IsSUFERSxDQUNHLFVBQUNDLEtBQUQsRUFBVztBQUNiTixlQUFPLENBQUNDLEdBQVIsQ0FBWSxjQUFaO0FBQ0FLLGFBQUssQ0FBQzRCLEdBQU4sQ0FBVWpCLE9BQVYsRUFBbUJlLElBQUksQ0FBQ0csS0FBTCxFQUFuQjtBQUNBLGVBQU9ILElBQVA7QUFDSCxPQUxFLENBQVA7QUFNSDtBQUNKLEdBVkUsQ0FBUDtBQVdILEMiLCJmaWxlIjoiLi9wdWJsaWMvanMvc3cuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgQ0FDSEVfTkFNRTtcblxuY29uc3QgY2FjaGVGaXJzdE5ldHdvcmsgPSBbJ3Nsb3ctMmcnLCAnMmcnXTtcbmNvbnN0IGNhY2hlRmlyc3RVcmwgPSBbJy9hYm91dCcsICcvc2luZ2xlcGxheWVyJ107XG5jb25zdCBhc3NldHMgPSBbLi4uZ2xvYmFsLnNlcnZpY2VXb3JrZXJPcHRpb24uYXNzZXRzLm1hcChhc3NldCA9PiAnL2Rpc3QnICsgYXNzZXQpLCAnLycsICcvZmF2aWNvbi5pY28nLCAuLi5jYWNoZUZpcnN0VXJsXTtcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdpbnN0YWxsJywgZXZlbnQgPT4ge1xuICAgIENBQ0hFX05BTUUgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgY29uc29sZS5sb2coYXNzZXRzKTtcbiAgICBldmVudC53YWl0VW50aWwoXG4gICAgICAgIGdsb2JhbC5jYWNoZXNcbiAgICAgICAgICAgIC5vcGVuKENBQ0hFX05BTUUpXG4gICAgICAgICAgICAudGhlbihjYWNoZSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlLmFkZEFsbChhc3NldHMpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQWRkZWQgdG8gY2FjaGU6ICcsIGFzc2V0cyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH0pXG4gICAgKTtcbn0pO1xuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2FjdGl2YXRlJywgZXZlbnQgPT4ge1xuICAgIGV2ZW50LndhaXRVbnRpbChcbiAgICAgICAgZ2xvYmFsLmNhY2hlcy5rZXlzKCkudGhlbihjYWNoZU5hbWVzID0+IHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgICAgICAgICAgICBjYWNoZU5hbWVzLm1hcChjYWNoZU5hbWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FjaGVOYW1lLmluZGV4T2YoQ0FDSEVfTkFNRSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdsb2JhbC5jYWNoZXMuZGVsZXRlKGNhY2hlTmFtZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pXG4gICAgKTtcbn0pO1xuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2ZldGNoJywgZXZlbnQgPT4ge1xuICAgIGlmIChldmVudC5yZXF1ZXN0Lm1ldGhvZCAhPT0gJ0dFVCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoZXZlbnQucmVxdWVzdC51cmwpO1xuICAgIGNvbnNvbGUubG9nKHVybCk7XG4gICAgaWYgKGV2ZW50LnJlcXVlc3QuY2FjaGUgPT09ICdvbmx5LWlmLWNhY2hlZCcgJiYgZXZlbnQucmVxdWVzdC5tb2RlICE9PSAnc2FtZS1vcmlnaW4nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodXJsLnBhdGhuYW1lLmluZGV4T2YoJy9hcGknKSAhPT0gLTEgfHwgdXJsLnBhdGhuYW1lLmluZGV4T2YoJy9zdG9yYWdlJykgIT09IC0xKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZ2xvYmFsLm5hdmlnYXRvci5jb25uZWN0aW9uICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgZ2xvYmFsLm5hdmlnYXRvci5jb25uZWN0aW9uLmVmZmVjdGl2ZVR5cGUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBjYWNoZUZpcnN0TmV0d29yay5pbmNsdWRlcyhnbG9iYWwubmF2aWdhdG9yLmNvbm5lY3Rpb24uZWZmZWN0aXZlVHlwZSkpIHtcblxuICAgICAgICBjb25zb2xlLmxvZygnQ29ubmVjdGlvbjonICsgZ2xvYmFsLm5hdmlnYXRvci5jb25uZWN0aW9uLmVmZmVjdGl2ZVR5cGUpO1xuICAgICAgICBldmVudC5yZXNwb25kV2l0aChcbiAgICAgICAgICAgIGdsb2JhbC5jYWNoZXMubWF0Y2godXJsLnBhdGhuYW1lKVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiBmZXRjaChldmVudC5yZXF1ZXN0KSlcbiAgICAgICAgKTtcbiAgICAgICAgZXZlbnQud2FpdFVudGlsKFxuICAgICAgICAgICAgdXBkYXRlKGV2ZW50LnJlcXVlc3QpXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZXZlbnQucmVzcG9uZFdpdGgoXG4gICAgICAgICAgICB1cGRhdGUoZXZlbnQucmVxdWVzdClcbiAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4gZ2xvYmFsLmNhY2hlcy5tYXRjaCh1cmwucGF0aG5hbWUpKVxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5mdW5jdGlvbiB1cGRhdGUgKHJlcXVlc3QpIHtcbiAgICByZXR1cm4gZmV0Y2gocmVxdWVzdClcbiAgICAgICAgLnRoZW4oKHJlc3ApID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwLm9rKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdsb2JhbC5jYWNoZXMub3BlbihDQUNIRV9OQU1FKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoY2FjaGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGUgY2FjaGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlLnB1dChyZXF1ZXN0LCByZXNwLmNsb25lKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3A7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./public/js/sw.js\n");

/***/ })

/******/ });