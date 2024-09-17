import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { AlertCircle } from "lucide-react";
import { AlertDialogFooter, AlertDialogHeader } from "./alert-dialog";

interface AlertErrorProps {
  title?: string;
  message?: string;
}

export function AlertError({ title = 'Something went wrong!', message }: AlertErrorProps) {
  if (!message) {
    return null
  }

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="flex items-end md:items-center fixed inset-0 ease-out bg-slate-500 bg-opacity-75 justify-center content-center top-0 left-0 w-full y-full fit z-10">
        <div
          className="bg-white overflow-y-auto w-full md:w-fit mb-1 md:mb-0 mx-1 md:mx-0"
        >
          <div className="flex px-3 md:px-6 py-3 md:py-6 gap-2 md:gap-4 items-center">
            <div className="flex items-center justify-center rounded-full bg-red-200 h-12 md:h-16 w-12 md:w-16">
              <AlertCircle className="text-destructive size-5 md:size-7" />
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex w-full text-base md:text-lg font-bold">{ title }</AlertDialogTitle>
              {message && <AlertDialogDescription className="text-xs md:text-sm">{ message }</AlertDialogDescription>}
            </AlertDialogHeader>
          </div>
          <AlertDialogFooter className="flex w-full border-t-[1px] border-black">
            <AlertDialogCancel className="w-full px-6 py-3 hover:bg-slate-200 text-blue-700 font-bold hover:text-gray-900">Close</AlertDialogCancel>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}