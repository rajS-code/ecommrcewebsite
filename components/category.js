"use client";

const Category = () => {
    const categorys = [
        { name: "Electronics", image: "/electronics.jpg" },
        { name: "Fashion", image: "/fashion.jpg" },
        { name: "Home & Kitchen", image: "/home_kitchen.jpg" },
        { name: "Beauty & Personal Care", image: "/beauty.jpg" },
    ];
    return (
        <div className="w-full h-[40vh] flex justify-center items-center gap-14 border-b border-green-400 shadow-md">
            {categorys.map((category) => (
                <div key={category.name} className="w-52 flex-col flex gap-2 items-center rounded-full mx-4">
                    <img
                        src={category.image}
                        className="w-40 h-40 border border-green-700 rounded-full"
                    />
                    <div className="w-full bg-green-700 text-nowrap text-center bg-opacity-50 text-background px-2 py-1 rounded">
                        {category.name}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Category