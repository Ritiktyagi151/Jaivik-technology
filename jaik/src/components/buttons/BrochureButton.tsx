const BrochureButton = () => {
  return (
    <a
      href="/JaivikTechnologyBrochure.pdf"
      target="_blank"
      className="fixed right-[-46px] top-1/2 z-[999] hidden -translate-y-1/2 rotate-90 items-center gap-2 bg-main-secondary px-4 py-2 font-light tracking-wide text-white md:flex"
    >
      <span aria-hidden="true" className="text-main-red text-xs font-bold">
        PDF
      </span>
      Brochure
    </a>
  );
};

export default BrochureButton;
