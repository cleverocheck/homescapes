const fs = require('fs')
const { exec } = require('child_process')

const images_path = `${process.cwd()}/public`
const media_data_path = `${process.cwd()}/src/configs/media_data.json`

const main_void = async () => {
    const json_data = fs.readFileSync(media_data_path, { encoding: 'utf-8' })
    let new_json_data = {}
    for (let image_key in JSON.parse(json_data)) {
        const image_path = `${images_path}/${JSON.parse(json_data)[image_key]}`
        new_json_data[image_key] = `data:image/png;base64,${fs.readFileSync(image_path, { encoding: 'base64' })}`
    }
    fs.writeFileSync(media_data_path, JSON.stringify(new_json_data))

    exec('yarn react-build', (error, stdout, stderr) => {
        fs.writeFileSync(media_data_path, json_data)
        // + connect scripts by hand
    })
}

main_void()