export const fetchData = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        return json;

    } catch (err) {
        console.error('Error fetching users:', err);
        throw err;
    }
};