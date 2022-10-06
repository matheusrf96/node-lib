import fs from 'fs';
import chalk from "chalk";

import getFile from "./index.js";
import validatedList from './http-validation.js';

const args = process.argv;

function printList(validate, result, filename = '') {
    if (validate) {
        console.log(chalk.yellow('lista validada: '), chalk.black.bgGreen(filename), validatedList(result));
        return;
    }

    console.log(chalk.yellow('lista de links: '), chalk.black.bgGreen(filename), result);
}

async function processText(args) {
    const path = args[2];
    const validate = args[3] === '--valida';

    console.log(validate, args)

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
        printList(validate, result);
    } else if (fs.lstatSync(path).isDirectory()) {
        const files = await fs.promises.readdir(path);
        files.forEach(async (filename) => {
            const list = await getFile(`${path}/${filename}`);
            printList(validate, list, filename);
        })
    }
}

processText(args)
