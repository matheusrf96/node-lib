import fs from 'fs';
import chalk from "chalk";

import getFile from "./index.js";

const args = process.argv;

function printList(result) {
    console.log(chalk.yellow('lista de links: '), result);
}

async function processText(args) {
    const path = args[2];

    if (fs.lstatSync(path).isFile()) {
        const result = await getFile(path);
        printList(result);
    } else if (fs.lstatSync(path).isDirectory()) {
        const files = await fs.promises.readdir(path);
        files.forEach(async (filepath) => {
            const list = await getFile(`${path}/${filepath}`);
            printList(list);
        })
    }
}

processText(args)
