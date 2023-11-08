const response = (res,status,jsonData) => {
    return res.status(status).json(jsonData);
}

export default response;