function extractLinks(linksList) {
    return linksList.map((objectLink) => Object.values(objectLink).join());
}

export default function validatedList(linksList) {
    return extractLinks(linksList);
}
