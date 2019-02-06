
module.exports = function(app,Register){
    var common = require("./common.js");
    var MAXCOUNT = 44;
    
    //인덱스 페이지
    app.get('/',function(req,res){
        common.count(Register,function(count){
            res.render('index',{
                title:"버스 탑승 등록",
                count: count
            });
        })
        
    });
    //리스트 페이지
    app.get('/list',function(req,res){
        var ss = req.session;
        var auth = "user";
        var user = "";
        if(ss.login){
            auth = "manager";
            user = ss.username;
        }else if(req.query.auth){
            auth = req.query.auth;
        }
        common.listData(Register,{},res,function(datas){
            res.render('list', {
                registers: datas,
                auth:auth,
                title:"등록자 리스트",
                user:user
            });
        })
    });

    //로그인 페이지
    app.get('/login',function(req,res){
        res.render('login',{title:"인솔자 로그인"});
    });

    app.post('/login',function(req,res){
        var tel= req.body.num;
        var pw = req.body.pwd;
        Register.findOne({num:tel,passwd:pw},function(err,reg){
            if(!reg){
                res.send("111"); // 잘 못된 비밀번호 또는 아이디입니다.
            }else if(err){
                res.send("111");
            }else{
                if(reg.auth == "manager"){
                    var ss = req.session;
                    if(ss.username == reg.name){
                        res.send("101");
                    }else{
                        ss.username = reg.name;
                        ss.login = 1;
                        res.send("100");
                    }
                }else {
                    res.send("111");
                }
            }
        });
    });

    app.post('/logout',function(req,res){
        var ss = req.session;
        if(ss.login){
            req.session.destroy(function(err){
                if(err){
                    res.send("111");
                }else{
                   res.send("100");
                }
            });
        }
    });

    app.post("/check/manager",function(req,res){
        var num = req.body.num;
        var checked = req.body.checked;
        var auth = "user";
        if(checked=="true"){
            auth = "manager";
        }
        
        Register.findOneAndUpdate({num:num},{$set:{auth:auth}},function(err,result){
            if(!result){
                res.send("111");
            }
        });
    })

    app.get('/delete',function(req,res){
       common.deleteData(Register,{num:req.query.num},res,function(err,removed){
           res.redirect('/list?auth=admin');
       }); 
    });

    app.post('/delete',function(req,res){
        common.deleteData(Register,{num:req.body.num,name:req.body.name,passwd:req.body.pwd},res); 
    });

    app.post('/save',function(req,res){
        common.count(Register,function(count){
            if(count == MAXCOUNT){
                res.send("111");
                return;
            }
            var reg = new Register();
            reg.name = req.body.name;
            reg.num = req.body.num;
            reg.registerDate = common.today();
            reg.group = req.body.group;
            reg.passwd = req.body.pwd;
            reg.auth = common.AUTH.USER;
            reg.trip = req.body.trip;
    
            common.saveData(Register,reg,res);
        });
    });

 
}