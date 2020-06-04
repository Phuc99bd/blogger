const viewModel = require("./viewModel");

module.exports.init = async() => {
    let view = await viewModel.findOne();
    if(!view)
        await viewModel.create({views: 0});
}

module.exports.upView = async() => {
    let view = await viewModel.findOne();
    await viewModel.updateOne({"_id": view._id},{$inc: {views: 1}});
}