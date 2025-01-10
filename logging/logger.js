import fs from 'fs';

const logger = (req,res,next) => {
    const message = `${new Date.now().toISOString()} => ${req.headers['user-agent']}\n`
    
    fs.appendFile('log.txt', message, err => {
        if (err) {
            console.error(err);
        } else {
            console.log(`wrote log successfuly`);
        }
        next();
    })
}

export default logger;