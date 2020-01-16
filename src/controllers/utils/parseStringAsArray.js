module.exports = function parseStringAsArray(stringArray){
    return stringArray.split(',').map((element) => element.trim());
}