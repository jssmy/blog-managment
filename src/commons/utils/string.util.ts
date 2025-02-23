export const generateSlug = (value: string) => {

    if (!value) return '';
    const ramStrim = generateRandomString(8);
    return value.toLowerCase()
        .trim()
        .normalize("NFD") // Elimina acentos
        .replace(/[\u0300-\u036f]/g, "") // Remueve diacríticos
        .replace(/[^a-z0-9\s-]/g, "") // Elimina caracteres no alfanuméricos excepto espacios y guiones
        .replace(/\s+/g, "-") // Reemplaza espacios con guiones
        .replace(/-+/g, "-") // Reemplaza múltiples guiones por uno solo
        + '-' +ramStrim;
}

export function generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}