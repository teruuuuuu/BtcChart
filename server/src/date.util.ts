

const SEC_MS = 1000;
const MIN_MS = SEC_MS * 60;


export function currentDateTime() {
    return new Date();
}

export function minutesAGo(min: number): Date {
    return new Date(new Date().getTime() - min * MIN_MS);
}