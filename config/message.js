const message = {
    successReq: (message) => `your request was successful !!. ${message || ''}`,
    userDataExist: (data = null) => `${data ?? 'user'} exist`,
    notFound : (data) => `${data} data not found`,
    dataUpdated : (data) => `${data} data updated successfully`
}

export default message;