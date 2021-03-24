import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import {urlencoded, json} from 'body-parser';
import methodOverride from 'method-override';

export function express_config() { 
    var app = express(); 
    if(process.env.NODE_ENV === 'development') { 
        app.use(morgan('dev')); 
    } else if (process.env.NODE_ENV === 'production') { 
        app.use(compression()); 
    } 
    
    app.use(urlencoded({ extended : true })); 
    app.use(json()); 
    app.use(methodOverride()); 
    return app; 
}
