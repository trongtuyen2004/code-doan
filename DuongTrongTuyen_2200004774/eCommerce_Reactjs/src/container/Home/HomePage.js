import React, { useState, useEffect } from 'react';
import HomeBanner from "../../component/HomeFeature/HomeBanner";
import MainFeature from "../../component/HomeFeature/MainFeature";
import ProductFeature from "../../component/HomeFeature/ProductFeature";
import NewProductFeature from "../../component/HomeFeature/NewProductFeature";
import HomeBlog from '../../component/HomeFeature/HomeBlog';
import {
    getAllBanner,
    getProductFeatureService,
    getProductNewService,
    getNewBlog,
    getProductRecommendService,
} from '../../services/userService';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomePage(props) {
    const [dataProductFeature, setDataProductFeature] = useState([]);
    const [dataNewProductFeature, setNewProductFeature] = useState([]);
    const [dataNewBlog, setDataNewBlog] = useState([]);
    const [dataBanner, setDataBanner] = useState([]);
    const [dataProductRecommend, setDataProductRecommend] = useState([]);

    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        autoplay: true,
        cssEase: "linear",
    };

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            fetchProductRecommend(userData.id);
        }
        fetchBlogFeature();
        fetchDataBanner();
        fetchProductFeature();
        fetchProductNew();

        window.scrollTo(0, 0);
    }, []);

    const fetchBlogFeature = async () => {
        try {
            let res = await getNewBlog(3);
            if (res && res.errCode === 0) {
                setDataNewBlog(res.data);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    const fetchProductFeature = async () => {
        try {
            let res = await getProductFeatureService(6);
            if (res && res.errCode === 0) {
                setDataProductFeature(res.data);
            }
        } catch (error) {
            console.error("Error fetching product features:", error);
        }
    };

    const fetchProductRecommend = async (userId) => {
        try {
            let res = await getProductRecommendService({
                limit: 20,
                userId: userId,
            });
            if (res && res.errCode === 0) {
                setDataProductRecommend(res.data);
            }
        } catch (error) {
            console.error("Error fetching product recommendations:", error);
        }
    };

    const fetchDataBanner = async () => {
        try {
            let res = await getAllBanner({
                limit: 6,
                offset: 0,
                keyword: '',
            });
            if (res && res.errCode === 0) {
                setDataBanner(res.data);
            }
        } catch (error) {
            console.error("Error fetching banners:", error);
        }
    };

    const fetchProductNew = async () => {
        try {
            let res = await getProductNewService(8);
            if (res && res.errCode === 0) {
                setNewProductFeature(res.data);
            }
        } catch (error) {
            console.error("Error fetching new products:", error);
        }
    };

    return (
        <div>
            <Slider {...settings}>
                {dataBanner && dataBanner.length > 0 &&
                    dataBanner.map((item, index) => (
                        <HomeBanner key={index} image={item.image} name={item.name} />
                    ))}
            </Slider>
            <MainFeature />
            <ProductFeature title="Gợi ý sản phẩm" data={dataProductRecommend} />
            <ProductFeature title="Sản phẩm đặc trưng" data={dataProductFeature} />
            <NewProductFeature
                title="Sản phẩm mới"
                description="Những sản phẩm vừa ra mắt mới lạ cuốn hút người xem"
                data={dataNewProductFeature}
            />
            <HomeBlog data={dataNewBlog} />
        </div>
    );
}

export default HomePage;
