!function(n){var e={};function t(o){if(e[o])return e[o].exports;var u=e[o]={i:o,l:!1,exports:{}};return n[o].call(u.exports,u,u.exports,t),u.l=!0,u.exports}t.m=n,t.c=e,t.d=function(n,e,o){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:o})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var u in n)t.d(o,u,function(e){return n[e]}.bind(null,u));return o},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=0)}([function(n,e,t){n.exports=function(n,e){var o=t(1);n.get("/",(function(n,t){o.count(e,(function(n){t.render("index",{title:"버스 탑승 등록",count:n})}))})),n.get("/list",(function(n,t){var u=n.session,r="user",i="";u.login?(r="manager",i=u.username):n.query.auth&&(r=n.query.auth),o.listData(e,{},t,(function(n){var o=0,u=0;e.count({checkin1:!0},(function(s,a){o=a,e.count({checkin2:!0},(function(e,s){u=s,t.render("list",{registers:n,auth:r,title:"등록자 리스트",user:i,c1total:o,c2total:u})}))}))}))})),n.get("/login",(function(n,e){e.render("login",{title:"인솔자 로그인"})})),n.post("/login",(function(n,t){var o=n.body.num,u=n.body.pwd;e.findOne({num:o,passwd:u},(function(e,o){if(o)if(e)t.send("111");else if("manager"==o.auth){var u=n.session;u.username==o.name?t.send("101"):(u.username=o.name,u.login=1,t.send("100"))}else t.send("111");else t.send("111")}))})),n.post("/logout",(function(n,e){n.session.login&&n.session.destroy((function(n){n?e.send("111"):e.send("100")}))})),n.post("/check/manager",(function(n,t){var o=n.body.num,u="user";"true"==n.body.checked&&(u="manager"),e.findOneAndUpdate({num:o},{$set:{auth:u}},(function(n,e){e||t.send("111"),t.send("100")}))})),n.post("/checkin/user",(function(n,t){var o=n.body.num,u=n.body.name,r=n.body.checked,i={};i["seoul"==u?"checkin1":"checkin2"]=r,e.findOneAndUpdate({num:o},{$set:i},(function(n,e){e||t.send("111"),t.send("100")}))})),n.get("/delete",(function(n,t){o.deleteData(e,{num:n.query.num},t,(function(n,e){t.redirect("/list?auth=admin")}))})),n.post("/delete",(function(n,t){o.deleteData(e,{num:n.body.num,name:n.body.name,passwd:n.body.pwd},t)})),n.post("/save",(function(n,t){o.count(e,(function(u){if(44!=u){var r=new e;r.name=n.body.name,r.num=n.body.num,r.registerDate=o.today(),r.group=n.body.group,r.passwd=n.body.pwd,r.auth=o.AUTH.USER,r.trip=n.body.trip,o.saveData(e,r,t)}else t.send("111")}))}))}},function(n,e){e.AUTH={USER:"user",MANAGER:"manager",ADMIN:"admin"},e.today=function(){var n=new Date,e=[],t=[];t.push(n.getFullYear()),t.push(n.getMonth()+1),t.push(n.getDate()),e[e.length]=t.join("-");var o=[];return o.push(n.getHours()),o.push(n.getMinutes()),e[e.length]=o.join(":"),e.join(" ")},e.deleteData=function(n,e,t,o){n.remove(e,(function(n,e){if(o)o(n,e);else{if(n)return t.status(500).json({error:n});0==e.result.n?t.send("010"):t.send("100")}}))},e.saveData=function(n,e,t){n.findOne({num:e.num},(function(n,o){if(n)return t.status(500).json({error:n});o?t.send("010"):e.save((function(n){if(n)return console.error(n),void t.json({result:0});t.send("100")}))}))},e.listData=function(n,e,t,o){n.find(e,(function(n,e){if(n)return t.status(500).send({error:"database failure"});e&&o(e)}))},e.count=function(n,e){n.count({},(function(n,t){e(t)}))}}]);