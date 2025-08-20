export const convertUtcToDaysAgo = (utcTimestamp) => {
    const currentDate = new Date(); 
    const utcDate = new Date(utcTimestamp); 

    const diffInMillis = currentDate - utcDate;

    const daysDifference = diffInMillis / (1000 * 60 * 60 * 24);

    if (daysDifference < 1) {
        const hoursDifference = diffInMillis / (1000 * 60 * 60); // Convert to hours
        if (hoursDifference < 1) {
            const minsDifference = diffInMillis / (1000 * 60); // Convert to minutes
            return Math.floor(minsDifference) + " minutes ago"; // the number of minutes 
        }
        return Math.floor(hoursDifference) + " hours ago"; // number of hours 
    }

    return Math.floor(daysDifference) === 1 ? Math.floor(daysDifference) + " day ago" : Math.floor(daysDifference) + " days ago";
}

export const convertNumberToK = (num) => {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(0) + "B"; 
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(0) + "M"; 
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + "K";
    }
    return num?.toString();
}