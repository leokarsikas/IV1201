import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import ReactPaginate from "react-paginate";
import "../styling/RecruiterPage.css";
import { useAuth } from "../hooks/useAuthLogin";
import { useFetchApplications } from "../hooks/useFetchApplications";
import Dropdown from "../components/DropDown";

/**
 * `RecruiterPage` is a component responsible for rendering the
 * recruiter page, where they can view, search, and filter applicants.
 * It fetches the list of applications and allows recruiters to filter
 * by status ("Unhandled", "Accepted", "Rejected") and search by name.
 */
export default function RecruiterPage() {
  const { applications, isLoading: isFetchingApplications } =
    useFetchApplications();
  const { role, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  // Status options for the dropdown
  const mapperOfStatus = ["Unhandled", "Accepted", "Rejected"];

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Status filter state
  const [selectedStatus, setSelectedStatus] = useState("");

  /**
   * Filters the applications based on the search query and selected status.
   *
   * @returns {Array} The filtered list of applications.
   */
  const filteredApplications = applications.filter((item) => {
    const matchesName = `${item.name} ${item.surname}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus
      ? mapperOfStatus[item.status - 1].toLowerCase() ===
        selectedStatus.toLowerCase()
      : true;
    return matchesName && matchesStatus;
  });

   /**
   * Redirects unauthorized users to the homepage.
   * This effect is triggered when authentication loading or role changes.
   */
  useEffect(() => {
    if (!isAuthLoading && role !== 1) {
      navigate("/");
    }
  }, [role, isAuthLoading, navigate]);

  if (isAuthLoading || isFetchingApplications) return <p>Loading...</p>;

  // Compute paginated data
  const pageCount = Math.ceil(filteredApplications.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredApplications.slice(
    offset,
    offset + itemsPerPage
  );

  /**
   * Handles the page change in pagination.
   * 
   * @param {Object} selected - The object containing the selected page number.
   */
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="recruiterPage">
      <Navbar />
      <div>
        <div className="search-container">
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />

          {/* Status Dropdown */}
          <Dropdown
            label="Filter by status"
            options={mapperOfStatus}
            value={selectedStatus}
            onSelect={(value) => setSelectedStatus(value)}
          />
        </div>

        <ul style={{ listStyle: "none" }}>
          {currentItems.map((item) => (
            <a href="/" key={item.id} className="post">
              <div className="leftContent">
                <h3>
                  {item.name} {item.surname}
                </h3>
                <p>{mapperOfStatus[item.status - 1]}</p>
              </div>
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