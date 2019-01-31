var AUTH = {USER:"user",MANAGER:"manager",ADMIN:"admin"};

exports.AUTH = AUTH;

exports.today = function() {
        var d = new Date();
        var result = [];
        var today = [];
        today.push(d.getFullYear());
        today.push(d.getMonth() + 1);
        today.push(d.getDate());
        result[result.length] = today.join("-");
        var time = [];
        time.push(d.getHours());
        time.push(d.getMinutes());
        result[result.length] = time.join(":");
        return result.join(" ");
    }

exports.deleteData = function(schema,condition,res,handler){
    
    schema.remove(condition,function(err,removed){
        if(handler){
            handler(err,removed);
        }else{
            if (err){
                return res.status(500).json({
                   error: err
               });
            }else if(removed.result.n == 0){
                res.send("010");
            }else{
                res.send("100");
            }
        }
    });
}

exports.saveData = function(schema,newData,res){
    schema.findOne({
        num: newData.num
    }, function (err, findData) {
        if (err){
            return res.status(500).json({
                error: err
            });
        } else if(!findData) {
            newData.save(function (err) {
                if (err) {
                    console.error(err);
                    res.json({
                        result: 0
                    });
                    return;
                }
                res.send("100");
            });
        } else {
            res.send("010");
        }
    });
}

exports.listData = function(schema,condition,res,handler){
    schema.find(condition, function (err, findData) {
        if (err){
            return res.status(500).send({
                error: 'database failure'
            });
        } else if(findData){
            handler(findData);
        }
    })
}

exports.count = function(schema,callback){
    schema.count({},function(err,count){
        callback(count);    
    });
    
}