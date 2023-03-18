
export async function customerNameValidation(checkClientName: string) {
    const nameMatch = checkClientName.match(/^meu nome é\s(.*)/i);
    const clientName = nameMatch ? nameMatch[1].trim() : checkClientName.trim();
    return clientName;
}
