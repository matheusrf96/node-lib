import chalk from "chalk";

function handleErrors(err) {
    if (err.cause.code === 'ENOTFOUND') {
        return 'link não encontrado';
    }

    return 'ocorreu algum erro';
}

function extractLinks(linksList) {
    return linksList.map((objectLink) => Object.values(objectLink).join());
}

async function checkStatus(linksList) {
    const arrStatus = await Promise.all(
        linksList.map(async (url) => {
            try {
                const response = await fetch(url);
                return response.status;
            } catch(err) {
                return handleErrors(err);
            }
        })
    );

    return arrStatus;
}

export default async function validatedList(linksList) {
    const links = extractLinks(linksList);
    const status = await checkStatus(links);

    return linksList.map((link, index) => ({
        ...link,
        status: status[index],
    }));
}
