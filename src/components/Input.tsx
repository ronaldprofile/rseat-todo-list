import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ ...props }: InputProps) {
  return (
    <input
      {...props}
      className="p-4 w-full bg-gray-500 text-gray-300 placeholder:text-gray-300  border-2 border-gray-700 rounded-lg transition-colors focus:outline-none focus:border-purple-600 focus:text-gray-100 focus:placeholder:text-gray-100"
    />
  );
}
