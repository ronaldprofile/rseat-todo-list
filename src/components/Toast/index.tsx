import * as ToastPrimitive from "@radix-ui/react-toast";
import { StyledToast, StyledViewport, StyledClose } from './styles'

type ToastProps = ToastPrimitive.ToastProps & {};

export function Toast({ children, ...props }: ToastProps) {
  
  
  return (
    <ToastPrimitive.Provider>
      <StyledToast {...props}>{children}</StyledToast>

      <StyledViewport />
    </ToastPrimitive.Provider>
  );
}

type ToastButtonCloseProps = ToastPrimitive.ToastCloseProps & {};

export function ToastButtonClose({ children }: ToastButtonCloseProps) {
  return <StyledClose>{children}</StyledClose>;
}

type ToastTitleProps = ToastPrimitive.ToastTitleProps & {};

export function ToastTitle({ children }: ToastTitleProps) {
  return <ToastPrimitive.Title>{children}</ToastPrimitive.Title>;
}

type ToastDescriptionProps = ToastPrimitive.ToastDescriptionProps & {};

export function ToastDescription({ children }: ToastDescriptionProps) {
  return <ToastPrimitive.Description>{children}</ToastPrimitive.Description>;
}
