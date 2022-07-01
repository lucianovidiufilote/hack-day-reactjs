const functions = {
    getMarksInRange(min, max, step) {
        let array = [];
        for (let i = min; i <= max; i += step) {
            array[i] = i;
        }
        return array;
    }
}

export default functions;



