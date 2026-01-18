export const getDefaultExpiry = () => {
    const date = new Date();

    // 1. Add 1 hour (60 minutes * 60 seconds * 1000 milliseconds)
    date.setHours(date.getHours() + 1);

    // 2. Format as YYYY-MM-DDTHH:mm (Required for datetime-local)
    // We adjust for timezone offset to keep it in the user's local time
    const tzOffset = date.getTimezoneOffset() * 60000;
    const localISODate = new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);

    return localISODate;
}

export const formatDateForInput = (date: Date) => {
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
};
