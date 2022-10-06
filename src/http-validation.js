function extractLinks(linksList) {
    return linksList.map((objectLink) => Object.values(objectLink).join());
}

async function checkStatus(linksList) {
    const arrStatus = await Promise.all(
        linksList.map(async (url) => {
            const response = await fetch(url);
            return response.status;
        })
    );

    return arrStatus;
}

export default async function validatedList(linksList) {
    const links = extractLinks(linksList);
    const status = await checkStatus(links);

    return status;
}
