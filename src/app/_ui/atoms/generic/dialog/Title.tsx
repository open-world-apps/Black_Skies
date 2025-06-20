import { styled } from "@/lib/configs/stitches.config";
import { Dialog } from "radix-ui";
import { mauve } from "@radix-ui/colors";

const Title = styled(Dialog.Title, {
  margin: 0,
  fontWeight: 500,
  color: mauve.mauve12,
  fontSize: '17px'
});

export default Title;
