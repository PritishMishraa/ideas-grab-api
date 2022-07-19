export default function MetaData(ideas, page, limit, totalCount) {
    const currentPage = parseInt(page)

    const totalPage = Math.ceil(totalCount / limit)

    let lastItemIndex
    if (totalCount > (currentPage * limit)) {
        lastItemIndex = (currentPage * limit);
    } else {
        lastItemIndex = totalCount;
    }

    return { count: ideas.length, currentPage, totalPage, totalCount, lastItemIndex }
}