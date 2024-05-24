import { QrCodeSvg } from "react-native-qr-svg";

type Props = {
  content: string;
  size: any;
};

const AppQRCode = ({ content, size }: Props) => {
  return <QrCodeSvg frameSize={size} value={content} />;
};

export default AppQRCode;
