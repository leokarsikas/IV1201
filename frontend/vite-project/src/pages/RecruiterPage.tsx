import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import ReactPaginate from "react-paginate";
import "../styling/RecruiterPage.css";
import { useAuth } from "../hooks/useAuthLogin";
import { useFetchApplications } from "../hooks/useFetchApplications";

import { ChevronRight } from "lucide-react";
/**
 * @module RecruiterPage
 *
 * This module provides the recruiter dashboard where recruiters can view and manage applications.
 * It handles authentication, pagination, and navigation.
 */
export default function RecruiterPage() {
  const {
    applications,
    isLoading: isFetchingApplications,
  } = useFetchApplications();
  const { role, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  /** 
   * Redirects unauthorized users to the home page.
   * Ensures that only users with the correct role (1) can access the recruiter page.
   * @param {Function} callback - Function executed on component mount and when dependencies change.
   * @param {Array} dependencies - Dependencies that trigger the effect.
   */  
  useEffect(() => {
    if (!isAuthLoading && role !== 1) {
      navigate("/");
    }
  }, [role, isAuthLoading, navigate]);

  if (isAuthLoading || isFetchingApplications) return <p>Loading...</p>;

  /**
   * Computes pagination-related data.
   * Determines the total number of pages and slices the application list for display.
   *
   * @constant {number} pageCount - The total number of pages based on applications per page.
   * @constant {number} offset - The starting index for the current page's applications.
   * @constant {Array} currentItems - The list of applications to display on the current page.
   */  
  const pageCount = Math.ceil(applications.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = applications.slice(offset, offset + itemsPerPage);

  /**
   * Handles page changes for pagination.
   * Updates the current page state based on the selected page.
   *
   * @function handlePageClick
   * @param {Object} param - Object containing the selected page number.
   * @param {number} param.selected - The selected page index.
   */
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const mapperOfStatus = ["Unhandled", "Accepted", "Rejected"];

  /**
   * Navigates to the application details page.
   *
   * @function goToApplication
   */
  const goToApplication = () => {
    navigate("/application_user")
  };

   /**
   * Rendering the `Recruiter Page` 
   */
  return (
    <div className="recruiterPage">
      <Navbar />
      <div>
        <ul style={{ listStyle: "none" }}>
          {currentItems.map((item) => (
            <a href="/application_user" key={item.id} className="post">
            <div className="leftContent">
              <h3>
                {item.name} {item.surname}
              </h3>
              <p>{mapperOfStatus[item.status - 1]}</p>
            </div>
            <ChevronRight onClick={() => goToApplication()} className="chevron" />
          </a>
          ))}
        </ul>

        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousClassName={"prevBtn"}
          nextClassName={"nextBtn"}
          disabledClassName={"disabled"}
        />
      </div>
    </div>
  );
}
