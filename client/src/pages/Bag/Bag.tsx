import { useLoginContext } from "../../context/LoginContext";
import { useThemeContext } from "../../context/ThemeContext";
import "./Bag.css";
import emptyBag from "../../assets/empty-bag.png";
import BagDetails from "../../components/BagDetails/BagDetails";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import usePagination from "../../hooks/usePagination";
import { useEffect } from "react";

const Bag = () => {
  const { getThemeClassName } = useThemeContext();
  const { currentUser } = useLoginContext();
  const { currentItems, currentPage, itemsPerPage, paginate, setCurrentPage } =
    usePagination(currentUser?.bag || []);
  const navigate = useNavigate();

  const goToPurchaseHistory = () => {
    navigate(`/history`);
  };

  useEffect(() => {
    if (currentItems.length === 0) {
      setCurrentPage((prev) => {
        if (prev !== 1) {
          return prev - 1;
        }
        return prev;
      });
    }
  }, [currentItems]);

  return (
    <div className={`Bag Page ${getThemeClassName()}`}>
      <>
        {currentUser && (
          <div className="data-container">
            {currentUser.bag.length === 0 ? (
              <>
                <div
                  className="history-btn-empty"
                  onClick={goToPurchaseHistory}
                >
                  Purchase History
                </div>
                <div className="no-items">
                  <h3 id="empty">Your bag is empty</h3>
                  <img src={emptyBag} alt="empty bag" />
                </div>
              </>
            ) : (
              <>
                <div className="history-btn" onClick={goToPurchaseHistory}>
                  Purchase History
                </div>
                <h3 id="my-items">My Items</h3>
                <BagDetails
                  array={
                    currentUser?.bag.length <= 4
                      ? currentUser?.bag
                      : currentItems
                  }
                  showActions={true}
                />
                <div className="page-number-container">
                  <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={currentUser?.bag.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default Bag;
