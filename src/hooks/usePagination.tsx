import { useEffect, useState } from "react"

// Custom hook สำหรับการจัดการ pagination
const usePagination = (url: string, limitItems: number) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const res = await fetch(`${url}?_page=${currentPage}&_limit=${limitItems}`);
                const data = await res.json();

                const totalItems = 20;
                const totalPages = Math.ceil(totalItems / limitItems);

                setData(data);
                setTotalPages(totalPages);

            } catch (error) {
                console.error("Error fetching data:", error);
            }

            setLoading(false);
        };

        fetchData();
    }, [url, currentPage, limitItems]);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return { data, loading, currentPage, totalPages, goToPage };
};



export default usePagination