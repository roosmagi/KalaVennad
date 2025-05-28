const Fish = require("../models/fish")

class fishController {
    async getOneFish(req, res) {
        const fishId = req.params.fishId
        const fish = await Fish.findOne({
            where: { id: fishId }, 
    });
        res.status(200).json({
            message: 'Got fish by id',
            fish: fish
    });
}
    async getAllFishes(req, res) {
        const fishes = await Fish.findAll()
        console.log(fishes)
        res.status(201).json({
        fishes: fishes
    })
}
    async addFish(req,res) {
        const fish = await Fish.create({
        name: req.body.name,
        description: req.body.description,
        place: req.body.place,
        c_time: req.body.c_time,
        image: req.body.filename,
        user_Id: req.user.id
    })
    res.status(201).json({
        message: 'Fish is added',
        productId: fish.id
    })
}
}
module.exports = new fishController()