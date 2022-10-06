import fs from 'fs';
import chalk from "chalk";

import getFile from "./index.js";

const args = process.argv;

function printList(result, filename = '') {
    console.log(chalk.yellow('lista de links: '), chalk.black.bgGreen(filename), result);
}

async function processText(args) {
    const path = args[2];

    try {
        fs.lstatSync(path);
    } catch(err) {
        if (err.code === 'ENOENT') {
            console.log(chalk.red('arquivo ou diretório não existe'));
            return;
        }
    }

    if (fs.lstatSync(path).isFile()) {
        const result = await getFile(path);
        printList(result);
    } else if (fs.lstatSync(path).isDirectory()) {
        const files = await fs.promises.readdir(path);
        files.forEach(async (filename) => {
            const list = await getFile(`${path}/${filename}`);
            printList(list, filename);
        })
    }
}

processText(args)
