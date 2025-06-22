import { Fragment } from "react";
import { filterOptions } from "@/config";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useSearchParams } from "react-router-dom";

function ProductFilter({ filters, handleFilter }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleReset() {
    sessionStorage.removeItem("filters");
    setSearchParams({});
    handleFilter("", ""); // This will trigger a filter update with empty values
  }

  return (
    <div className="rounded-lg shadow-lg card-bg">
      <div className="p-4 border-b-1 flex justify-between items-center">
        <h2 className="text-lg font-extrabold text-white">Filters</h2>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment>
            <div>
              <h3 className="text-lg font-bold text-white">{keyItem.toUpperCase()}</h3>
              <div className="">
                {filterOptions[keyItem].map((option) => (
                  <Label className="flex items-center font-semibold text-base mt-2 text-white">
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      className="border-white"
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
