import React from 'react';
import PropTypes from 'prop-types';

Posts.propTypes = {
    posts: PropTypes.array
};

Posts.defaultProps = {
    posts: [],
};

function Posts(props) {
    return (
        <div>
            <ol className="list-group list-group-numbered">
                {
                    props.posts.map((post) => {
                        return (
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{post.title}</div>
                                    {post.body}
                                </div>
                            </li>
                        )
                    })
                }
            </ol>
        </div>
    );
}

export default Posts;