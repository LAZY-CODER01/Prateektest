import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import { CommonForm_2 } from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Pagination from "@/components/ui/pagination";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/product-slice";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const initialFormData = {
  image: null,
  title: "",
  productId: "",
  description: "",
  dimensions: "",
  category: "",
  product: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);

  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { productList, pagination } = useSelector(
    (state) => state.adminProducts
  );

  function handlePageChange(page) {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    if (uploadedImageUrl) {
      setFormData((prev) => ({
        ...prev,
        image: uploadedImageUrl,
      }));
    }
  }, [uploadedImageUrl]);

  console.log(formData);

  function onSubmit(event) {
    event.preventDefault();
    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit");
          if (data?.payload?.success) {
            dispatch(fetchAllProducts({ page: currentPage, limit: 12 }));
            setOpenCreateProductsDialog(false);
            setFormData(initialFormData);
            setCurrentEditedId(null);
            toast.success(data?.payload?.message, {
              style: {
                backgroundColor: "#003300", // light red
                color: "#fff",
                fontWeight: "bolder", // dark red text
                fontSize: "15px",
              },
            });
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            dispatch(fetchAllProducts({ page: 1, limit: 12 }));
            setOpenCreateProductsDialog(false);
            setFormData(initialFormData);
            setImageFile(null);
            setCurrentPage(1);
            toast.success(data?.payload?.message, {
              style: {
                backgroundColor: "#003300", // light red
                color: "#fff",
                fontWeight: "bolder", // dark red text
                fontSize: "15px",
              },
            });
          }
        });
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        // If we're on the last page and it only has one item, go to previous page
        if (productList.length === 1 && pagination.currentPage > 1) {
          const newPage = pagination.currentPage - 1;
          setCurrentPage(newPage);
          dispatch(fetchAllProducts({ page: newPage, limit: 12 }));
        } else {
          dispatch(fetchAllProducts({ page: currentPage, limit: 12 }));
        }
        toast.success(data?.payload?.message, {
          style: {
            backgroundColor: "#b91c1c", // light red
            color: "#fff",
            fontWeight: "bolder", // dark red text
            fontSize: "15px",
          },
        });
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts({ page: currentPage, limit: 12 }));
  }, [dispatch, currentPage]);

  console.log(productList, uploadedImageUrl, "productList");

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-800">
            Products Management
          </h2>
          <span className="text-sm text-gray-600">
            {pagination?.totalProducts || 0} Total Products
          </span>
        </div>
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0 ? (
          productList.map((productItem) => (
            <AdminProductTile
              key={productItem._id} // unique key
              setFormData={setFormData}
              setCurrentEditedId={setCurrentEditedId}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              product={productItem}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-gray-500">No products found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-8 border-t pt-6">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadImageUrl={setUploadImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="p-6">
            <CommonForm_2
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              formControls={addProductFormElements}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
