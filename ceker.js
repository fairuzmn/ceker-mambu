const readline = require('readline');
const fs = require('fs');
const fetch = require('node-fetch')

const readInterface = readline.createInterface({
    input: fs.createReadStream('list.txt'),
    console: false
});

readInterface.on('line', function (line) {
    fetch(`http://malenk.io/fhAPI/?format=${line}`).then(response => response.json()).then((result) => {
        if (result.status == "DIE") {
            console.log('\x1b[31m%s\x1b[0m', `[ DIE ] => ${result.card.number}`)
        } else {
            console.log('\x1b[32m%s\x1b[0m', `[ LIVE ] => ${result.card.number}`)
        }
    }).catch((err) => {
        console.log(err)
    });
})