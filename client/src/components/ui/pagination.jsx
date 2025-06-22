import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "./button";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center space-x-2 py-6">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-2"
          style={{
            borderColor: "#d4a373",
            color: "#5e4b3c",
            fontFamily: "'Poppins', sans-serif",
            "&:disabled": {
              opacity: 0.5,
              cursor: "not-allowed",
            },
          }}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
      </motion.div>

      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <div className="flex items-center justify-center w-8 h-8">
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className="w-8 h-8 p-0"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: currentPage === page ? "600" : "400",
                    ...(currentPage === page
                      ? {
                          background:
                            "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
                          color: "#fff",
                          borderColor: "#A67C52",
                        }
                      : {
                          borderColor: "#d4a373",
                          color: "#5e4b3c",
                        }),
                  }}
                >
                  {page}
                </Button>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2"
          style={{
            borderColor: "#d4a373",
            color: "#5e4b3c",
            fontFamily: "'Poppins', sans-serif",
            "&:disabled": {
              opacity: 0.5,
              cursor: "not-allowed",
            },
          }}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </motion.div>
    </div>
  );
}

export default Pagination;
