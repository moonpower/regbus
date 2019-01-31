
module.exports = function(app,Register){
    var common = require("./common.js");
    var MAXCOUNT = 44;
    app.get('/',function(req,res){
        common.count(Register,function(count){
            res.render('index',{
                title:"버스 탑승 등록",
                count: count
            });
        })
        
    });

    app.get('/list',function(req,res){
        var auth = "user";
        if(req.query.auth){
            auth = "admin";
        }
        common.listData(Register,{},res,function(datas){
            res.render('list', {
                registers: datas,
                auth:auth,
                title:"등록자 리스트"
            });
        })
    });

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
    
            common.saveData(Register,reg,res);
        });
    });

 
}