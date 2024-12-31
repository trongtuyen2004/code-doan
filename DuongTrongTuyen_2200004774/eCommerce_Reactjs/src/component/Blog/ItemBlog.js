import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

function ItemBlog(props) {
    const { data } = props;

    return (
        <article className="blog_item">
            <div className="blog_item_img">
                <img 
                    style={{ height: '514px', objectFit: 'cover' }} 
                    className="card-img rounded-0" 
                    src={data?.image || ''} 
                    alt="Blog Thumbnail" 
                />
                <a href="#" onClick={(e) => e.preventDefault()} className="blog_item_date">
                    <h3>{moment(data?.createdAt).format("DD")}</h3>
                    <p>{moment(data?.createdAt).format("MMM")}</p>
                </a>
            </div>
            <div className="blog_details">
                <Link 
                    style={{ color: '#797979', fontSize: '18px' }} 
                    className="d-inline-block" 
                    to={`/blog-detail/${data?.id}`}
                >
                    <h2>{data?.title}</h2>
                </Link>
                <p>{data?.shortdescription}</p>
                <ul className="blog-info-link">
                    <li><i className="ti-user" /> {data?.userData?.firstName} {data?.userData?.lastName}</li>
                    <li><i className="ti-comments" /> {data?.commentData?.length || 0} Bình luận</li>
                </ul>
            </div>
        </article>
    );
}

export default ItemBlog;
