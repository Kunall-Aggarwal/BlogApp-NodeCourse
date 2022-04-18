const fs = require('fs');

//reading files                                         ASYNCHRONUS PROCESS
fs.readFile('./Docs/blogs1.txt', (err, data) => {
    if(err)
    console.log(err)

    // console.log(data)
    console.log(data.toString())
})


//writing files
fs.writeFile('./Docs/blogs1.txt', 'Hello World', () => {
    console.log('file was written')
})
fs.writeFile('./Docs/blogs2.txt', 'Hello Again', () => {        //If file doesn't exists, a new file is created
    console.log('file was written')
})


//directories
if (!fs.existsSync('./Assets')) {
    fs.mkdir('./Assets', (err) => {
        if (err)
            console.log(err);

        console.log('file created');
    })
}else{
    fs.rmdir('./Assets', (err) => {
        if(err)
        console.log(err);

        console.log('folder deleted');
    })
}


//deleting files
if(fs.existsSync('./Docs/deleteme.txt')){
    fs.unlink('./Docs/deleteme.txt', (err) => {
        if(err)
        console.log(err);

        console.log('file deleted');
    })
}