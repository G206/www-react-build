"use strict";var precacheConfig=[["/index.html","41c870da5d07068d15b461b7beb5116a"],["/static/css/main.af2b0e99.css","553e946b35afcc7403977d52426692aa"],["/static/media/AVENGEANCE.2dee406d.ttf","2dee406dad27473484ad853f316b5e82"],["/static/media/Chair.71227018.jpg","71227018cbcc8705041d9a1db2fb1792"],["/static/media/ChairTwistArmUpDown.ef320407.jpg","ef32040716212ac8cd1631a14e30d003"],["/static/media/ChairTwistPrayer.3af645b5.jpg","3af645b536259c30fd7b3ed8d8858f55"],["/static/media/DownwardDogHandtoKnee.3e69b1e1.jpg","3e69b1e1eb4bfd2783f8c7211cc73bf8"],["/static/media/DownwardDogLegUptoHip.efc64f24.jpg","efc64f249e80ca4a4f3f2661b19fcdea"],["/static/media/FourLimbStaff.4505b654.jpg","4505b65469e8638a4c3a4d20a240b297"],["/static/media/FourLimbStaffKneetoElbow.22a5458c.jpg","22a5458caf6a3ee5fdc918f40b954bed"],["/static/media/HalfMoon.90a18879.jpg","90a188798568b30507a0368b67b7ebca"],["/static/media/HalfMoonReverse.3ac39d9d.jpg","3ac39d9d520c76c368a57163f12af610"],["/static/media/OneLegForwardDownwardStretch.fdb4d6f2.jpg","fdb4d6f2935e1f71ad70b0e726226224"],["/static/media/RightAnglePoseGrab.ad520461.jpg","ad5204610c301f63ce51edfed463ca78"],["/static/media/RunnersKneeDownHandtoAnkle.8a76b4e5.jpg","8a76b4e5aa68ebf0a1d8015397277120"],["/static/media/RunnersPoseDownwardStretch.1510e072.jpg","1510e0724404171c73e35346ca807e87"],["/static/media/RunnersPoseUpwardSalute.1f83dbac.jpg","1f83dbac468f5c5671e863b010dff4e4"],["/static/media/RunnersPrayer.c9d3a774.jpg","c9d3a7740803c228a36f8b8b90513abc"],["/static/media/RunnersTwistArmUpDown.917a2a44.jpg","917a2a44723d51bd0f5f499ef7304cf2"],["/static/media/RunnersTwistPrayer.5d4baf4f.jpg","5d4baf4f1c4b09a75094ec6e7f819a01"],["/static/media/SidePlank.b492df63.jpg","b492df6354aa5a0907854d965890106f"],["/static/media/Triangle.185d0594.jpg","185d05947bc3205889481104f06bc939"],["/static/media/TriangleReverse.caadee3a.jpg","caadee3a8c5e77305f3de69ef15b136f"],["/static/media/UpwardDog.00d51e89.jpg","00d51e898f88c7b8a69b1dc03b05fcac"],["/static/media/Warrior1.68bb5708.jpg","68bb570817a835a4e2e2018077607a4c"],["/static/media/Warrior2.0ada4c02.jpg","0ada4c027d09debc44437601d0b616f5"],["/static/media/Warrior3.1f7bb95d.jpg","1f7bb95d59b2c3692d48bbf1ede1f14c"],["/static/media/WarriorReverse.0bb820f1.jpg","0bb820f193d2a679c52c6e617f5e9255"],["/static/media/WideStanceBothArmDown.b373e236.jpg","b373e23618e15014f47ec93d5e594083"],["/static/media/WideStanceForwardBend.49adcf37.jpg","49adcf378f0dd09c8f5696a4f2dfd1ef"],["/static/media/WideStanceRightArmDown.5e74fdce.jpg","5e74fdce60b6a83b903e9640b927942e"],["/static/media/Xolonium-Regular.15f3a5a7.ttf","15f3a5a7a8424c8f843ba6c83bfc360d"],["/static/media/dma263_p1.a02649a3.jpg","a02649a37aa4234259a5d8f81c209467"],["/static/media/dma263_p2.cc52722c.jpg","cc52722ce5e85311d7f7a5630b79ce66"],["/static/media/favicon.132a1173.png","132a1173816bdf0121a4d1e458d77062"],["/static/media/galaga.dc4e3ade.png","dc4e3adeb8e2f59d3f3ab11a9b5c88cd"],["/static/media/googlewebdesigner_icon.e732f517.png","e732f517c660a1eaaee96511a424a575"],["/static/media/prog109_a4.246bb5a5.jpg","246bb5a5695e7f0d1987c37c8eb60c41"],["/static/media/prog109_p3.c169387c.jpg","c169387c6ff53e44b833597256b1f7b9"],["/static/media/prog209_a2.489956fa.png","489956fad321d6c403bdc92a998ae3b3"],["/static/media/prog209_a4.5.e6850292.jpg","e68502925895b8b452f054ae370fe36c"],["/static/media/prog209_a7.af3bd1c3.png","af3bd1c392f64e5ca7fffeee0d8dd6bd"],["/static/media/prog209_p1.375784c9.jpg","375784c9c209b01781dd1e48abb11dce"],["/static/media/prog209_p2.ad50e6da.jpg","ad50e6dadfc76812b211e6da806f9898"],["/static/media/prog209_p3.57d4030d.jpg","57d4030dc0efd48ffed34b8cfa58b254"],["/static/media/stage1.4136c4a4.jpg","4136c4a4c8a07e8584861a2f32069db0"],["/static/media/stage2.01d82e56.jpg","01d82e56f556d7f92d177613347cbde7"],["/static/media/stage3.89c46d3b.jpg","89c46d3b7c30fab26204ec32c998cf1a"],["/static/media/stage4.797233fa.jpg","797233fa719b46d5b3bab8a4c9644ecc"],["/static/media/stage5.0a64caba.jpg","0a64caba385f30479393d746cf0f41fc"],["/static/media/stage6.14ec0ab5.jpg","14ec0ab577937079bc0c5842aac1500b"],["/static/media/web_ban_bottom.a8ac2409.jpg","a8ac24093ab1fa7f0c761f7358f1c66e"],["/static/media/web_design.132a1173.png","132a1173816bdf0121a4d1e458d77062"],["/static/media/yinyang.5eac016a.png","5eac016a0415eb0fec4accedac6b5b9a"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),n=createCacheKey(c,hashParamName,t,/\.\w{8}\./);return[c.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(c){return setOfCachedUrls(c).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return c.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),c="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,c),e=urlsToCacheKeys.has(t));var n="/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(n,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});