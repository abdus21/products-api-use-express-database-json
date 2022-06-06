
 // auth middleware
 const authCheck = (req,res,next) =>{
     console.log('user is oky');
     next()
 }


 module.exports = {
    authCheck,
 }