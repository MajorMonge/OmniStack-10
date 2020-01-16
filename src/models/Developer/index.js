const mongoose = require('mongoose');
const LocationSchema = require('./utils/location')
const DevelopersSchema = new mongoose.Schema({
    name: String,
    githubUsername: String,
    bio: String,
    avatarUrl: String,
    technologies: [String],
    location: {
        type: LocationSchema,
        index: '2dsphere'
    }
})

module.exports = mongoose.model('Developers', DevelopersSchema);  