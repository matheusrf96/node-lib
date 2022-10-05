import fs from 'fs';
import chalk from 'chalk';

function handlerError(err) {
    throw new Error(chalk.red(err.code, 'Não há arquivo no diretório'));
}

function getFile(filePath) {
    const encoding = 'utf-8';
    fs.readFile(filePath, encoding, (err, text) => {
        if (err) {
            handlerError(err)
        }

        console.log(chalk.green(text));
    });
}

getFile('./arquivos/texto.md');