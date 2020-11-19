var express = require('express');
const apiRouter = express.Router();
var allDevises =[];
allDevises.push({ code : "EUR", nom : "euro", change: 1.0});
allDevises.push({ code : "USD", nom : "dollar", change: 1.1});

function findDevisesWithChangeMini(AllDevises, changeMini) {
    selectedDevises=[];
    for(d in AllDevises) {
        
        if(changeMini >= AllDevises[d].change) {
            selectedDevises.push(AllDevises[d]);
        }

    }
    return selectedDevises;
}

function findDeviseByCode(AllDevises, code) {
    for (d in AllDevises) {
        if (code.match(AllDevises[d].code)) {
            return AllDevises[d];
        }
    }
}

apiRouter.route('/devise-api/public/devise')
.get( function(request,response, next){
    var changeMini = request.query.changeMini;
    if(changeMini){
        response.send(findDevisesWithChangeMini(allDevises,changeMini));
    }else{
        response.send(allDevises);
    }
});


apiRouter.route('/devise-api/public/devise/:code')
.get( function(request,response, next){
    let code = request.params.code;
    if(code != null) {
        for (devise in allDevises) {
            if( code.match(allDevises[devise].code) ){
                response.send(allDevises[devise]);
            }
        }
    } else {
        response.send(allDevises);
    }
});

apiRouter.route('/devise-api/private/role-admin/devise')
.post(function(request, response, next){
    var nouvelleDevise = request.body;
    console.log("POST, nouvelleDevise="
        +JSON.stringify(nouvelleDevise)
    );
    response.send(nouvelleDevise);
});

apiRouter.route('/devise-api/private/role-admin/devise/:code')
.delete( function(request,response, next){
    let code = request.params.code;
    if(code != null) {
        for (devise in allDevises) {
            if( code.match(allDevises[devise].code) ){
                response.send(allDevises.splice(devise,1));
            }
        }
    } else {
        response.send(allDevises);
    }
});

apiRouter.route('/devise-api/private/role-admin/devise')
.put( function(request, response, next){
    var updateDeviseAttempt = request.body;
    console.log("PUT, updateDeviseAttempt=" + JSON.stringify(updateDeviseAttempt));
    var deviseToUpdate = findDeviseByCode(allDevises, updateDeviseAttempt.code);

    if(deviseToUpdate != null) {
        deviseToUpdate.nom = updateDeviseAttempt.nom;
        deviseToUpdate.change = updateDeviseAttempt.change;
        response.send(deviseToUpdate);
    }else {
        response.status(404).json({error : 'Operation failure  for currency code number: ' + updateDeviseAttempt.code });
    }
});


exports.apiRouter = apiRouter;