export function objectFromEntries(objectEntries = []) {
    return objectEntries.reduce(
        (acc, [key, value]) => ({
            ...acc,
            [key]: value
        }),
        {}
    );
}
