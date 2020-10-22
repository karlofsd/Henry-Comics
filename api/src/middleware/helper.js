//Solo para admin
const isAdmin = (req, res, next) =>{
    console.log(req.user)

    if(req.user && req.user.isAdmin){
       return next();

    }else{
        
        res.status(404).json({message:'No autorizado'});
    }
}

//Para usuarios
const isAuthenticated = (req, res, next) =>{
console.log(req.isAuthenticated())

    if(req.isAuthenticated()){

        return next();

    }else{
        console.log('no es admin')
        res.status(404).json({message:'No autorizado'});
    }
}


module.exports ={

    isAdmin,
    isAuthenticated

}