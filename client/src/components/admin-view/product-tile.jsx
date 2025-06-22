import { IndianRupee, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

function AdminProductTile({
  product,
  setFormData,
  setCurrentEditedId,
  setOpenCreateProductsDialog,
  handleDelete,
}) {
  return (
    <Card
      className={`group overflow-hidden bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300
        ${product?.totalStock < 5 ? "bg-red-100 border-red-400" : ""}`}
    >
      <div className="relative">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-black/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium text-gray-100">
            Stock: {product?.totalStock}
          </span>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product?.title}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          {product?.salePrice > 0 ? (
            <>
              <span className="text-lg font-bold text-green-600 flex items-center">
                <IndianRupee className="w-4 h-4" />
                {product?.salePrice}
              </span>
              <span className="text-sm text-gray-500 line-through flex items-center">
                <IndianRupee className="w-3 h-3" />
                {product?.price}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900 flex items-center">
              <IndianRupee className="w-4 h-4" />
              {product?.price}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          onClick={() => {
            setFormData(product);
            setCurrentEditedId(product?._id);
            setOpenCreateProductsDialog(true);
          }}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          size="sm"
        >
          <Edit className="w-4 h-4 mr-1" />
          Edit
        </Button>
        <Button
          onClick={() => handleDelete(product?._id)}
          variant="outline"
          className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
          size="sm"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
