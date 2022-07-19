export default function MetaData(page, limit, matchedIdeas, totalCount, searchText) {
    const currentPage = parseInt(page)

    const totalPage = Math.ceil(totalCount / limit)

    let lastItemIndex
    if (totalCount > (currentPage * limit)) {
        lastItemIndex = (currentPage * limit);
    } else {
        lastItemIndex = totalCount;
    };

    return { matchedIdeas: matchedIdeas.length, totalCount, currentPage, totalPage, lastItemIndex, searchText }
}