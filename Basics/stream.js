const fs = require('fs');

const readstream = fs.createReadStream('./Docs/blogs3.txt')
const writestream = fs.createWriteStream('./Docs/blogs4.txt')

// readstream.on('data', (chunk) => {
//     console.log('\n----NEW CHUNK----\n')
//     console.log(chunk.toString());
//     writestream.write('\nNEW CHUNK\n')
//     writestream.write(chunk)
// })

// PIPING

readstream.pipe(writestream);                   //Same thing as above