type CustomPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const CustomPagination = ({ currentPage, totalPages, onPageChange }: CustomPaginationProps) => {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

  const pageRangeSize = 10;
  let startPage = Math.max(1, currentPage - Math.floor(pageRangeSize / 2));
  let endPage = startPage + pageRangeSize - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - pageRangeSize + 1);
  }
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const baseButtonClasses = "cursor-pointer px-3 py-2 border text-sm bg-white text-gray-700 hover:bg-gray-200";

  return (
    <div className="flex justify-center items-center space-x-2 space-y-2 mt-20 flex-wrap select-none">
      <button
        onClick={() => handlePageClick(prevPage)}
        className={`${baseButtonClasses} rounded-l-lg ${currentPage === 1 ? "cursor-not-allowed text-gray-500 bg-gray-100 hover:bg-gray-100" : ""}`}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {startPage > 1 && (
        <button onClick={() => handlePageClick(1)} className="cursor-pointer px-3 py-2 bg-white text-gray-700">
          1
        </button>
      )}
      {startPage > 2 && <span className="px-3 py-2 text-gray-700">...</span>}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`cursor-pointer px-3 py-2 rounded border text-sm ${
            page === currentPage ? "bg-gray-200 text-black" : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages - 1 && <span className="px-3 py-2 text-gray-700">...</span>}
      {endPage < totalPages && (
        <button onClick={() => handlePageClick(totalPages)} className="px-3 py-2 bg-white text-gray-700">
          {totalPages}
        </button>
      )}

      <button
        onClick={() => handlePageClick(nextPage)}
        className={`${baseButtonClasses} mb-2 rounded-r-lg ${
          currentPage === totalPages ? "cursor-not-allowed text-gray-500 bg-gray-100 hover:bg-gray-100" : ""
        }`}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default CustomPagination;
