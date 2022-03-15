import React, { useEffect, useState } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

function Paginator({ pageParams, setPageParams, totalPages }) {
  const [n, setN] = useState(0);
  const [active, setActive] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPageParams({ ...pageParams, page: page - 1 });
  }, [page]);

  const handleClick = (i) => {
    setActive(i);
    setPage(i + n);
  };

  function handleFirst() {
    setN(0);
    setActive(1);
    setPage(1);
  }

  function handlePrevious() {
    if (n > 0) setN(n - 1);
    if (n === 0 && active > 1) setActive(active - 1);
    setPage(active + n === 1 ? 1 : active + n - 1);
  }

  function handleNext() {
    if (n < totalPages - 5) setN(n + 1);
    if (n >= totalPages - 5 && active < 5) setActive(active + 1);
    setPage(active + n === totalPages ? totalPages : active + n + 1);
  }

  function handleLast() {
    setN(totalPages - 5);
    setActive(5);
    setPage(totalPages);
  }

  return (
    <Pagination aria-label="Page navigation example">
      {totalPages > 5 && (
        <>
          <PaginationItem>
            <PaginationLink onClick={handleFirst} first href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={handlePrevious} href="#" previous />
          </PaginationItem>
        </>
      )}

      {totalPages >= 2 && (
        <>
          <PaginationItem active={active === 1}>
            <PaginationLink onClick={() => handleClick(1)} href="#">
              {n + 1}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem active={active === 2}>
            <PaginationLink onClick={() => handleClick(2)} href="#">
              {n + 2}
            </PaginationLink>
          </PaginationItem>
        </>
      )}

      {totalPages >= 3 && (
        <>
          <PaginationItem active={active === 3}>
            <PaginationLink onClick={() => handleClick(3)} href="#">
              {n + 3}
            </PaginationLink>
          </PaginationItem>
        </>
      )}

      {totalPages >= 4 && (
        <>
          <PaginationItem active={active === 4}>
            <PaginationLink onClick={() => handleClick(4)} href="#">
              {n + 4}
            </PaginationLink>
          </PaginationItem>
        </>
      )}

      {totalPages >= 5 && (
        <>
          <PaginationItem active={active === 5}>
            <PaginationLink onClick={() => handleClick(5)} href="#">
              {n + 5}
            </PaginationLink>
          </PaginationItem>
        </>
      )}

      {totalPages > 5 && (
        <>
          <PaginationItem>
            <PaginationLink onClick={handleNext} href="#" next />
          </PaginationItem>
          <PaginationItem active={active === 1001}>
            <PaginationLink onClick={handleLast} href="#" last />
          </PaginationItem>
        </>
      )}
    </Pagination>
  );
}

export default Paginator;
