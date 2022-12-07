var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey : process.env.IKPBK,
    privateKey : process.env.IKPVK,
    urlEndpoint : process.env.IKENDPOINT
}); 

const handler = async (req, res) => {    
    var result = imagekit.getAuthenticationParameters(); 
    console.log("result", result) 
    res.status(200).json(result)
}

export default handler
