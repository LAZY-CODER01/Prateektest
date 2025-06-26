import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BorderBeam } from "../magicui/border-beam";
import { motion } from "framer-motion";
import { FlickeringGrid } from "../magicui/flickering-grid";

// function CommonForm({
//   formControls,
//   formData,
//   setFormData,
//   onSubmit,
//   buttonText,
//   isBtnDisabled,
// }) {
//   function renderInputsByComponentType(getControlItem) {
//     const value = formData[getControlItem.name] || "";

//     switch (getControlItem.componentType) {
//       case "input":
//         return (
//           <Input
//             className="w-full px-8 py-4 p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//             name={getControlItem.name}
//             placeholder={getControlItem.placeholder}
//             id={getControlItem.name}
//             type={getControlItem.type}
//             value={value}
//             onChange={(event) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: event.target.value,
//               })
//             }
//           />
//         );

//       case "select":
//         return (
//           <Select
//             onValueChange={(value) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: value,
//               })
//             }
//             value={value}
//           >
//             <SelectTrigger className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
//               <SelectValue placeholder={getControlItem.label} />
//             </SelectTrigger>
//             <SelectContent>
//               {getControlItem.options?.map((optionItem) => (
//                 <SelectItem key={optionItem.id} value={optionItem.id}>
//                   {optionItem.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         );

//       case "textarea":
//         return (
//           <Textarea
//             className="w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//             name={getControlItem.name}
//             placeholder={getControlItem.placeholder}
//             id={getControlItem.name}
//             value={value}
//             onChange={(event) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: event.target.value,
//               })
//             }
//           />
//         );

//       default:
//         return (
//           <Input
//             className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//             name={getControlItem.name}
//             placeholder={getControlItem.placeholder}
//             id={getControlItem.name}
//             type={getControlItem.type}
//             value={value}
//             onChange={(event) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: event.target.value,
//               })
//             }
//           />
//         );
//     }
//   }

//   return (
//     <Card className="relative w-[450px] overflow-hidden shadow-xl/20 form-card">
//       <CardHeader>
//         {/* <CardTitle>{title}</CardTitle> */}
//         {/* <CardDescription>{description}</CardDescription> */}
//       </CardHeader>
//       <form onSubmit={onSubmit}>
//         <CardContent className="grid gap-4">
//           {formControls.map((controlItem) => (
//             <div className="flex flex-col space-y-1.5" key={controlItem.name}>
//               <Label
//                 htmlFor={controlItem.name}
//                 className="text-md input-heading"
//               >
//                 {controlItem.label}
//               </Label>
//               {renderInputsByComponentType(controlItem)}
//             </div>
//           ))}
//         </CardContent>
//         <CardFooter className="flex justify-between items-center mt-5">
//           <Button
//             type="submit"
//             disabled={isBtnDisabled}
//             className="w-full bg-black hover:bg-zinc-700 text-white button-ui"
//           >
//             {isBtnDisabled && (
//               <svg
//                 className="animate-spin h-4 w-4 mr-2 inline-block text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                 ></path>
//               </svg>
//             )}
//             {buttonText || "Submit"}
//           </Button>
//         </CardFooter>
//       </form>
//       <BorderBeam duration={8} size={100} />
//     </Card>
//   );
// }

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  function renderInputsByComponentType(getControlItem) {
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        return (
          <Input
            className="w-full px-4 py-1.5 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

      case "select":
        return (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full px-4 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options?.map((optionItem) => (
                <SelectItem key={optionItem.id} value={optionItem.id}>
                  {optionItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            className="w-full px-4 py-1.5 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

      default:
        return (
          <Input
            className="w-full px-4 py-1.5 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
    }
  }

  return (
    <Card className="relative w-full max-w-md mx-auto px-4 sm:px-6 py-5 sm:py-5 shadow-xl/20 form-card">
      <CardHeader></CardHeader>

      <form onSubmit={onSubmit}>
        <CardContent className="grid gap-3">
          {formControls.map((controlItem) => (
            <div className="flex flex-col space-y-1.5" key={controlItem.name}>
              <Label
                htmlFor={controlItem.name}
                className="text-md input-heading"
              >
                {controlItem.label}
              </Label>
              {renderInputsByComponentType(controlItem)}
            </div>
          ))}
        </CardContent>

        <CardFooter className="flex justify-center mt-5">
          <Button
            type="submit"
            disabled={isBtnDisabled}
            className="w-full bg-black hover:bg-zinc-700 text-white button-ui"
          >
            {isBtnDisabled && (
              <svg
                className="animate-spin h-4 w-4 mr-2 inline-block text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {buttonText || "Submit"}
          </Button>
        </CardFooter>
      </form>

      <BorderBeam duration={8} size={100} />
    </Card>
  );
}


export function CommonForm_2({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  function renderInputsByComponentType_2(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );

        break;
      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType_2(controlItem)}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} type="submit" className="mt-5 w-full">
        {isBtnDisabled && (
          <svg
            className="animate-spin h-4 w-4 mr-2 inline-block text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        )}
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export function CommonForm_3({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  function renderInputsByComponentType_2(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-amber-300"
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-amber-300">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-sm border border-amber-200">
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem
                      key={optionItem.id}
                      value={optionItem.id}
                      className="hover:bg-amber-50 focus:bg-amber-50"
                    >
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );

        break;
      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            className="w-full px-4 py-3 border border-amber-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-amber-300 min-h-[100px]"
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-amber-300"
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        {formControls.map((controlItem, index) => (
          <motion.div
            className="grid w-full gap-2"
            key={controlItem.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Label className="mb-1 text-sm font-medium text-gray-700">
              {controlItem.label}
            </Label>
            {renderInputsByComponentType_2(controlItem)}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6"
      >
        <Button
          disabled={isBtnDisabled}
          type="submit"
          className="w-full py-3 text-lg font-medium transition-all duration-300"
          style={{
            background: isBtnDisabled
              ? "linear-gradient(135deg, #D1D5DB 0%, #9CA3AF 100%)"
              : "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
            color: "#FFF",
            border: "none",
          }}
          whileHover={!isBtnDisabled ? { scale: 1.02 } : {}}
          whileTap={!isBtnDisabled ? { scale: 0.98 } : {}}
        >
          {isBtnDisabled && (
            <svg
              className="animate-spin h-4 w-4 mr-2 inline-block text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          )}
          {buttonText || "Submit"}
        </Button>
      </motion.div>
    </form>
  );
}

export default CommonForm;
