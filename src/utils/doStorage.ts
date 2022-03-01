export function getAllFunds() {
    let funds: string | null = localStorage.getItem('funds');
    if (funds) {
        // let arr = [];
        // for (let i in JSON.parse(funds)) {
        //     arr.push(i);
        // }
        // console.log(arr);
        return JSON.parse(funds);
    }
    return []
}

export function setAllFunds(value: any) {
    localStorage.setItem('funds', JSON.stringify(value));
}
