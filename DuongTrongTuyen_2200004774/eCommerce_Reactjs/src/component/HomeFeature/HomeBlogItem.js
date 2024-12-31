import React from 'react';
import { Link } from 'react-router-dom';

function HomeBlogItem(props) {
    // Kiểm tra dữ liệu đầu vào để tránh lỗi
    const { data } = props;
    const userData = data?.userData || {};
    const commentData = data?.commentData || [];
    const title = data?.title || "Tiêu đề không xác định";
    const description = data?.description || "Mô tả không có sẵn";
    const image = data?.image || "default_image_url.jpg"; // Thay thế bằng URL ảnh mặc định
    const id = data?.id || "#";

    return (
        <div className="col-lg-4 col-md-6">
            <div className="single-blog">
                <div className="thumb">
                    <img
                        style={{ width: '350px', height: '243px', objectFit: 'cover', cursor: 'pointer' }}
                        className="img-fluid"
                        src={image}
                        alt="Blog Thumbnail"
                    />
                </div>
                <div className="short_details">
                    <div className="meta-top d-flex">
                        <a>
                            {userData.firstName && userData.lastName
                                ? `${userData.firstName} ${userData.lastName}`
                                : "Người dùng không xác định"}
                        </a>
                        <a>
                            <i className="ti-comments-smiley" /> {commentData.length} Bình luận
                        </a>
                    </div>
                    <Link className="d-block" to={`/blog-detail/${id}`}>
                        <h4>{title}</h4>
                    </Link>
                    <div className="text-wrap">
                        <p>{description}</p>
                    </div>
                    <a className="blog_btn">
                        Xem thêm<span className="ml-2 ti-arrow-right" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default HomeBlogItem;
