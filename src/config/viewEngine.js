import express from 'express';

const configViewEngine = (app) => {
    //STATIC FILE 
    app.use(express.static('./src/public'))
    //VIEW ENGINE
    app.set('view engine', 'ejs')
    app.set('views', './src/views')
}
export default configViewEngine;
