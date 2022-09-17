const menuModel = require("../Schemas/checkList");
module.exports = function(app) {

    app.get('/:coffee', (req, res) => {
        menuModel.findById(req.params.coffee, async (item, err) => {
            if (err) {
                res.json(err)
            }
            else {
                res.json(item)
            }
        });
    });

}