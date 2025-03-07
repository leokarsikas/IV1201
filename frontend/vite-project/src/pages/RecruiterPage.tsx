import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import ReactPaginate from "react-paginate";
import "../styling/RecruiterPage.css";
import { useAuth } from "../hooks/useAuthLogin";
import { useFetchApplications } from "../hooks/useFetchApplications";
import Dropdown from "../components/DropDown";
import Button from "../components/button";
import { ChevronRight } from "lucide-react";

export default function RecruiterPage() {
  const {
    applications,
    isLoading: isFetchingApplications,
    error,
  } = useFetchApplications();
  const { role, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  
  // Redirect unauthorized users
  useEffect(() => {
    if (!isAuthLoading && role !== 1) {
      navigate("/");
    }
  }, [role, isAuthLoading, navigate]);

  if (isAuthLoading || isFetchingApplications) return <p>Loading...</p>;

  // Compute paginated data
  const pageCount = Math.ceil(applications.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = applications.slice(offset, offset + itemsPerPage);

  // Handle page change
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const mapperOfStatus = ["Unhandled", "Accepted", "Rejected"];


  const goToApplication = () => {
    navigate("/application_user")
  };

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
