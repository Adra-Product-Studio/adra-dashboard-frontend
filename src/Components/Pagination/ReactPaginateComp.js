import React from 'react'
import ReactPaginate from 'react-paginate'

const ReactPaginateComp = ({
  onPageChange,
  pageCount,
  currentPage = 0
}) => {

  return (
    <ReactPaginate 
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={'...'}
      pageCount={Math.ceil(pageCount / 10)}
      forcePage={currentPage-1 || 0}
      pageRangeDisplayed={1}
      marginPagesDisplayed={2}
      onPageChange={onPageChange}
      containerClassName={"pagination justify-content-end"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
    />
  )
}

export default ReactPaginateComp