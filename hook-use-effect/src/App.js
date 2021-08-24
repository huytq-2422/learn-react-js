import './App.css';
import 'antd/dist/antd.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import Search from "antd/es/input/Search";
import {Image, Pagination} from "antd";

function App() {

    const api = (q, page) => {
        return `https://pixabay.com/api/?key=11705223-2e906401dbe44ed955bacd2ac&q=${q}&image_type=photo&pretty=true&page=${page}`
    }

    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState({
            q: "vietnam",
            page: 1,
            total: 1,
            perPage: 1
        }
    )
    const [images, setImages] = useState([])
    const [resultVisible, setResultVisible] = useState(false)

    useEffect(() => {
        function fetchPosts() {
            const url = "https://jsonplaceholder.typicode.com/posts"
            axios.get(url)
                .catch(error => {
                    console.log(error)
                })
                .then(response => {
                    console.log(response)
                    setPosts(response.data)
                })
        }

        fetchPosts()
        // Only run once, <=> componentDidMount
    }, [])

    function onKeywordChange(q) {
        searchImages(q, 1)
    }

    function onChangePage(page) {
        searchImages(search.q, page)
    }

    function searchImages(q, page) {
        setResultVisible(false)
        axios.get(api(q, page))
            .catch(error => {
                console.log(error)
            })
            .then(response => {
                console.log(response)
                setResultVisible(true)
                setImages(response.data.hits)
                setSearch({
                    q,
                    page: page,
                    perPage: response.data.hits.size,
                    total: response.data.totalHits
                })
            })
    }

    return (
        <div className="container">
            <h2 className="my-5 border-bottom border-dark"> Image List</h2>

            <Search
                placeholder="input search text"
                onSearch={(value, event) => {
                    onKeywordChange(value)
                }}
                enterButton="Search"
            />

            <div className={`${resultVisible ? "visible" : "d-none"}`}>
                <div className="d-flex flex-wrap mt-5">
                    {
                        images.map((value) => {
                            return <div className="mx-2">
                                <Image
                                    width={(value.webformatWidth * 150) / value.webformatHeight}
                                    height={150}
                                    src={value.webformatURL}/>
                            </div>
                        })
                    }
                </div>
                <div className="d-flex justify-content-end mt-5">
                    <Pagination
                        defaultCurrent={search.page}
                        total={search.total}
                        onChange={(page, pageSize) => onChangePage(page)}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
