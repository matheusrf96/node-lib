import fs from 'fs';
import chalk from 'chalk';

function extractLinks(text) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const captures = [...text.matchAll(regex)];
    const results = captures.map(capture => ({[capture[1]]: capture[2]}));

    return results;
}

function handleError(err) {
    throw new Error(chalk.red(err.code, 'Não há arquivo no diretório'));
}

async function getFile(filePath) {
    const encoding = 'utf-8';

    try {
        const text = await fs.promises.readFile(filePath, encoding)
        console.log(extractLinks(text));
    } catch (err) {
        handleError(err);
    }
}

getFile('./arquivos/texto.md');