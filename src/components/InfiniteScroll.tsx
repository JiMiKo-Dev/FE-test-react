import { useEffect, useRef, useState } from 'react';
import NavbarMenu from './NavbarMenu'

function InfinieScroll() {
    const [data, setData] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const fetchData = async () => {
        if (loading || !hasMore) return;

        setLoading(true);

        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=5`);
            const newData: Post[] = await res.json();

            if (newData.length === 0) {
                setHasMore(false)
            } else {
                setData((prevData) => [...prevData, ...newData]);
            }

        } catch (error) {
            console.error('Error fetching products:', error);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [currentPage]);


    const handleObserver = (entities: any) => {
        const botton = entities[0];

        if (botton.isIntersecting && hasMore && !loading) { // enter to viewport ?

            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        const options = { // set value to intersectionObserver
            root: null, // viewport default page
            rootMargin: '0px',
            threshold: 0.1,
        };
        const observer = new IntersectionObserver(handleObserver, options);

        if (loaderRef.current) {
            observer.observe(loaderRef.current) // start check loaderRef
        }

        return () => observer.disconnect(); // clean observer
    }, [loaderRef, hasMore, loading])


    return (
        <>
            <NavbarMenu />
            <div className="container">
                <h3 className="text-center my-4">Infinite Scroll</h3>
                <div className="row">
                    {data.map((item, index) => (
                        <div className="col-12 my-4" key={index}>
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">{item.title}</h5>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">{item.body}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center my-4">
                    {loading && <h4>Loading...</h4>}
                    {!hasMore && <h4>No more data</h4>}
                    <div ref={loaderRef} style={{ height: '50px', backgroundColor: 'transparent' }}></div>
                </div>
            </div>
        </>
    )
}

export default InfinieScroll

interface Post {
    id: number;
    title: string;
    body: string;
}