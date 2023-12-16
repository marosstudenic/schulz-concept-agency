export const HeadingSection = ({extended} : {extended?: boolean}) => {
  if (extended) {
    return  (<div className="px-8 py-2 mb-12 rounded-[5px] bg-[#F7F7F7] my-4">
      <p className="text-sm text-center text-black/50">
        VŠETKY PROJEKTY
      </p>
    </div>);
  }

  return (
    <p className="text-center lg:text-left uppercase text-black/50 w-full mb-10">
      NAŠE PRÁCE
    </p>
  )

}
