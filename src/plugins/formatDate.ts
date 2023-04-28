const formatDate = (date:Date):string => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // month is zero-indexed, so add 1 and pad with leading zero if necessary
    const day = ('0' + date.getDate()).slice(-2); // pad day with leading zero if necessary
    const hours = ('0' + date.getHours()).slice(-2); // pad hours with leading zero if necessary
    const minutes = ('0' + date.getMinutes()).slice(-2); // pad minutes with leading zero if necessary
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export default formatDate;