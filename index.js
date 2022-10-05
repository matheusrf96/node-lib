import fs from 'fs';
import chalk from 'chalk';

function handleError(err) {
    throw new Error(chalk.red(err.code, 'Não há arquivo no diretório'));
}

function getFile(filePath) {
    const encoding = 'utf-8';

    fs.promises.readFile(filePath, encoding)
        .then((text) => console.log(chalk.green(text)))
        .catch((err) => handleError(err))
}

getFile('./arquivos/texto.md');