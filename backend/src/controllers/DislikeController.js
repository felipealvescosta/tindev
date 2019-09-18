const Dev = require('../models/Dev');

module.exports = {
    async store(req, res){
        //console.log(req.params.devId);
        //console.log(req.headers.user);

        const { devId } = req.params;
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev){
            return res.status(400).json({erro:'dev não existe' });
        }

        loggedDev.dislikes.push(targetDev._id);

        console.log("Deu Dislile");

        await loggedDev.save();

        return res.json(loggedDev);
    }
};