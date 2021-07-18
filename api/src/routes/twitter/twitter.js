const http = require('http');
const router = require('express').Router()
const server = http.createServer(router);

const socketIo = require('socket.io')   
const io = socketIo(server);

const needle = require('needle');
const TOKEN = process.env.TWITTER_BEARER_TOKEN;

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next(); 
});

router.get('/', async (req, res) => {
    res.send({ response: "Server is up and running" }).status(200);    
});
    
const rulesURL = 'https://api.twitter.com/2/tweets/search/stream/rules';
const streamURL = 'https://api.twitter.com/2/tweets/search/stream?tweet.fields=public_metrics&expansions=author_id';

const rules = [{
    value: 'Bitcoin lang:en sample:2'
}];
//is:verified 

    // Get Stream rules
    async function getRules(){
        const response = await needle('get', rulesURL, {
            headers:{
                Authorization: `Bearer ${TOKEN}`
            }
        });
        console.log(response.body);
        return response.body
    };

    // Set stream rules (sendind and deleting rules its gonna be a post request)
    async function setRules(){
        const data = {
            add: rules
        }
        const response = await needle('post', rulesURL, data, {
            headers:{
                'content-type': 'application/json',
                Authorization: `Bearer ${TOKEN}`
            }
        });
        return response.body
    };

    // Delete stream Rules (Because if i change the rules values i have to delete it)
    async function deleteRules(rules) {
        if(!Array.isArray(rules.data)){
            return null;
        }
        const ids = rules.data.map(rule => rule.id);
        const data = {
            delete: {
                ids: ids
            }
        }
        const response = await needle('post', rulesURL, data, {
            headers:{
                'content-type': 'application/json',
                Authorization: `Bearer ${TOKEN}`
            }
        });
        return response.body
    };

    function streamTweets(socket) {
        const stream = needle.get(streamURL, {
            headers:{
                Authorization: `Bearer ${TOKEN}`
            }
        })
        stream.on('data', (data) => {
            try {
                const json = JSON.parse(data);
                // console.log(json);  
                socket.emit('tweet', json)  
            } 
            // This is empty because this allow the conection open even is there no tweets
            catch (error) {}
        })
    };

   
    // Run when the client connects..
    // The first arg is the event, and the callback which will be executed after every connection event.
    io.on('connection', async () => {
        console.log('Client connected..');
        let currentRules;
        try {
            // Get all stream rules
            currentRules = await getRules();
            // Delete all stream rules
            await deleteRules(currentRules);
            // Set rules based on array above
            await setRules();
        } 
        catch (error) {
        console.log(error)
        process.exit(1) 
        }
        streamTweets(io);
    })


server.listen(3005, ()=>{
    console.log('Listening on 3005 (twitter stream route)');
});

module.exports = router;