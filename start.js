start();
// setInterval(start, [6000000]);
function start() {
    powerTheBot();
  }
async function powerTheBot(){
    await updateViews()
    await programming();
    // await investing();
    // await dogeCoin();
}

async function updateViews() {
    await require("./bots/views.js")
}
async function investing() {
    await deleteFile();
    await require("./bots/investing.js")
    await sleep(240000)
}
async function programming(){
    await deleteFile();
    await require("./bots/programming.js")
    await sleep(240000)
}
async function dogeCoin(){
    await deleteFile();
    await require("./bots/dogeCoin.js")
    await sleep(240000)
}

async function deleteFile(){
    for(let i = 0; i < 10; i++){
        const fs = require('fs');
        let content = []
        fs.readdirSync('./downloads').forEach(file => { 
        content.push(file);
        }); 
    
        try{
            var sourceUrls = "./downloads/";
            await fs.unlinkSync(sourceUrls + content[0]);
            console.log("deleted")
           }catch(err){
           }
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }