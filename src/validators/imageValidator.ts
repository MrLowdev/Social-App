import { bytesToMB } from "@/lib/utils";

export function imageValidator(
  name: string | undefined,
  size: number | undefined
): string | null {
  let flag: string | null = null;
  if (name) {
    const getImgExt = name.split(".");
    const imgExtType: Array<string> = ["svg", "png", "jpeg", "jpg"];
    if (!imgExtType.includes(getImgExt[1])) {
      return (flag = "Image must be .png,.jpg,.jpeg,.svg");
    } else {
      return (flag = null);
    }
  }

  if (size) {
    const fileInMB = bytesToMB(size!);
    if (fileInMB > 2) {
      return (flag = "Image should be less then 2 MB");
    } else {
      return (flag = null);
    }
  }
  return flag;
}
