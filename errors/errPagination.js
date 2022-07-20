const errorPagination = new Error('You exceeded the last page')
errorPagination.status = 400

export default errorPagination