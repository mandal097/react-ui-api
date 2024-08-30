const User = require('../../../models/User');

const router = require('express').Router();

// getting single user by user id @http://localhost:5000/api/v1/user/:userid
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId }).select('-password');
        res.status(200).json({
            status: 'success',
            data: user
        })
    } catch (error) {
        res.status(500).json({
            status: 'err',
            message: 'Something went wrong'
        })
    }
});

module.exports = router;
