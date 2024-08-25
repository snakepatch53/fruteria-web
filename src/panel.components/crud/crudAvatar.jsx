export default function CrudAvatar({ src, name }) {
    return (
        <div className=" flex justify-center items-center h-11 aspect-square rounded-full overflow-hidden bg-gray-200 font-semibold text-lg ">
            {src && <img className="w-full h-full object-cover" src={src} alt={name} />}
            {!src && (
                <span>
                    {name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                </span>
            )}
        </div>
    );
}
