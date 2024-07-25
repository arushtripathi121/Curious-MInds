const test = require('../Models/test');

exports.testController = async (req, res) => {
    try{
        const {name, email} = req.body;
        const testUser = test.create({
            name, email
        })
        res.status(200).json({
            success: true,
            data: testUser,
            message: 'test conducted successfully'
        })
    }
    catch(e){
        console.log(e);
        res.json({
            message: 'Something went wrong'
        })
    }
}