function IsoStringDateConverter(isoString) {
    // Create a Date object
    const date = new Date(isoString);

    // Format date and time parts
    const datePart = date.toISOString().split('T')[0];
    const timePart = date.toISOString().split('T')[1].replace('Z', '');

    return { date: datePart, time: timePart };
}

export default IsoStringDateConverter;