
const sliceArray = (array1, start, end) => {
    if (array1) {
        if (start < 0 && end > 0) {
            return array1.slice(array1.length + start, array1.length ).concat(array1.slice(0, end+1))
        }
        else if (start >= 0 && start < end) {

            return array1.slice(start, end)
        }
    }

}
export default sliceArray