import { styled } from "@/lib/configs/stitches.config";
import { reset } from "ui/atoms/generic/dialog/sharedStyles";

export const FieldSet = styled('fieldset', {
  ...reset,
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
  marginBottom: '15px'
});

export default FieldSet;
