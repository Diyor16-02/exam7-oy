

function FormatDate(input:string) {
    return input?.replace(/(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}).*/,"$1 | $2");
}
export default FormatDate