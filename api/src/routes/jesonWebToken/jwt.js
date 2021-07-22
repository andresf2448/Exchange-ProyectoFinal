const router = require('express').Router();
const jwt = require('jsonwebtoken')
const {Utils, Networks, Keypair } = require('stellar-sdk')

function generateToken(data) {
    return jwt.sign({data: data}, process.env.SECRET_JWT, {expiresIn: '1h'})
}

function validateToken(req, res, next) {
    const token = req.headres['authorization']

    if(!token) res.send('Acces denied')

    jwt.verify(token, process.env.SECRET_JWT, (error, user) => {
        if (error){
            res.send('Acces denied, token expired or incorrect')
        } else {
            next()
        }
    })
}

router.post('/', (req, res) => {
    const data = req.body.transaction

    if(data) {
        
        const token = generateToken(data)
        
        return res.header('authorization', token).json({
            message: 'Authenticated user',
            token: token
        })
    }

    return res.status(400).json({message: 'You should send the transaction'})


})

router.get('/', (req, res) => {
    
    let {webAuthDomain, webDomain, clientAccountID} = req.query
    
    if (webAuthDomain && webDomain && clientAccountID) {

        let serverKeyPair = Keypair.fromSecret("SCMPRKSGUMJQHPZQJK27NWQ5MC7V2I2H35AK5MXTIH2YHX7E5SWMI5O4")
        
        const transaction = Utils.buildChallengeTx(serverKeyPair, clientAccountID, webDomain, 900, Networks.TESTNET, webAuthDomain )
        
        return res.json(transaction)
    }
    return res.status(400).json({message: 'You should send all the required items'})

})


module.exports = router;
