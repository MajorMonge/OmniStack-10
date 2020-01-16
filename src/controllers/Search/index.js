//MODELS
const DeveloperModel = require("../../models/Developer");

//UTILS
const parseStringAsArray = require("../utils/parseStringAsArray")

module.exports = {
    async index(request, response){
        const { technologies, latitude, longitude } = request.query;

        const technologiesArray = parseStringAsArray(technologies);

        const developers = await DeveloperModel.find({
            technologies: {
                $in: technologiesArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        })

        return response.json({ developers })
    }
}