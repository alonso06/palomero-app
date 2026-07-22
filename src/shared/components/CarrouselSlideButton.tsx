interface Props {
  type: "prev" | "next";
  onClick: () => void;
  label: string;
  childrenSvg: React.ReactNode;
}

export const CarrouselSlideButton = ({
  type,
  onClick,
  label,
  childrenSvg,
}: Props) => {
  return (
    <>
      <button
        type="button"
        className={`absolute ${type === "prev" ? "inset-s-0" : "inset-e-0"} z-30 flex items-center justify-center inset-y-0 px-4 cursor-pointer group focus:outline-none rounded-full`}
        onClick={onClick}
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 group-hover:rounded-full group-hover:bg-black/15 group-focus:ring-black/20 group-focus:outline-none">
          {childrenSvg}
          <span className="sr-only">{label}</span>
        </span>
      </button>
    </>
  );
};
