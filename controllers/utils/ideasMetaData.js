export default function MetaData(page, limit, totalCount) {
    const currentPage = parseInt(page)

    const totalPage = Math.ceil(totalCount / limit)

    let lastItemIndex
    if (totalCount > (currentPage * limit)) {
        lastItemIndex = (currentPage * limit);
    } else {
        lastItemIndex = totalCount;
    }

    return { currentPage, totalPage, lastItemIndex }
}