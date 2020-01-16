//IMPORTS
const axios = require("axios");

//MODELS
const DeveloperModel = require("../../models/Developer");

//UTILS
const parseStringAsArray = require("../utils/parseStringAsArray")

module.exports = {
    async store(request, response) {

        const { githubUsername, technologies, latitude, longitude } = request.body;

        let developerCheck = await DeveloperModel.findOne({ githubUsername });

        if (!developerCheck) {

            const infoResponse = await axios.get(`https://api.github.com/users/${githubUsername}`)
            const { name, bio, avatar_url } = infoResponse.data;
            const technologiesArray = parseStringAsArray(technologies);
            const location = {
                type: "Point",
                coordinates: [longitude, latitude]
            }

            developerCheck = await DeveloperModel.create({
                name,
                githubUsername,
                bio,
                avatarUrl: avatar_url,
                technologies: technologiesArray,
                location,
            })
        }
        return response.json(developerCheck);
    },
    async get(request, response) {
        const Developers = await DeveloperModel.find();
        return response.json(Developers)
    },
    async update(request, response) {
        const githubUsername = request.params.githubUsername;
        const { technologies, latitude, longitude } = request.body;
        const technologiesArray = parseStringAsArray(technologies);
        const location = {
            type: "Point",
            coordinates: [longitude, latitude]
        }

        let Developer = await DeveloperModel.findOne({ githubUsername });

        if (Developer != null) {
            const infoResponse = await axios.get(`https://api.github.com/users/${githubUsername}`)
            const { name, bio, avatar_url } = infoResponse.data;
            Developer = await DeveloperModel.updateOne({ githubUsername }, {
                name,
                githubUsername,
                bio,
                avatarUrl: avatar_url,
                technologies: technologiesArray,
                location,
            })
        }

        return response.json(await DeveloperModel.findOne({ githubUsername }))
    },
    async delete(request, response) {
        const githubUsername = request.params.githubUsername;
        
        let Developer = await DeveloperModel.findOne({ githubUsername });

        if (Developer != null) {
            Developer = await DeveloperModel.deleteOne({ githubUsername })
            return response.json({deleteDeveloperStatus: "success", developer: githubUsername})
        }else{
            return response.json({deleteDeveloperStatus: "not found", developer: githubUsername})
        }

    }
}