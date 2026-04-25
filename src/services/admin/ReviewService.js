import config from "@/config";

export const fetchReviews = async (status="approved",page = 1, limit = 10) => {
    const res = await fetch(
        `${config.apiBaseUrl}/admin/review/approved?page=${page}&limit=${limit}`,{
            cache: "no-store",
        }
    );
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
};


export const updateReview = async (data) => {
    try {
        const res = await fetch(`${config.apiBaseUrl}/admin/review`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error(`Error fetch data`);
        }

        return await res.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
};
