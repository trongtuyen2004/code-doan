import React, { useEffect, useState } from 'react';
import ItemBlog from '../../component/Blog/ItemBlog';
import ReactPaginate from 'react-paginate';
import RightBlog from '../../component/Blog/RightBlog';
import { PAGINATION } from '../../utils/constant';
import { getAllBlog, getAllCategoryBlogService, getFeatureBlog } from '../../services/userService';
import { Link } from 'react-router-dom';

function BlogPage(props) {
  const [dataBlog, setDataBlog] = useState([]);
  const [dataFeatureBlog, setDataFeatureBlog] = useState([]);
  const [dataSubject, setDataSubject] = useState([]);
  const [count, setCount] = useState(1);
  const [numberPage, setNumberPage] = useState(0);
  const [subjectId, setSubjectId] = useState('');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        await loadCategoryBlog();
        await fetchData('', keyword);
        await loadFeatureBlog();
        window.scrollTo(0, 0);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataAsync();
  }, []);

  const fetchData = async (code, keyword) => {
    try {
      const arrData = await getAllBlog({
        subjectId: code,
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        keyword: keyword
      });
      if (arrData && arrData.errCode === 0) {
        setDataBlog(arrData.data);
        setCount(Math.ceil((arrData.count || 1) / PAGINATION.pagerow));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const loadFeatureBlog = async () => {
    try {
      const res = await getFeatureBlog(6);
      if (res && res.errCode === 0) {
        setDataFeatureBlog(res.data);
      }
    } catch (error) {
      console.error("Error loading feature blog:", error);
    }
  };

  const loadCategoryBlog = async () => {
    try {
      const res = await getAllCategoryBlogService('SUBJECT');
      if (res && res.errCode === 0) {
        setDataSubject(res.data);
      }
    } catch (error) {
      console.error("Error loading category blog:", error);
    }
  };

  const handleChangePage = async (number) => {
    setNumberPage(number.selected);
    await fetchData(subjectId, keyword);
  };

  const handleClickCategory = async (code) => {
    setSubjectId(code);
    await fetchData(code, '');
  };

  const handleSearchBlog = async (text) => {
    await fetchData('', text);
    setKeyword(text);
  };

  const handleOnChangeSearch = async (input) => {
    if (input === '') {
      await fetchData('', input);
      setKeyword(input);
    }
  };

  return (
    <>
      <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
          <div className="container">
            <div className="banner_content d-md-flex justify-content-between align-items-center">
              <div className="mb-3 mb-md-0">
                <h2>Tin tức</h2>
                <p>Hãy theo dõi những bài viết để nhận được thông tin mới nhất</p>
              </div>
              <div className="page_link">
                <Link to={"/"}>Trang chủ</Link>
                <Link to={"/blog"}>Tin tức</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog_area section_gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mb-5 mb-lg-0">
              <div className="blog_left_sidebar">
                {dataBlog && dataBlog.length > 0 &&
                  dataBlog.map((item, index) => (
                    <ItemBlog key={index} data={item} />
                  ))
                }
              </div>

              <ReactPaginate
                previousLabel={'Quay lại'}
                nextLabel={'Tiếp'}
                breakLabel={'...'}
                pageCount={count || 1}
                marginPagesDisplayed={3}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakLinkClassName={"page-link"}
                breakClassName={"page-item"}
                activeClassName={"active"}
                onPageChange={handleChangePage}
              />
            </div>

            <RightBlog
              handleOnchangeSearch={handleOnChangeSearch}
              handleSearchBlog={handleSearchBlog}
              dataFeatureBlog={dataFeatureBlog || []}
              isPage={true}
              handleClickCategory={handleClickCategory}
              data={dataSubject || []}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogPage;
