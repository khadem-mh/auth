export default function checkStringLength(str, min, max) {

    if (
        typeof str === "string"
        && str.trim().length >= min
        && str.trim().length <= max
    ) {
        return true
    }

    return false

}