export default interface Props {
  className: string;
  title?: string;
  handle?: () => void;
  children?: React.ReactElement;
}
